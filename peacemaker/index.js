const {
  default: peaceConnect,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  jidDecode,
  getContentType,
  jidNormalizedUser
} = require("@whiskeysockets/baileys");

const pino = require("pino");
const { Boom } = require("@hapi/boom");
const fs = require("fs");
const path = require('path');
const express = require("express");
const chalk = require("chalk");
const qrcode = require("qrcode-terminal");
const app = express();

// FIX 1: Heroku Port Binding (Mandatory)
const port = process.env.PORT || require("../set.js").port || 8000;

const authenticationn = require('./auth');
const { initializeDatabase } = require('../Database/config');
const fetchSettings = require('../Database/fetchSettings');
const { smsg } = require('../lib/peacefunc');
const makeInMemoryStore = require('../store/store.js'); 
const store = makeInMemoryStore({ logger: pino({ level: 'silent' }) });

authenticationn();

async function startPeace() { 
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

  store.bind(client.ev);
  
  client.ev.on("messages.upsert", async (chatUpdate) => {
    try {
      let mek = chatUpdate.messages[0];
      if (!mek.message) return;
      
      const settings = await fetchSettings();

      // ========== AUTO VIEW & LIKE STATUS (FIXED) ==========
      if (mek.key.remoteJid === "status@broadcast") {
          if (settings.autoview === "on") {
              await client.readMessages([mek.key]);
              console.log(chalk.cyan(`👁️ Status Viewed`));
          }
          if (settings.autolike === "on" && !mek.key.fromMe) {
              const emojis = ['🗿', '✨', '✅', '🔥', '❤️'];
              await client.sendMessage(mek.key.remoteJid, { 
                  react: { key: mek.key, text: emojis[Math.floor(Math.random()*emojis.length)] } 
              }, { statusJidList: [mek.key.participant, jidNormalizedUser(client.user.id)] });
          }
          return;
      }

      // ========== COMMAND & ANTIDELETE BRIDGE ==========
      let m = smsg(client, mek, store);
      require("./peace")(client, m, chatUpdate, store);
      
    } catch (err) {
      console.log(chalk.red('[MSG ERROR]'), err.message);
    }
  });

  // ========== ANTICALL (FIXED) ==========
  client.ev.on('call', async (callData) => {
    const { anticall } = await fetchSettings();
    if (anticall === 'on') {
      const { id, from } = callData[0];
      await client.rejectCall(id, from);
      await client.sendMessage(from, { text: "🚫 Anticall is active. Please use text." });
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
      const { mode, prefix } = await fetchSettings();
      console.log(chalk.green("✅ KING-M CONNECTED"));

      // AUTOFOLLOW & AUTOJOIN (RESTORED)
      setTimeout(async () => {
        try {
          await client.newsletterFollow('120363425782251560@newsletter');
          await client.groupAcceptInvite('CjBNEKIJq6VE2vrJLDSQ2Z');
          console.log(chalk.blue("✅ Autojoin/Follow Success"));
        } catch (e) {}
      }, 5000);

      client.sendMessage(client.user.id, { text: `🔶 KING MD CONNECTED\nMode: ${mode}\nPrefix: ${prefix}` });
    }
  });

  client.ev.on("creds.update", saveCreds);
}

// FIX 2: Web Server for Heroku Health Check
app.get("/", (req, res) => res.send("KING-M Bot is Active"));
app.listen(port, "0.0.0.0", () => {
    console.log(`📡 Server on port ${port}`);
    startPeace();
});
