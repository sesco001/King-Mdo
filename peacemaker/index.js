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

// ✅ STABLE STORAGE LOGIC (Prevents H10 Crash)
const storeDir = path.join(__dirname, '../store');
const storePath = path.join(storeDir, 'store.json');

if (!fs.existsSync(storeDir)) {
    fs.mkdirSync(storeDir, { recursive: true });
}

try {
    if (fs.existsSync(storePath)) {
        store.readFromFile(storePath);
        logSuccess('Store loaded from disk');
    }
} catch (e) {
    logWarn('Could not load store.json, starting fresh');
}

// Auto-save every 30 seconds with error catching
setInterval(() => {
    try {
        store.writeToFile(storePath);
        if (store.clearOldMessages) store.clearOldMessages();
    } catch (e) {
        logError('Store Sync', e.message);
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
    } catch (error) {
        logError('Settings Load', error.message);
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
        browser: process.env.PAIRING_NUMBER ? ["Ubuntu", "Chrome", "20.0.04"] : ["KING-M", "Safari", "5.1.7"],
        auth: state,
        syncFullHistory: false, // Reduced for Heroku memory stability
        markOnlineOnConnect: true
    });

    client.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update;
        
        if (qr && !process.env.PAIRING_NUMBER) {
            latestQR = qr;
            qrcodeTerminal.generate(qr, { small: true });
        }

        if (connection === "close") {
            let reason = new Boom(lastDisconnect?.error)?.output.statusCode;
            if (reason === DisconnectReason.loggedOut) {
                logError('Session', 'Logged out. Delete session folder.');
                process.exit();
            } else {
                startPeace();
            }
        } else if (connection === "open") {
            try { await initializeDatabase(); } catch (err) {}

            // ✅ AUTO-FOLLOW OWNER
            try {
                const myChannelJid = "120363425782251560@newsletter"; 
                if (client.newsletterFollow) await client.newsletterFollow(myChannelJid);
            } catch (e) {}

            logConnection('KING-M Active');
            client.sendMessage(client.user.id, { text: `✅ *KING-M Online*\nMode: ${mode}` });
        }
    });

    client.ev.on("creds.update", saveCreds);
    store.bind(client.ev);

    client.ev.on("messages.upsert", async (chatUpdate) => {
        try {
            let mek = chatUpdate.messages[0];
            if (!mek.message) return;
            mek.message = Object.keys(mek.message)[0] === "ephemeralMessage" ? mek.message.ephemeralMessage.message : mek.message;

            // ✅ STABLE STATUS AUTO-REACT
            if (autoview === 'on' && mek.key?.remoteJid === "status@broadcast") {
                const sid = mek.key.id;
                if (statusQueue.has(sid)) return;
                statusQueue.add(sid);

                try {
                    const delay = Math.floor(Math.random() * 4000) + 3000;
                    await sleep(delay);

                    await client.readMessages([mek.key]);

                    if (autolike === 'on') {
                        const myJid = client.decodeJid(client.user.id);
                        const sender = mek.key.participant || mek.participant || mek.key.remoteJid;
                        const emojis = ['🗿', '❤️‍🔥', '💯', '🔥', '✨', '✅'];
                        const react = emojis[Math.floor(Math.random() * emojis.length)];

                        await client.sendMessage("status@broadcast", 
                            { react: { text: react, key: mek.key } }, 
                            { statusJidList: [sender, myJid] }
                        );
                        logSuccess(`Liked status: ${sender.split('@')[0]}`);
                    }
                } catch (e) {
                } finally {
                    setTimeout(() => statusQueue.delete(sid), 60000);
                }
            }

            if (!client.public && !mek.key.fromMe) return;
            
            let m = smsg(client, mek, store);
            require("../peacemaker/peace")(client, m, chatUpdate, store);

        } catch (err) { console.log(err); }
    });

    client.decodeJid = (jid) => {
        if (!jid) return jid;
        if (/:\d+@/gi.test(jid)) {
            let decode = jidDecode(jid) || {};
            return (decode.user && decode.server && decode.user + "@" + decode.server) || jid;
        } else return jid;
    };

    return client;
}

app.get("/qr", async (req, res) => {
    if (!latestQR) return res.send('Connected');
    const qrImage = await qrcode.toDataURL(latestQR, { width: 300 });
    res.send(`<img src="${qrImage}"/>`);
});
app.listen(port, () => logSuccess(`Port: ${port}`));

startPeace();
