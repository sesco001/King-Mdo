const {
  default: peaceConnect,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  downloadContentFromMessage,
  jidDecode,
  proto,
  getContentType,
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
const EDIT_COOLDOWN = 5000; 

// ==================== STATUS REACTION SYSTEM ====================
const reactedStatuses = new Set();
const statusQueue = [];
let isProcessing = false;

async function processStatusQueue() {
    if (isProcessing || statusQueue.length === 0) return;
    isProcessing = true;
    
    while (statusQueue.length > 0) {
        const { client, mek } = statusQueue.shift();
        
        try {
            const statusId = mek.key.id;
            if (reactedStatuses.has(statusId)) continue;
            
            const senderJid = client.decodeJid(mek.key.participant || mek.key.remoteJid);
            const botJid = client.decodeJid(client.user.id);
            
            if (senderJid === botJid) continue;
            
            const emojis = ['🗿', '⌚️', '💠', '✨', '❤️', '🔥', '💯', '🌟', '✅', '👑', '🎈', '🪄', '🧿', '💎'];
            const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
            
            reactedStatuses.add(statusId);
            
            try {
                await client.sendMessage('status@broadcast', {
                    react: {
                        text: randomEmoji,
                        key: {
                            remoteJid: 'status@broadcast',
                            id: statusId,
                            participant: senderJid,
                            fromMe: false
                        }
                    }
                }, {
                    statusJidList: [senderJid, botJid]
                });
                console.log(chalk.green(`✅ Reacted to ${senderJid} with ${randomEmoji}`));
            } catch (err) {
                console.log(chalk.red(`❌ Reaction failed: ${err.message}`));
            }
            
            await sleep(3000);
        } catch (err) {
            console.error('❌ Queue error:', err.message);
        }
    }
    isProcessing = false;
}

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
  const { version, isLatest } = await fetchLatestBaileysVersion();

  const client = peaceConnect({
    version,
    logger: pino({ level: "silent" }),
    printQRInTerminal: false,
    browser: ["KING-M", "Safari", "5.1.7"],
    auth: state,
    syncFullHistory: true,
  });

  // ========== CLIENT HELPERS ==========
  client.decodeJid = (jid) => {
    if (!jid) return jid;
    if (/:\d+@/gi.test(jid)) {
      let decode = jidDecode(jid) || {};
      return (decode.user && decode.server && decode.user + "@" + decode.server) || jid;
    }
    return jid;
  };

  client.getName = (jid, withoutContact = false) => {
    let id = client.decodeJid(jid);
    let v;
    if (id.endsWith("@g.us")) {
      return new Promise(async (resolve) => {
        v = store.contacts[id] || {};
        if (!(v.name || v.subject)) v = await client.groupMetadata(id).catch(() => ({}));
        resolve(v.name || v.subject || PhoneNumber("+" + id.replace("@s.whatsapp.net", "")).getNumber("international"));
      });
    } else {
      v = id === "0@s.whatsapp.net" ? { id, name: "WhatsApp" } : id === client.decodeJid(client.user.id) ? client.user : store.contacts[id] || {};
      return (withoutContact ? "" : v.name) || v.subject || v.verifiedName || PhoneNumber("+" + jid.replace("@s.whatsapp.net", "")).getNumber("international");
    }
  };

  // Auto bio update
  if (autobio === 'on') {
    setInterval(() => {
      const date = new Date();
      client.updateProfileStatus(
        `📅 ${date.toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })} | KING M`
      );
    }, 30 * 1000);
  }

  store.bind(client.ev);
  
  client.ev.on("messages.upsert", async (chatUpdate) => {
    try {
      let mek = chatUpdate.messages[0];
      if (!mek.message) return;
      
      if (Object.keys(mek.message)[0] === "ephemeralMessage") {
        mek.message = mek.message.ephemeralMessage.message;
      }

      // ========== AUTO VIEW & REACT STATUS ==========
      if (mek.key && mek.key.remoteJid === "status@broadcast") {
        const senderJid = client.decodeJid(mek.key.participant || mek.key.remoteJid);
        
        if (autoview === 'on') {
            await client.readMessages([{
              remoteJid: 'status@broadcast',
              id: mek.key.id,
              participant: senderJid
            }]);
            console.log(chalk.cyan(`👁️ Viewed status from ${senderJid}`));
        }
        
        if (autoview === 'on' && autolike === 'on' && !mek.key.fromMe) {
          if (!reactedStatuses.has(mek.key.id)) {
            statusQueue.push({ client, mek });
            if (!isProcessing) processStatusQueue();
          }
        }
      }
      
      if (!client.public && !mek.key.fromMe && chatUpdate.type === "notify") return;
      
      let m = smsg(client, mek, store);
      const peace = require("../peacemaker/peace");
      peace(client, m, chatUpdate, store);
      
    } catch (err) {
      console.log(err);
    }
  });

  // ========== ANTI-EDIT SYSTEM RESTORED ==========
  client.ev.on('messages.update', async (messageUpdates) => {
    try {
      const { antiedit: currentAntiedit } = await fetchSettings();
      if (currentAntiedit === 'off') return;
      const now = Date.now();
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

        const notificationMessage = `*⚠️ ANTI-EDIT RESTORED ⚠️*\n\n` +
                                 `👤 *Sender:* @${sender.split('@')[0]}\n` +
                                 `📄 *Original:* ${getContent(originalMsg?.message)}\n` +
                                 `✏️ *Edited:* ${getContent(editedMsg)}`;

        const sendTo = currentAntiedit === 'private' ? client.user.id : key.remoteJid;
        await client.sendMessage(sendTo, { text: notificationMessage, mentions: [sender] }).catch(() => {});
        processedEdits.set(editId, [now]);
      }
    } catch (err) { console.error(chalk.red('[ANTIEDIT ERROR]', err.message)); }
  });

  // ========== ANTI-CALL SYSTEM RESTORED ==========
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
      console.log(`Connection closed: ${reason}. Reconnecting...`);
      startPeace();
    } else if (connection === "open") {
      await initializeDatabase();
      console.log(color("✅ KING-M CONNECTED & DATABASE READY", "green"));
      client.sendMessage(client.user.id, { text: "❤️ *KING M STATUS*\n✅ CONNECTED & ACTIVE" }).catch(() => {});
    }
  });

  client.ev.on("creds.update", saveCreds);
  client.public = true;
  return client;
}

app.use(express.static("pixel"));
app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));
app.listen(port, () => console.log(`📡 Server on port ${port}`));

startPeace();
