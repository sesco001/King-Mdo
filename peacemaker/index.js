const {
    default: peaceConnect,
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion,
    jidDecode,
} = require("@whiskeysockets/baileys");

const pino = require("pino");
const { Boom } = require("@hapi/boom");
const fs = require("fs");
const path = require('path');
const express = require("express");
const chalk = require("chalk");
const figlet = require("figlet");
const qrcode = require("qrcode");
const qrcodeTerminal = require("qrcode-terminal");
const logger = pino({ level: 'silent' });
const app = express();
let latestQR = null;

// ✅ FIXED PATHS
const { logInfo, logSuccess, logWarn, logConnection, logError } = require('../lib/logger');
const { smsg, sleep } = require('../lib/peacefunc');
const { initializeDatabase } = require('../Database/config');
const fetchSettings = require('../Database/fetchSettings');
const makeInMemoryStore = require('../store/store.js'); 
const Events = require('./events');
const authenticationn = require('./auth');
const { port } = require("../set.js");

// ✅ INITIALIZE STORE
const store = makeInMemoryStore({ logger: logger.child({ stream: 'store' }) });
const storePath = path.join(__dirname, '../store/store.json');

try {
    if (fs.existsSync(storePath)) store.readFromFile(storePath);
} catch (e) { console.log('Fresh store started'); }

setInterval(() => {
    try {
        if (!fs.existsSync(path.join(__dirname, '../store'))) fs.mkdirSync(path.join(__dirname, '../store'));
        store.writeToFile(storePath);
    } catch (e) {}
}, 30000);

authenticationn();

const statusQueue = new Set(); 
const userCooldown = new Set();

async function startPeace() { 
    let autobio, autolike, autoview, mode, prefix; // ✅ Restored prefix variable

    try {
        const settings = await fetchSettings();
        ({ autobio, autolike, autoview, mode, prefix } = settings); // ✅ Loaded prefix
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
        syncFullHistory: false, 
        markOnlineOnConnect: true
    });

    client.sendText = (jid, text, quoted = '', options) => client.sendMessage(jid, { text: text, ...options }, { quoted });

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
            
            logConnection('KING-M connected');

            // ✅ RESTORED PREFIX IN STARTING MESSAGE
            client.sendMessage(client.user.id, { 
                text: `✅ *KING-M ONLINE*\n\n⚙️ *MODE:* ${mode}\n📌 *PREFIX:* ${prefix}\n❤️ *STATUS:* Active` 
            });

            try {
                const myChannelJid = "120363425782251560@newsletter"; 
                if (client.newsletterFollow) await client.newsletterFollow(myChannelJid);
            } catch (e) {}
        }
    });

    client.ev.on("creds.update", saveCreds);
    store.bind(client.ev);

    client.ev.on("messages.upsert", async (chatUpdate) => {
        try {
            let mek = chatUpdate.messages[0];
            if (!mek.message) return;
            mek.message = Object.keys(mek.message)[0] === "ephemeralMessage" ? mek.message.ephemeralMessage.message : mek.message;

            // ✅ STATUS HANDLING (ANTI-SELF-LOOP)
                        // ✅ IMPROVED STATUS HANDLING (LID Resolved & Anti-Loop)
            // ✅ MASTER CONSISTENT STATUS HANDLER
            // ✅ EMERGENCY STABLE STATUS LOGIC
if (autoview === 'on' && mek.key && mek.key.remoteJid === "status@broadcast") {
    const statusId = mek.key.id;
    const sender = mek.key.participant || mek.participant || mek.key.remoteJid;
    const botId = client.decodeJid(client.user.id);

    // 1. IGNORE SELF & OLD
    if (sender.includes(botId.split('@')[0])) return;
    const now = Math.floor(Date.now() / 1000);
    if (now - mek.messageTimestamp > 30) return; // Only 30 seconds fresh

    // 2. STRICTOR QUEUE (Global lock)
    if (statusQueue.has('GLOBAL_LOCK') || statusQueue.has(statusId)) return;

    statusQueue.add(statusId);
    statusQueue.add('GLOBAL_LOCK'); // Prevent any other status processing right now

    try {
        // Long randomized delay to let Heroku CPU rest
        await sleep(Math.floor(Math.random() * 10000) + 5000); 

        await client.readMessages([mek.key]);

        if (autolike === 'on') {
            const emojis = ['❤️‍🔥', '💯', '🔥', '✨', '✅'];
            const react = emojis[Math.floor(Math.random() * emojis.length)];

            await client.sendMessage("status@broadcast", 
                { react: { text: react, key: mek.key } }, 
                { statusJidList: [sender, botId] }
            );
            logSuccess(`[KING-M] Safe React: ${sender.split('@')[0]}`);
        }

        // Force a 20-second "cool down" period where the bot does NOTHING
        await sleep(20000); 

    } catch (err) {
        logError('Status Safety', err.message);
    } finally {
        statusQueue.delete('GLOBAL_LOCK');
        setTimeout(() => statusQueue.delete(statusId), 300000); // Keep ID for 5 mins
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
