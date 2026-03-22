const {
  default: peaceConnect,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  downloadContentFromMessage,
  jidDecode,
  proto,
  getContentType,
  jidNormalizedUser 
} = require("@whiskeysockets/baileys");

const pino = require("pino");
const { Boom } = require("@hapi/boom");
const fs = require("fs");
const path = require('path');
const axios = require("axios");
const express = require("express");
const chalk = require("chalk");
const FileType = require("file-type");
const figlet = require("figlet");
const logger = pino({ level: 'silent' });
const app = express();
const _ = require("lodash");
const EventEmitter = require('events');
EventEmitter.defaultMaxListeners = 20;

let lastTextTime = 0;
const messageDelay = 3000;
const Events = require('../peacemaker/events');
const authenticationn = require('../peacemaker/auth');
const { initializeDatabase } = require('../Database/config');
const fetchSettings = require('../Database/fetchSettings');
const PhoneNumber = require("awesome-phonenumber");
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('../lib/peaceexif');
const { smsg, sleep } = require('../lib/peacefunc');
const { port } = require("../set.js");
const makeInMemoryStore = require('../store/store.js'); 
const store = makeInMemoryStore({ logger: logger.child({ stream: 'store' }) });
const color = (text, color) => {
  return !color ? chalk.green(text) : chalk.keyword(color)(text);
};

authenticationn();

const processedEdits = new Set();
const reactedStatuses = new Set();

