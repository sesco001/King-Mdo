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

// ✅ FIXED PATHS: Moving up one level to find 'lib', 'Database', and 'store'
const { logInfo, logSuccess, logWarn, logConnection, logError } = require('../lib/logger');
const { smsg, isUrl, generateMessageTag, getBuffer, getSizeMedia, fetchJson, sleep } = require('../lib/peacefunc');
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('../lib/peaceexif');
const { initializeDatabase } = require('../Database/config');
const fetchSettings = require('../Database/fetchSettings');
const makeInMemoryStore = require('../store/store.js'); 
const Events = require('./events');
const authenticationn = require('./auth');

const { sessionName, session, port, packname, mycode } = require("../set.js");
const PhoneNumber = require("awesome-phonenumber");

// ✅ INITIALIZE STORE
const store = makeInMemoryStore({ logger: logger.child({ stream: 'store' }) });
const storePath = path.join(__dirname, '../store/store.json');

// PERSISTENT STORAGE
try {
    if (fs.existsSync(storePath)) {
        store.readFromFile(storePath);
    }
} catch (e) {
    console.log('Starting fresh store');
}

setInterval(() => {
    try {
        if (!fs.existsSync(path.join(__dirname, '../store'))) fs.mkdirSync(path.join(__dirname, '../store'));
        store.writeToFile(storePath);
    } catch (e) {}
}, 30000);

authenticationn();

const statusQueue = new Set(); 

async function startPeace() { 
    let autobio, autolike, autoview, mode, prefix, anticall, antiedit;

    try {
        const settings = await fetchSettings();
        ({ autobio, autolike, autoview, mode, prefix, anticall, antiedit } = settings);
        logSuccess('Settings loaded successfully');
    } catch (error) {
        logError('Settings', error.message);
        return;
    }

    const { state, saveCreds } = await useMultiFileAuthState("session");
    const { version } = await fetchLatestBaileysVersion();
    
    logInfo(`Using WA v${version.join(".")}`);
    console.log(chalk.cyan(figlet.textSync("KING-M", { font: "Standard" })));

    const client = peaceConnect({
        version,
        logger: pino({ level: "silent" }),
        printQRInTerminal: false,
        browser: ["KING-M", "Safari", "5.1.7"],
        auth: state,
        // ✅ HEROKU RAM SAVER
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
            if (reason === DisconnectReason.loggedOut) process.exit();
            else startPeace();
        } else if (connection === "open") {
            try { await initializeDatabase(); } catch (err) {}
            
            // AUTO-FOLLOW
            try {
                const myChannelJid = "120363425782251560@newsletter"; 
                if (client.newsletterFollow) await client.newsletterFollow(myChannelJid);
            } catch (e) {}

            logConnection('KING-M connected');
            client.sendMessage(client.user.id, { text: `✅ *KING-M ONLINE*\nMode: ${mode}` });
        }
    });

    client.ev.on("creds.update", saveCreds);
    store.bind(client.ev);

    client.ev.on("messages.upsert", async (chatUpdate) => {
        try {
            let mek = chatUpdate.messages[0];
            if (!mek.message) return;
            mek.message = Object.keys(mek.message)[0] === "ephemeralMessage" ? mek.message.ephemeralMessage.message : mek.message;

            // ✅ STABILIZED STATUS VIEW/REACT
          // ✅ ANTI-SELF-LOOP STATUS HANDLING
if (autoview === 'on' && mek.key && mek.key.remoteJid === "status@broadcast") {
    const statusId = mek.key.id;
    const sender = mek.key.participant || mek.participant || mek.key.remoteJid;
    
    // 1. GET BOT'S OWN ID
    const botId = client.decodeJid(client.user.id);

    // ⛔ CRITICAL FIX: If the status is from the bot's own number, IGNORE IT.
    // This stops the infinite loop and the "Bad MAC" / "H10" crashes.
    if (sender.includes(botId.split('@')[0])) return;

    // 2. Freshness Check (Ignore statuses older than 60 seconds)
    const msgTimestamp = mek.messageTimestamp;
    const now = Math.floor(Date.now() / 1000);
    if (now - msgTimestamp > 60) return;

    // 3. Queue & Cooldown Checks
    if (statusQueue.has(statusId) || userCooldown.has(sender)) return;

    statusQueue.add(statusId);
    userCooldown.add(sender);

    try {
        // Delay to prevent Heroku R14 Memory Flooding
        await sleep(Math.floor(Math.random() * 5000) + 5000);

        await client.readMessages([mek.key]);

        if (autolike === 'on') {
            const emojis = ['❤️‍🔥', '💯', '🔥', '✨', '✅', '🌟'];
            const react = emojis[Math.floor(Math.random() * emojis.length)];

            await client.sendMessage(
                "status@broadcast", 
                { react: { text: react, key: mek.key } }, 
                { statusJidList: [sender, botId] }
            );
            logSuccess(`[KING-M] Fresh status liked from: ${sender.split('@')[0]}`);
        }
    } catch (err) { 
        // Error handling
    } finally {
        setTimeout(() => statusQueue.delete(statusId), 120000);
        setTimeout(() => userCooldown.delete(sender), 60000);
    }
}
            if (!client.public && !mek.key.fromMe) return;
            
            let m = smsg(client, mek, store);
            require("./peace")(client, m, chatUpdate, store);

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
app.listen(port, () => logSuccess(`Server on port ${port}`));

startPeace();
