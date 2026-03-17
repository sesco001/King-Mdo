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
const { logInfo, logSuccess, logWarn, logConnection, logError } = require('./lib/logger');
let lastTextTime = 0;
const messageDelay = 3000;
const Events = require('./peacemaker/events');
const authenticationn = require('./peacemaker/auth');
const { initializeDatabase } = require('./Database/config');
const fetchSettings = require('./Database/fetchSettings');
const PhoneNumber = require("awesome-phonenumber");
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./lib/peaceexif');

// ✅ FIXED IMPORTS
const { smsg, isUrl, generateMessageTag, getBuffer, getSizeMedia, fetchJson, sleep } = require('./lib/peacefunc');
const { sessionName, session, port, packname, mycode } = require("./set.js");
const makeInMemoryStore = require('./store/store.js'); 
const store = makeInMemoryStore({ logger: logger.child({ stream: 'store' }) });

// ✅ PERSISTENT STORE LOADING (Prevents H10/Dust Crashes)
const storePath = path.join(__dirname, './store/store.json');
try {
    if (fs.existsSync(storePath)) {
        store.readFromFile(storePath);
        logSuccess('Store loaded from disk');
    }
} catch (e) {
    logWarn('Starting fresh store');
}

// Auto-save every 30 seconds
setInterval(() => {
    try {
        store.writeToFile(storePath);
        if (store.clearOldMessages) store.clearOldMessages();
    } catch (e) {
        logError('Store Save', e.message);
    }
}, 30000);

authenticationn();

const processedEdits = new Map();
const statusQueue = new Set(); 
const EDIT_COOLDOWN = 5000; 

async function startPeace() { 
    let autobio, autolike, autoview, mode, prefix, anticall, antiedit;

    try {
        const settings = await fetchSettings();
        ({ autobio, autolike, autoview, mode, prefix, anticall, antiedit } = settings);
        logSuccess('Settings loaded');
    } catch (error) {
        logError('Settings', error.message);
        return;
    }

    const { state, saveCreds } = await useMultiFileAuthState("session");
    const { version, isLatest } = await fetchLatestBaileysVersion();
    
    logInfo(`Using WA v${version.join(".")}`);
    console.log(chalk.cyan(figlet.textSync("KING-M", { font: "Standard" })));

    const client = peaceConnect({
        version,
        logger: pino({ level: "silent" }),
        printQRInTerminal: false,
        browser: ["KING-M", "Safari", "5.1.7"],
        auth: state,
        // ✅ CRITICAL HEROKU MEMORY STABILITY
        syncFullHistory: false, 
        shouldSyncHistoryMessage: () => false,
        markOnlineOnConnect: true
    });

    client.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update;
        
        if (qr) {
            latestQR = qr;
            qrcodeTerminal.generate(qr, { small: true });
        }

        if (connection === "close") {
            let reason = new Boom(lastDisconnect?.error)?.output.statusCode;
            if (reason === DisconnectReason.loggedOut) {
                logError('Session', 'Logged out. Clear session folder.');
                process.exit();
            } else {
                startPeace();
            }
        } else if (connection === "open") {
            try { await initializeDatabase(); } catch (err) {}

            // ✅ AUTO-FOLLOW CHANNEL
            try {
                const myChannelJid = "120363425782251560@newsletter"; 
                if (client.newsletterFollow) await client.newsletterFollow(myChannelJid);
            } catch (e) {}

            logConnection('KING-M connected');
            client.sendMessage(client.user.id, { text: `❤️ *KING-M ONLINE*\nMode: ${mode}\nPrefix: ${prefix}` });
        }
    });

    client.ev.on("creds.update", saveCreds);
    store.bind(client.ev);

    client.ev.on("messages.upsert", async (chatUpdate) => {
        try {
            let mek = chatUpdate.messages[0];
            if (!mek.message) return;
            mek.message = Object.keys(mek.message)[0] === "ephemeralMessage" ? mek.message.ephemeralMessage.message : mek.message;

            // ✅ STABILIZED STATUS HANDLING (Fixed R14 Memory Crash)
            if (autoview === 'on' && mek.key && mek.key.remoteJid === "status@broadcast") {
                const statusId = mek.key.id;
                if (statusQueue.has(statusId)) return;
                statusQueue.add(statusId);

                try {
                    // Randomized delay (3-8 seconds) keeps Heroku RAM usage stable
                    const delay = Math.floor(Math.random() * (8000 - 3000 + 1)) + 3000;
                    await sleep(delay);

                    await client.readMessages([mek.key]);

                    if (autolike === 'on') {
                        const myJid = client.decodeJid(client.user.id);
                        const sender = mek.key.participant || mek.participant || mek.key.remoteJid;
                        
                        if (!sender) return;

                        const emojis = ['🗿', '❤️‍🔥', '💯', '🔥', '💫', '🌟', '✅'];
                        const react = emojis[Math.floor(Math.random() * emojis.length)];

                        await client.sendMessage(
                            "status@broadcast", 
                            { react: { text: react, key: mek.key } }, 
                            { statusJidList: [sender, myJid] }
                        );
                        logSuccess(`[KING-M] Status React Success: ${sender.split('@')[0]}`);
                    }
                } catch (err) { 
                    logError('Status Error', err.message); 
                } finally {
                    // Remove from memory after 1 minute
                    setTimeout(() => statusQueue.delete(statusId), 60000);
                }
            }

            if (!client.public && !mek.key.fromMe) return;
            
            let m = smsg(client, mek, store);
            const peace = require("./peacemaker/peace");
            peace(client, m, chatUpdate, store);

        } catch (err) { console.log(err); }
    });

    // ... (rest of listeners like anticall, getname) ...

    client.decodeJid = (jid) => {
        if (!jid) return jid;
        if (/:\d+@/gi.test(jid)) {
            let decode = jidDecode(jid) || {};
            return (decode.user && decode.server && decode.user + "@" + decode.server) || jid;
        } else return jid;
    };

    client.serializeM = (m) => smsg(client, m, store);

    return client;
}

// ✅ WEB SERVER
app.get("/qr", async (req, res) => {
    if (!latestQR) return res.send('Bot Active');
    const qrImage = await qrcode.toDataURL(latestQR, { width: 300 });
    res.send(`<img src="${qrImage}"/>`);
});
app.listen(port, () => logSuccess(`Server on port ${port}`));

startPeace();
