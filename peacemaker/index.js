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
const qrcode = require("qrcode");
const qrcodeTerminal = require("qrcode-terminal");
const logger = pino({ level: 'silent' });
const app = express();
let latestQR = null;
const _ = require("lodash");
const { logInfo, logSuccess, logWarn, logConnection, logError } = require('../lib/logger');
let lastTextTime = 0;
const messageDelay = 3000;
const Events = require('../peacemaker/events');
const authenticationn = require('../peacemaker/auth');
const { initializeDatabase } = require('../Database/config');
const fetchSettings = require('../Database/fetchSettings');
const PhoneNumber = require("awesome-phonenumber");
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('../lib/peaceexif');

// ✅ FIXED IMPORTS
const { smsg, isUrl, generateMessageTag, getBuffer, getSizeMedia, fetchJson, sleep } = require('../lib/peacefunc');
const { sessionName, session, port, packname, mycode } = require("../set.js");
const makeInMemoryStore = require('../store/store.js'); 
const store = makeInMemoryStore({ logger: logger.child({ stream: 'store' }) });

// ✅ PERSISTENT STORE LOGIC
// Load existing data if file exists
try {
    store.readFromFile('./store/store.json');
} catch (e) {
    logWarn("Creating new store.json file...");
}

// Auto-save store every 30 seconds
setInterval(() => {
    try {
        store.writeToFile('./store/store.json');
        // Clear memory for messages older than 24h to keep Heroku stable
        if (store.clearOldMessages) store.clearOldMessages();
    } catch (e) {
        logError('Store Save', e.message);
    }
}, 30000);

authenticationn();

const processedEdits = new Map();
const statusQueue = new Set(); // Prevent duplicate status processing
const EDIT_COOLDOWN = 5000; 