async function startPeace() { 
  let autobio, autolike, autoview, mode, prefix, anticall, antiedit;

  try {
    const settings = await fetchSettings();
    ({ autobio, autolike, autoview, mode, prefix, anticall, antiedit } = settings);
    console.log("✅ Settings loaded successfully");
  } catch (error) {
    console.error("❌ Failed to load settings", error.message);
    return;
  }

  const { state, saveCreds } = await useMultiFileAuthState("session");
  const { version } = await fetchLatestBaileysVersion();

  const client = peaceConnect({
    version,
    logger: pino({ level: "silent" }),
    printQRInTerminal: false,
    browser: ["KING-M", "Safari", "5.1.7"],
    auth: state,
    syncFullHistory: false, // Set to false to save VPS RAM and prevent 408 on startup
    connectTimeoutMs: 60000, // Fixed: Increased timeout to prevent connection drop
    defaultQueryTimeoutMs: 0, // Fixed: Prevents 408 Timeout errors during media tasks
    keepAliveIntervalMs: 10000, // Fixed: Keeps connection alive on unstable VPS networks
  });

  // Fixed: Exporting download utility globally so commands can use reuploadRequest
  client.downloadMedia = async (message, type) => {
    return await downloadContentFromMessage(message, type, { 
        reuploadRequest: client.updateMediaMessage 
    });
  };

  client.decodeJid = (jid) => {
    if (!jid) return jid;
    if (/:\d+@/gi.test(jid)) {
      let decode = jidDecode(jid) || {};
      return (decode.user && decode.server && decode.user + "@" + decode.server) || jid;
    }
    return jid;
  };

  if (autobio === 'on') {
    setInterval(() => {
      const date = new Date();
      client.updateProfileStatus(
        `📅 ${date.toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })} | KING M`
      ).catch(() => {});
    }, 60 * 1000);
  }

  store.bind(client.ev);
  
  client.ev.on("messages.upsert", async (chatUpdate) => {
    try {
      let mek = chatUpdate.messages[0];
      if (!mek.message) return;
      
      const ms = mek;
      const clienttech = jidNormalizedUser(client.user.id);
      const fromJid = ms.key.participant || ms.key.remoteJid;

      ms.message = getContentType(ms.message) === 'ephemeralMessage'
        ? ms.message.ephemeralMessage.message
        : ms.message;

      if (ms.key.remoteJid === "status@broadcast") {
        try {
          if (autoview === "on") {
            const participantToUse = ms.key.participantPn || ms.key.participant;
            const readKey = {
              remoteJid: ms.key.remoteJid,
              id: ms.key.id,
              fromMe: ms.key.fromMe,
              participant: participantToUse
            };
            
            await client.readMessages([readKey]);
            console.log(chalk.cyan(`👁️ Viewed: ${participantToUse}`));
          }

          if (autolike === "on" && ms.key.participant && !ms.key.fromMe) {
            const participantToUse = ms.key.participantPn || ms.key.participant;
            const reactionKey = {
              remoteJid: ms.key.remoteJid,
              id: ms.key.id,
              fromMe: ms.key.fromMe,
              participant: participantToUse
            };
            
            const emojis = ['🗿', '⌚️', '💠', '✨', '❤️', '🔥', '💯', '🌟', '✅'];
            const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
            
            await client.sendMessage(
              ms.key.remoteJid,
              { react: { key: reactionKey, text: randomEmoji } },
              { statusJidList: [participantToUse, clienttech] }
            );
            console.log(chalk.green(`✅ Liked: ${participantToUse}`));
          }
          return;
        } catch (error) {
          console.error("Error handling status broadcast:", error);
        }
      }
      
      const isMe = mek.key.fromMe;
      if (mode === 'private' && !isMe) return;
      
      let m = smsg(client, mek, store);
      const peace = require("../peacemaker/peace");
      peace(client, m, chatUpdate, store);
      
    } catch (err) {
      console.log(err);
    }
  });

  client.ev.on('messages.update', async (messageUpdates) => {
    try {
      const { antiedit: currentAntiedit } = await fetchSettings();
      if (currentAntiedit === 'off') return;
      for (const update of messageUpdates) {
        const { key, update: { message } } = update;
        if (!key?.id || !message) continue;
        const editId = `${key.id}-${key.remoteJid}`;
        if (processedEdits.has(editId)) continue;

        const editedMsg = message.editedMessage?.message || message.editedMessage;
        if (!editedMsg) continue;

        let originalMsg = (store && typeof store.loadMessage === 'function') ? await store.loadMessage(key.remoteJid, key.id) : {};
        const sender = key.participant || key.remoteJid;

        const getContent = (msg) => {
          if (!msg) return '[Deleted]';
          const type = Object.keys(msg)[0];
          return type === 'conversation' ? msg[type] : `[${type}]`;
        };

        const notificationMessage = `*⚠️ ANTI-EDIT RESTORED ⚠️*\n👤 *Sender:* @${sender.split('@')[0]}\n📄 *Original:* ${getContent(originalMsg?.message)}\n✏️ *Edited:* ${getContent(editedMsg)}`;

        const sendTo = currentAntiedit === 'private' ? client.user.id : key.remoteJid;
        await client.sendMessage(sendTo, { text: notificationMessage, mentions: [sender] }).catch(() => {});
        processedEdits.add(editId);
      }
    } catch (err) { console.error(chalk.red('[ANTIEDIT ERROR]', err.message)); }
  });

  client.ev.on('call', async (callData) => {
    const { anticall: dbAnticall } = await fetchSettings();
    if (dbAnticall === 'on') {
      const callId = callData[0]?.id;
      const callerId = callData[0]?.from;
      if (callId && callerId) {
        await client.rejectCall(callId, callerId);
        if (Date.now() - lastTextTime >= messageDelay) {
          await client.sendMessage(callerId, { text: "🚫 Anticall is active. Only text messages are allowed." });
          lastTextTime = Date.now();
        }
      }
    }
  });

  client.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === "close") {
      let reason = new Boom(lastDisconnect?.error)?.output.statusCode;
      if (reason !== DisconnectReason.loggedOut) {
        console.log(`Connection closed: ${reason}. Reconnecting...`);
        startPeace();
      }
    } else if (connection === "open") {
      await initializeDatabase();
      console.log(color("✅ KING-M CONNECTED & DATABASE READY", "green"));
      client.sendMessage(client.user.id, { text: `🔶 *KING M STATUS*\n✅ CONNECTED\n⚙️ MODE: ${mode}` }).catch(() => {});
    }
  });

  client.ev.on("creds.update", saveCreds);
  return client;
}

app.use(express.static("pixel"));
app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));
app.listen(port, () => console.log(`📡 Server on port ${port}`));

startPeace();
