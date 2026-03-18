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
// Track reacted statuses to prevent duplicates
const reactedStatuses = new Set();
const statusQueue = [];
let isProcessing = false;

// Extract phone number from any JID format
function extractPhoneNumber(jid) {
    if (!jid) return null;
    let str = String(jid);
    let numbers = str.replace(/[^0-9]/g, '');
    return numbers && numbers.length > 5 ? numbers : null;
}

// Get proper JID from raw JID
function getProperJid(rawJid) {
    if (!rawJid) return null;
    const numbers = extractPhoneNumber(rawJid);
    return numbers ? numbers + '@s.whatsapp.net' : null;
}

// Process queue
async function processStatusQueue() {
    if (isProcessing || statusQueue.length === 0) return;
    isProcessing = true;
    
    while (statusQueue.length > 0) {
        const { client, mek } = statusQueue.shift();
        
        try {
            const statusId = mek.key.id;
            
            // Skip if already reacted
            if (reactedStatuses.has(statusId)) {
                console.log('⏭️ Status already reacted, skipping');
                continue;
            }
            
            // Get sender's number
            const rawParticipant = mek.key.participant || mek.key.remoteJid;
            const senderNum = extractPhoneNumber(rawParticipant);
            
            if (!senderNum) {
                console.log('⚠️ Could not extract phone number from:', rawParticipant);
                continue;
            }
            
            // Get bot's number dynamically
            const botNum = extractPhoneNumber(client.user.id);
            if (!botNum) {
                console.log('⚠️ Could not extract bot number');
                continue;
            }
            
            // Don't react to own status
            if (botNum === senderNum) {
                console.log('⏭️ Skipping own status');
                continue;
            }
            
            // Create proper JIDs
            const senderJid = senderNum + '@s.whatsapp.net';
            const botJid = botNum + '@s.whatsapp.net';
            
            // Pick random emoji
            const emojis = ['🗿', '⌚️', '💠', '👣', '🍆', '💔', '🤍', '❤️‍🔥', '💣', '🧠', '🦅', '🌻', '🧊', '🛑', '🧸', '👑', '📍', '😅', '🎭', '🎉', '😳', '💯', '🔥', '💫', '🐒', '💗', '❤️‍🔥', '👁️', '👀', '🙌', '🙆', '🌟', '💧', '🦄', '🟢', '🎎', '✅', '🥱', '🌚', '💚', '💕', '😉', '😒'];
            const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
            
            // Mark as reacted
            reactedStatuses.add(statusId);
            
            console.log(`📤 Reacting to ${senderNum} with ${randomEmoji}`);
            
            // Try different reaction methods
            let success = false;
            
            // Method 1: Full reaction
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
                success = true;
                console.log(`✅ Reacted to ${senderNum}`);
            } catch (err1) {
                console.log(`⚠️ Method 1 failed: ${err1.message}`);
                
                // Method 2: Try without statusJidList
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
                    });
                    success = true;
                    console.log(`✅ Reacted to ${senderNum} (method 2)`);
                } catch (err2) {
                    console.log(`❌ All reaction methods failed for ${senderNum}`);
                }
            }
            
            // If reaction succeeded, try to view
            if (success) {
                try {
                    await sleep(1000);
                    await client.readMessages([{
                        remoteJid: 'status@broadcast',
                        id: statusId,
                        participant: senderJid,
                        fromMe: false
                    }]);
                    console.log(`👁️ Viewed status from ${senderNum}`);
                } catch (viewErr) {
                    // View might fail, but reaction already sent
                }
            }
            
            // Wait between reactions
            await sleep(3000);
            
        } catch (err) {
            console.error('❌ Reaction error:', err.message);
            await sleep(5000);
        }
    }
    
    isProcessing = false;
    
    // Clean up old status IDs
    if (reactedStatuses.size > 100) {
        const array = Array.from(reactedStatuses);
        reactedStatuses.clear();
        array.slice(-50).forEach(id => reactedStatuses.add(id));
    }
}
// ==================== END STATUS SYSTEM ====================

