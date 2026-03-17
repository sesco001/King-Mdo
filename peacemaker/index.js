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

authenticationn();

const processedEdits = new Map();
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

            // ✅ AUTO-FOLLOW CHANNEL LOGIC
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

            // ✅ STABILIZED AUTO-STATUS VIEW & REACT (Fixed R14 Memory Crash)
            if (autoview === 'on' && mek.key && mek.key.remoteJid === "status@broadcast") {
                try {
                    // Randomized delay to prevent flooding Heroku memory
                    const delay = Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000;
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
                } catch (err) { logError('Status Process', err.message); }
            }

            if (!client.public && !mek.key.fromMe && chatUpdate.type === "notify") return;
            
            let m = smsg(client, mek, store);
            const peace = require("../peacemaker/peace");
            peace(client, m, chatUpdate, store);

        } catch (err) { console.log(err); }
    });

    // ... Rest of the listeners (messages.update, call, etc.) same as previous ...
    client.ev.on("creds.update", saveCreds);
    client.decodeJid = (jid) => {
        if (!jid) return jid;
        if (/:\d+@/gi.test(jid)) {
            let decode = jidDecode(jid) || {};
            return (decode.user && decode.server && decode.user + "@" + decode.server) || jid;
        } else return jid;
    };

    return client;
}

app.listen(port, '0.0.0.0', () => logSuccess(`Server on port ${port}`));
startPeace();