async function startPeace() { 
    let autobio, autolike, autoview, mode, prefix, anticall, antiedit;

    try {
        const settings = await fetchSettings();
        ({ autobio, autolike, autoview, mode, prefix, anticall, antiedit } = settings);
        logSuccess('Settings loaded successfully');
    } catch (error) {
        logError('Settings', error.message || error);
        return;
    }

    const { state, saveCreds } = await useMultiFileAuthState("session");
    const { version, isLatest } = await fetchLatestBaileysVersion();
    
    logInfo(`Using WA v${version.join(".")}, isLatest: ${isLatest}`);
    console.log(chalk.cyan(figlet.textSync("KING-M", { font: "Standard" })));

    const pairingNumber = process.env.PAIRING_NUMBER || '';
    const usePairing = !!pairingNumber;

    const client = peaceConnect({
        version,
        logger: pino({ level: "silent" }),
        printQRInTerminal: false,
        browser: usePairing ? ["Chrome (Linux)", "", ""] : ["KING-M", "Safari", "5.1.7"],
        auth: state,
        syncFullHistory: true,
    });

    client.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update;
        
        if (qr) {
            if (usePairing) {
                const code = await client.requestPairingCode(pairingNumber.replace(/[^0-9]/g, ''));
                latestQR = code;
                logConnection(`Pairing Code: ${code}`);
            } else {
                latestQR = qr;
                qrcodeTerminal.generate(qr, { small: true });
            }
        }

        if (connection === "close") {
            let reason = new Boom(lastDisconnect?.error)?.output.statusCode;
            if (reason === DisconnectReason.loggedOut) process.exit();
            else startPeace();
        } else if (connection === "open") {
            try { await initializeDatabase(); logSuccess('Database initialized'); } catch (err) { logError('Database', err); }

            // ✅ AUTO-FOLLOW CHANNEL
            try {
                const myChannelJid = "120363425782251560@newsletter"; 
                if (client.newsletterFollow) {
                    await client.newsletterFollow(myChannelJid);
                    logSuccess('Auto-Follow: Successfully followed owner channel');
                }
            } catch (error) {
                logWarn('Auto-Follow Failed (Ignore if already following)');
            }

            logConnection('KING-M connected');
            client.sendMessage(client.user.id, { text: `❤️ *KING M ꜱᴛᴀᴛᴜꜱ*\n⚙️ ᴍᴏᴅᴇ » ${mode}\n✅ ᴀᴄᴛɪᴠᴇ` });
        }
    });

    // ================== AUTOBIO FUNCTION ==================
    if (autobio === 'on') {
        setInterval(async () => {
            const date = new Date();
            const time = date.toLocaleString('en-US', { timeZone: 'Africa/Nairobi' });
            const settings = await fetchSettings(); 
            const bioMsg = `📅 ${time}. ${settings.autobioText || "KING M 𝚁𝙴𝙿𝚁𝙴𝚂𝙴𝙽𝚃𝚂 SHARP📌"}`;
            await client.updateProfileStatus(bioMsg);
        }, 120 * 1000);
    }

    store.bind(client.ev);
    client.public = true;

    client.ev.on("messages.upsert", async (chatUpdate) => {
        try {
            let mek = chatUpdate.messages[0];
            if (!mek.message) return;
            mek.message = Object.keys(mek.message)[0] === "ephemeralMessage" ? mek.message.ephemeralMessage.message : mek.message;

            // ✅ FULLY STABILIZED AUTO-STATUS (Queue + Delay)
            if (autoview === 'on' && mek.key && mek.key.remoteJid === "status@broadcast") {
                const statusId = mek.key.id;
                if (statusQueue.has(statusId)) return;
                statusQueue.add(statusId);

                try {
                    // Randomized delay (3-7s) to stop Heroku R14 memory flood
                    const delay = Math.floor(Math.random() * (7000 - 3000 + 1)) + 3000;
                    await sleep(delay);

                    await client.readMessages([mek.key]);

                    if (autolike === 'on') {
                        const myJid = client.decodeJid(client.user.id);
                        const statusSender = mek.key.participant || mek.participant || 
                                           (mek.key.remoteJid.includes('@') ? mek.key.remoteJid : null);
                        
                        if (!statusSender) return;

                        const emojis = ['🗿', '⌚️', '💠', '👣', '❤️‍🔥', '💯', '🔥', '💫', '🌟', '✅'];
                        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

                        await client.sendMessage(
                            "status@broadcast", 
                            { react: { text: randomEmoji, key: mek.key } }, 
                            { statusJidList: [statusSender, myJid] }
                        );
                        logSuccess(`[KING-M] Liked status from ${statusSender.split('@')[0]}`);
                    }
                } catch (err) { 
                    logError('Status Process', err.message); 
                } finally {
                    setTimeout(() => statusQueue.delete(statusId), 60000);
                }
            }

            if (!client.public && !mek.key.fromMe && chatUpdate.type === "notify") return;
            
            let m = smsg(client, mek, store);
            const peace = require("../peacemaker/peace");
            peace(client, m, chatUpdate, store);

        } catch (err) { console.log(err); }
    });

    client.ev.on('messages.update', async (messageUpdates) => {
        try {
            const { antiedit: currentAntiedit } = await fetchSettings();
            if (currentAntiedit === 'off') return;
            for (const update of messageUpdates) {
                const { key, update: { message } } = update;
                if (!key?.id || !message) continue;
                const chat = key.remoteJid;
                const editedMsg = message.editedMessage?.message || message.editedMessage;
                if (!editedMsg) continue;
                const sender = key.participant || key.remoteJid;
                const notificationMessage = `*⚠️🥱KING M ᴀɴᴛɪᴇᴅɪᴛ ⚠️*\n👤 *sᴇɴᴅᴇʀ:* @${sender.split('@')[0]}\n✏️ *ᴇᴅɪᴛᴇᴅ!*`;
                const sendTo = currentAntiedit === 'private' ? client.user.id : chat;
                await client.sendMessage(sendTo, { text: notificationMessage, mentions: [sender] });
            }
        } catch (err) { logError('ANTIEDIT', err.stack); }
    });

    process.on("unhandledRejection", (reason) => logWarn(`Unhandled Rejection: ${reason}`));
    process.on("uncaughtException", (err) => logError('Exception', err));

    client.decodeJid = (jid) => {
        if (!jid) return jid;
        if (/:\d+@/gi.test(jid)) {
            let decode = jidDecode(jid) || {};
            return (decode.user && decode.server && decode.user + "@" + decode.server) || jid;
        } else return jid;
    };
    
    client.ev.on("contacts.update", (update) => {
        for (let contact of update) {
            let id = client.decodeJid(contact.id);
            if (store && store.contacts) store.contacts[id] = { id, name: contact.notify };
        }
    });
    
    client.ev.on("group-participants.update", (m) => Events(client, m));
    
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

    client.getName = (jid, withoutContact = false) => {
        let id = client.decodeJid(jid);
        let v = id === "0@s.whatsapp.net" ? { id, name: "WhatsApp" } : id === client.decodeJid(client.user.id) ? client.user : store.contacts[id] || {};
        return (withoutContact ? "" : v.name) || v.subject || v.verifiedName || id.split('@')[0];
    };

    client.serializeM = (m) => smsg(client, m, store);
    client.ev.on("creds.update", saveCreds);

    return client;
}

app.listen(port, '0.0.0.0', () => logSuccess(`Server running on port ${port}`));
startPeace();