async function startPeace() { 
  
let autobio, autolike, autoview, mode, prefix, anticall, antiedit;

try {
  const settings = await fetchSettings();
  console.log("😴 settings object:", settings);
  ({ autobio, autolike, autoview, mode, prefix, anticall, antiedit } = settings);
  console.log("✅ Settings loaded successfully.... indexfile");
} catch (error) {
  console.error("❌ Failed to load settings:...indexfile", error.message || error);
  return;
}

  const { state, saveCreds } = await useMultiFileAuthState("session");
  const { version, isLatest } = await fetchLatestBaileysVersion();
  console.log(`using WA v${version.join(".")}, isLatest: ${isLatest}`);
  console.log(
    color(
      figlet.textSync("KING-M", {
        font: "Standard",
        horizontalLayout: "default",
        vertivalLayout: "default",
        whitespaceBreak: false,
      }),
      "green"
    )
  );

  const client = peaceConnect({
    version,
    logger: pino({ level: "silent" }),
    printQRInTerminal: false,
    browser: ["PEACE-AI", "Safari", "5.1.7"],
    auth: state,
    syncFullHistory: true,
  });

  // Auto bio update
  if (autobio === 'on') {
    setInterval(() => {
      const date = new Date();
      client.updateProfileStatus(
        `📅 ${date.toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })} | KING M`
      );
    }, 10 * 1000);
  }

  store.bind(client.ev);
  
  client.ev.on("messages.upsert", async (chatUpdate) => {
    try {
      let mek = chatUpdate.messages[0];
      if (!mek.message) return;
      
      // Handle ephemeral messages
      if (Object.keys(mek.message)[0] === "ephemeralMessage") {
        mek.message = mek.message.ephemeralMessage.message;
      }

      // ========== AUTO VIEW STATUS ==========
      if (autoview === 'on' && mek.key && mek.key.remoteJid === "status@broadcast") {
        try {
          const rawParticipant = mek.key.participant || mek.key.remoteJid;
          const senderJid = getProperJid(rawParticipant);
          
          if (senderJid) {
            await client.readMessages([{
              remoteJid: 'status@broadcast',
              id: mek.key.id,
              participant: senderJid,
              fromMe: false
            }]);
            console.log(`👁️ Viewed status`);
          } else {
            await client.readMessages([mek.key]);
          }
        } catch (e) {
          // Ignore view errors
        }
      }
      
      // ========== AUTO REACT STATUS ==========
      if (autoview === 'on' && autolike === 'on' && mek.key && mek.key.remoteJid === "status@broadcast") {
        // Don't react to own status
        if (mek.key.fromMe) {
          console.log('⏭️ Skipping own status');
        } else {
          // Check if already processed
          const statusId = mek.key.id;
          if (!reactedStatuses.has(statusId)) {
            // Add to queue
            statusQueue.push({ client, mek });
            console.log(`📥 Queued status ${statusId.substring(0,8)}... (${statusQueue.length} in queue)`);
            
            // Start processing if not already running
            if (!isProcessing) {
              processStatusQueue();
            }
          }
        }
      }
      
      // Skip if not public and not from me
      if (!client.public && !mek.key.fromMe && chatUpdate.type === "notify") return;
      
      // Process commands
      let m = smsg(client, mek, store);
      const peace = require("../peacemaker/peace");
      peace(client, m, chatUpdate, store);
      
    } catch (err) {
      console.log(err);
    }
  });

  // ========== ANTI-EDIT SYSTEM ==========
  client.ev.on('messages.update', async (messageUpdates) => {
    try {
      const { antiedit: currentAntiedit } = await fetchSettings();
      if (currentAntiedit === 'off') return;

      const now = Date.now();
      
      for (const update of messageUpdates) {
        const { key, update: { message } } = update;
        if (!key?.id || !message) continue;

        const editId = `${key.id}-${key.remoteJid}`;
        
        if (processedEdits.has(editId)) {
          const [timestamp] = processedEdits.get(editId);
          if (now - timestamp < EDIT_COOLDOWN) continue;
        }

        const chat = key.remoteJid;
        const isGroup = chat.endsWith('@g.us');
        const editedMsg = message.editedMessage?.message || message.editedMessage;
        if (!editedMsg) continue;

        // Try to get original message
        let originalMsg = {};
        try {
          if (store && typeof store.loadMessage === 'function') {
            originalMsg = await store.loadMessage(chat, key.id) || {};
          }
        } catch (e) {}
          
        const sender = key.participant || key.remoteJid;
        const senderName = await client.getName(sender).catch(() => 'Unknown');

        // Simple content extractor
        const getContent = (msg) => {
          if (!msg) return '[Deleted]';
          try {
            const type = Object.keys(msg)[0];
            const content = msg[type];
            
            if (type === 'conversation') return content;
            if (type === 'extendedTextMessage') return content.text || '[Text]';
            if (type === 'imageMessage') return `🖼️ ${content.caption || 'Image'}`;
            if (type === 'videoMessage') return `🎥 ${content.caption || 'Video'}`;
            return `[${type}]`;
          } catch (e) {
            return '[Unknown]';
          }
        };

        const originalContent = getContent(originalMsg.message);
        const editedContent = getContent(editedMsg);

        if (originalContent === editedContent) continue;

        const notificationMessage = `*⚠️ ANTI-EDIT ⚠️*\n\n` +
                                 `👤 *Sender:* @${sender.split('@')[0]}\n` +
                                 `📄 *Original:* ${originalContent}\n` +
                                 `✏️ *Edited:* ${editedContent}\n` +
                                 `📌 *Chat:* ${isGroup ? 'Group' : 'DM'}`;

        const sendTo = currentAntiedit === 'private' ? client.user.id : chat;
        await client.sendMessage(sendTo, { 
          text: notificationMessage,
          mentions: [sender]
        }).catch(() => {});

        processedEdits.set(editId, [now]);
        console.log(chalk.green(`[ANTIEDIT] Reported edit`));
      }

      // Cleanup old entries
      for (const [id, data] of processedEdits) {
        if (now - data[0] > 60000) {
          processedEdits.delete(id);
        }
      }
    } catch (err) {
      console.error(chalk.red('[ANTIEDIT ERROR]', err.message));
    }
  });

  // Error handlers
  process.on("unhandledRejection", (reason) => {
    console.log("Unhandled Rejection:", reason);
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
   
  client.ev.on("contacts.update", (update) => {
    for (let contact of update) {
      let id = client.decodeJid(contact.id);
      if (store && store.contacts) store.contacts[id] = { id, name: contact.notify };
    }
  });
  
  client.ev.on("group-participants.update", async (m) => {
    Events(client, m);
  });
  
  client.ev.on('call', async (callData) => {
    const { anticall: dbAnticall } = await fetchSettings();

    if (dbAnticall === 'on') {
      const callId = callData[0]?.id;
      const callerId = callData[0]?.from;

      if (callId && callerId) {
        await client.rejectCall(callId, callerId);
        if (Date.now() - lastTextTime >= messageDelay) {
          await client.sendMessage(callerId, {
            text: "🚫 Anticall is active. Only text messages are allowed."
          });
          lastTextTime = Date.now();
        }
      }
    }
  });

  client.getName = (jid, withoutContact = false) => {
    let id = client.decodeJid(jid);
    withoutContact = client.withoutContact || withoutContact;
    let v;
    if (id.endsWith("@g.us")) {
      return new Promise(async (resolve) => {
        v = store.contacts[id] || {};
        if (!(v.name || v.subject)) v = await client.groupMetadata(id).catch(() => ({}));
        resolve(v.name || v.subject || PhoneNumber("+" + id.replace("@s.whatsapp.net", "")).getNumber("international"));
      });
    } else {
      v = id === "0@s.whatsapp.net"
          ? { id, name: "WhatsApp" }
          : id === client.decodeJid(client.user.id)
          ? client.user
          : store.contacts[id] || {};
      return (withoutContact ? "" : v.name) || v.subject || v.verifiedName || PhoneNumber("+" + jid.replace("@s.whatsapp.net", "")).getNumber("international");
    }
  };

  client.public = true;

  client.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === "close") {
      let reason = new Boom(lastDisconnect?.error)?.output.statusCode;
      if (reason === DisconnectReason.badSession) {
        console.log(`Bad Session File, Please Delete Session and Scan Again`);
        process.exit();
      } else if (reason === DisconnectReason.connectionClosed) {
        console.log("Connection closed, reconnecting....");
        startPeace();
      } else if (reason === DisconnectReason.connectionLost) {
        console.log("Connection Lost from Server, reconnecting...");
        startPeace();
      } else if (reason === DisconnectReason.connectionReplaced) {
        console.log("Connection Replaced, Another New Session Opened, Please Restart Bot");
        process.exit();
      } else if (reason === DisconnectReason.loggedOut) {
        console.log(`Device Logged Out, Please Delete Session_id and Scan Again.`);
        process.exit();
      } else if (reason === DisconnectReason.restartRequired) {
        console.log("Restart Required, Restarting...");
        startPeace();
      } else if (reason === DisconnectReason.timedOut) {
        console.log("Connection TimedOut, Reconnecting...");
        startPeace();
      } else {
        console.log(`Unknown DisconnectReason: ${reason}|${connection}`);
        startPeace();
      }
    } else if (connection === "open") {
      try {
        await initializeDatabase();
        console.log("✅ PostgreSQL database initialized successfully.");
      } catch (err) {
        console.error("❌ Failed to initialize database:", err.message || err);
      }
      
      await client.groupAcceptInvite("CjBNEKIJq6VE2vrJLDSQ2Z").catch(() => {});
      
      console.log(color("Congrats, KING-M has successfully connected to this server", "green"));
      console.log(color("Follow me on Instagram as sescoresco", "red"));
      
      const Texxt = `❤️ *KING M STATUS*\n` +
              `───────────────────────\n` +
              `⚙️ Mode: ${mode}\n` +
              `⌨️ Prefix: ${prefix}\n` +
              `⏰ Time: ${new Date().toLocaleTimeString('en-US', { timeZone: 'Africa/Nairobi' })}\n` +
              `───────────────────────\n` +
              `✅ CONNECTED & ACTIVE`;
      
      client.sendMessage(client.user.id, { text: Texxt }).catch(() => {});
    }
  });

  client.ev.on("creds.update", saveCreds);
  
  // Helper functions
  const getBuffer = async (url, options) => {
    try {
      const res = await axios({
        method: "get",
        url,
        headers: { DNT: 1, "Upgrade-Insecure-Request": 1 },
        ...options,
        responseType: "arraybuffer",
      });
      return res.data;
    } catch (err) {
      return err;
    }
  };

  client.sendImage = async (jid, path, caption = "", quoted = "", options) => {
    let buffer = Buffer.isBuffer(path)
      ? path
      : /^data:.*?\/.*?;base64,/i.test(path)
      ? Buffer.from(path.split`,`[1], "base64")
      : /^https?:\/\//.test(path)
      ? await getBuffer(path)
      : fs.existsSync(path)
      ? fs.readFileSync(path)
      : Buffer.alloc(0);
    return await client.sendMessage(jid, { image: buffer, caption: caption, ...options }, { quoted });
  };

  client.sendText = (jid, text, quoted = "", options) => 
    client.sendMessage(jid, { text: text, ...options }, { quoted });

  return client;
}

// Start server
app.use(express.static("pixel"));
app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));
app.listen(port, () => console.log(`📡 Connected on port http://localhost:${port} 🛰`));

// Start bot
startPeace();

// Auto-reload on changes
let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`🔄 Reloading ${__filename}`));
  delete require.cache[file];
  require(file);
});
