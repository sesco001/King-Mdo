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
const qrcode = require("qrcode-terminal");
const logger = pino({ level: 'silent' });
const app = express();
const _ = require("lodash");
const EventEmitter = require('events');
EventEmitter.defaultMaxListeners = 50;

// Suppress noisy console logs
const _origLog = console.log;
const _origErr = console.error;
const _noisePatterns = ['Closing session', 'Closing open session', 'SessionEntry', '_chains', 'registrationId', 'currentRatchet', 'ephemeralKeyPair', 'indexInfo', 'remoteIdentityKey', 'rootKey', 'lastRemoteEphemeral'];
console.log = (...args) => {
  const msg = args.map(a => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' ');
  if (_noisePatterns.some(p => msg.includes(p))) return;
  _origLog(...args);
};

let lastTextTime = 0;
const messageDelay = 3000;
const EDIT_COOLDOWN = 60000; // Define missing constant
const Events = require('../peacemaker/events');
const authenticationn = require('../peacemaker/auth');
const { initializeDatabase } = require('../Database/config');
const fetchSettings = require('../Database/fetchSettings');
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('../lib/peaceexif');
const { smsg, sleep } = require('../lib/peacefunc');
// FIX: Dynamic port for Heroku H10 fix
const port = process.env.PORT || require("../set.js").port || 8000;
const makeInMemoryStore = require('../store/store.js'); 
const store = makeInMemoryStore({ logger: logger.child({ stream: 'store' }) });
const color = (text, color) => {
  return !color ? chalk.green(text) : chalk.keyword(color)(text);
};

authenticationn();

const processedEdits = new Set();

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
    browser: ["KING-M", "Safari", "5.1.7"],
    auth: state,
    syncFullHistory: true,
  });

  client.decodeJid = (jid) => {
    if (!jid) return jid;
    if (/:\d+@/gi.test(jid)) {
      let decode = jidDecode(jid) || {};
      return (decode.user && decode.server && decode.user + "@" + decode.server) || jid;
    }
    return jid;
  };

  // Auto bio update
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

      // ========== AUTO VIEW & LIKE STATUS (PROTECTED) ==========
      if (ms.key.remoteJid === "status@broadcast") {
        try {
          if (autoview === "on") {
            const participantToUse = ms.key.participantPn || ms.key.participant;
            await client.readMessages([{
              remoteJid: ms.key.remoteJid,
              id: ms.key.id,
              fromMe: ms.key.fromMe,
              participant: participantToUse
            }]);
          }

          if (autolike === "on" && ms.key.participant && !ms.key.fromMe) {
            const participantToUse = ms.key.participantPn || ms.key.participant;
            const emojis = ['🗿', '⌚️', '💠', '✨', '❤️', '🔥', '💯', '🌟', '✅'];
            const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
            await client.sendMessage(ms.key.remoteJid,
              { react: { key: ms.key, text: randomEmoji } },
              { statusJidList: [participantToUse, clienttech] }
            );
          }
          return; 
        } catch (error) {
          console.error("Error handling status:", error);
        }
      }
      
      // ========== COMMAND BRIDGE ==========
      // Check mode before requiring peace.js to save resources
      const isMe = mek.key.fromMe;
      if (mode === 'private' && !isMe) return;
      
      let m = smsg(client, mek, store);
      const peace = require("../peacemaker/peace");
      peace(client, m, chatUpdate, store);
      
    } catch (err) {
      console.log(chalk.red('[MSG ERROR]'), err.message || err);
    }
  });

  // ========== ANTI-EDIT (PROTECTED) ==========
  client.ev.on('messages.update', async (messageUpdates) => {
    try {
      const { antiedit: currentAntiedit } = await fetchSettings();
      if (currentAntiedit === 'off') return;

      const now = Date.now();
      for (const update of messageUpdates) {
        const { key, update: { message } } = update;
        if (!key?.id || !message) continue;

        const editId = `${key.id}-${key.remoteJid}`;
        const chat = key.remoteJid;
        const editedMsg = message.editedMessage?.message || message.editedMessage;
        if (!editedMsg) continue;

        const originalMsg = await store.loadMessage(chat, key.id) || {};
        const sender = key.participant || key.remoteJid;

        const getContent = (msg) => {
          if (!msg) return '[Deleted]';
          const type = Object.keys(msg)[0];
          const content = msg[type];
          switch(type) {
            case 'conversation': return content;
            case 'extendedTextMessage': return content.text;
            case 'imageMessage': return `🖼️ ${content.caption || 'Image'}`;
            case 'videoMessage': return `🎥 ${content.caption || 'Video'}`;
            default: return `[${type.replace('Message', '')}]`;
          }
        };

        const originalContent = getContent(originalMsg.message);
        const editedContent = getContent(editedMsg);

        if (originalContent === editedContent) continue;

        const notificationMessage = `*⚠️📌 KING M ᴀɴᴛɪᴇᴅɪᴛ 📌⚠️*\n\n` +
                                     `👤 *sᴇɴᴅᴇʀ:* @${sender.split('@')[0]}\n` +
                                     `📄 *ᴏʀɪɢɪɴᴀʟ:* ${originalContent}\n` +
                                     `✏️ *ᴇᴅɪᴛᴇᴅ:* ${editedContent}`;

        const sendTo = currentAntiedit === 'private' ? client.user.id : chat;
        await client.sendMessage(sendTo, { text: notificationMessage, mentions: [sender] });
      }
    } catch (err) {
      console.error(chalk.red('[ANTIEDIT ERROR]'), err.message);
    }
  });

  client.ev.on('call', async (callData) => {
    const { anticall: dbAnticall } = await fetchSettings();
    if (dbAnticall === 'on') {
      const callId = callData[0]?.id;
      const callerId = callData[0]?.from;
      if (callId && callerId) {
        await client.rejectCall(callId, callerId);
        await client.sendMessage(callerId, { text: "🚫 Anticall is active." });
      }
    }
  });

  client.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect, qr } = update;
    if (qr) qrcode.generate(qr, { small: true });
    
    if (connection === "close") {
      let reason = new Boom(lastDisconnect?.error)?.output.statusCode;
      if (reason !== DisconnectReason.loggedOut) startPeace();
    } else if (connection === "open") {
      await initializeDatabase();
      console.log(color("✅ KING-M CONNECTED & DATABASE READY", "green"));
      const connText = `🔶 *KING MD ꜱᴛᴀᴛᴜꜱ*\n` +
              `───────────────────────\n` +
              `⚙️  ᴍᴏᴅᴇ » ${mode}\n` +
              `⌨️  ᴘʀᴇꜰɪx » ${prefix}\n` +
              `✅ ᴄᴏɴɴᴇᴄᴛᴇᴅ & ᴀᴄᴛɪᴠᴇ`;
      client.sendMessage(client.user.id, { text: connText }).catch(() => {});
    }
  });

  client.ev.on("creds.update", saveCreds);
  return client;
}

app.use(express.static(path.join(__dirname, '../pixel')));
app.get("/", (req, res) => res.sendFile(path.join(__dirname, '../pixel/index.html')));
// FIX: Using dynamic port ensures Heroku won't kill the app
app.listen(port, "0.0.0.0", () => console.log(`📡 Server on port ${port}`));

startPeace();
