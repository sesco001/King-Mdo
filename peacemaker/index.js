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
const currentTime = Date.now();
const Events = require('../peacemaker/events');
const authenticationn = require('../peacemaker/auth');
const { initializeDatabase } = require('../Database/config');
const fetchSettings = require('../Database/fetchSettings');
const PhoneNumber = require("awesome-phonenumber");
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('../lib/peaceexif');

// ✅ FIXED IMPORTS (Removed 'await' keyword error)
const { smsg, isUrl, generateMessageTag, getBuffer, getSizeMedia, fetchJson, sleep } = require('../lib/peacefunc');
const { sessionName, session, port, packname, mycode } = require("../set.js");
const makeInMemoryStore = require('../store/store.js'); 
const store = makeInMemoryStore({ logger: logger.child({ stream: 'store' }) });
const color = (text, color) => {
    return !color ? chalk.green(text) : chalk.keyword(color)(text);
};

authenticationn();

const processedEdits = new Map();
const EDIT_COOLDOWN = 5000; 

async function startPeace() { 
    
    let autobio, autolike, autoview, mode, prefix, anticall, antiedit;

    try {
        const settings = await fetchSettings();
        ({ autobio, autolike, autoview, mode, prefix, anticall, autolike_emojis, antiedit } = settings);
        logSuccess('Settings loaded successfully');
    } catch (error) {
        logError('Settings', error.message || error);
        return;
    }

    const { state, saveCreds } = await useMultiFileAuthState("session");
    const { version, isLatest } = await fetchLatestBaileysVersion();
    logInfo(`Using WA v${version.join(".")}, isLatest: ${isLatest}`);
    console.log(
        chalk.cyan(
            figlet.textSync("KING-M", {
                font: "Standard",
                horizontalLayout: "default",
                vertivalLayout: "default",
                whitespaceBreak: false,
            })
        )
    );

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

    let pairingRequested = false;
    client.ev.on('connection.update', async (update) => {
        if (update.qr) {
            if (usePairing && !pairingRequested) {
                pairingRequested = true;
                const cleanNumber = pairingNumber.replace(/[^0-9]/g, '');
                try {
                    const code = await client.requestPairingCode(cleanNumber);
                    latestQR = code;
                    logConnection(`Your Pairing Code: ${code}`);
                    logInfo('Steps to link:');
                    console.log(chalk.yellow('  1. Open WhatsApp on your phone'));
                    console.log(chalk.yellow('  2. Go to Settings > Linked Devices'));
                    console.log(chalk.yellow('  3. Tap "Link a Device"'));
                    console.log(chalk.yellow('  4. When the camera opens, look at the BOTTOM'));
                    console.log(chalk.yellow('  5. Tap "Link with phone number instead"'));
                    console.log(chalk.yellow('  6. Enter the code: ' + code));
                    logWarn('Make sure your WhatsApp is updated to the latest version!');
                } catch (err) {
                    logError('Pairing', err.message || err);
                    pairingRequested = false;
                }
            } else if (!usePairing) {
                latestQR = update.qr;
                logConnection('QR Code generated - scan it to connect!');
                qrcodeTerminal.generate(update.qr, { small: true }, (qrArt) => {
                    console.log('\n' + qrArt + '\n');
                });
            }
        }
    });

    // ================== AUTOBIO FUNCTION ==================
    if (autobio === 'on') {
        setInterval(async () => {
            const date = new Date();
            const time = date.toLocaleString('en-US', { timeZone: 'Africa/Nairobi' });
            const day = date.toLocaleString('en-US', { weekday: 'long', timeZone: 'Africa/Nairobi'});
            const settings = await fetchSettings(); 
            const customText = settings.autobioText || "KING M 𝚁𝙴𝙿𝚁𝙴𝚂𝙴𝙽𝚃𝚂 SHARP📌";
            const bioMsg = `📅 ${time} ⏰ ${day}. ${customText}`;
            await client.updateProfileStatus(bioMsg);
        }, 120 * 1000);
    }

    store.bind(client.ev);
    client.public = true; // Set Public immediately

    client.ev.on("messages.upsert", async (chatUpdate) => {
        try {
            let mek = chatUpdate.messages[0];
            if (!mek.message) return;
            mek.message = Object.keys(mek.message)[0] === "ephemeralMessage" ? mek.message.ephemeralMessage.message : mek.message;

            // ================== AUTO-STATUS REACT (CRASH FIXED) ==================
   if (autoview === 'on' && mek.key && mek.key.remoteJid === "status@broadcast") {
        client.readMessages([mek.key]);
      }
            
 if (autoview === 'on' && autolike === 'on' && mek.key && mek.key.remoteJid === "status@broadcast") {
        const nickk = await client.decodeJid(client.user.id);
        const emojis = ['🗿', '⌚️', '💠', '👣', '🍆', '💔', '🤍', '❤️‍🔥', '💣', '🧠', '🦅', '🌻', '🧊', '🛑', '🧸', '👑', '📍', '😅', '🎭', '🎉', '😳', '💯', '🔥', '💫', '🐒', '💗', '❤️‍🔥', '👁️', '👀', '🙌', '🙆', '🌟', '💧', '🦄', '🟢', '🎎', '✅', '🥱', '🌚', '💚', '💕', '😉', '😒'];
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        await client.sendMessage(mek.key.remoteJid, { react: { text: randomEmoji, key: mek.key, } }, { statusJidList: [mek.key.participant, nickk] });
        await sleep(messageDelay);
   logSuccess('Reaction sent successfully');
          }

            // ====================================================================
           
            // ==============================================================================

            // ================== COMMAND HANDLER ==================
            if (!client.public && !mek.key.fromMe && chatUpdate.type === "notify") return;
            
            let m = smsg(client, mek, store);
            const peace = require("../peacemaker/peace");
            peace(client, m, chatUpdate, store);

        } catch (err) {
            console.log(err);
        }
    });

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

                const originalMsg = await store.loadMessage(chat, key.id) || {};
                const sender = key.participant || key.remoteJid;
                const senderName = await client.getName(sender);

                const getContent = (msg) => {
                    if (!msg) return '[Deleted]';
                    const type = Object.keys(msg)[0];
                    const content = msg[type];
                    
                    switch(type) {
                        case 'conversation': 
                            return content;
                        case 'extendedTextMessage': 
                            return content.text + 
                                   (content.contextInfo?.quotedMessage ? ' (with quoted message)' : '');
                        case 'imageMessage': 
                            return `🖼️ ${content.caption || 'Image'}`;
                        case 'videoMessage': 
                            return `🎥 ${content.caption || 'Video'}`;
                        case 'documentMessage': 
                            return `📄 ${content.fileName || 'Document'}`;
                        default: 
                            return `[${type.replace('Message', '')}]`;
                    }
                };

                const originalContent = getContent(originalMsg.message);
                const editedContent = getContent(editedMsg);

                if (originalContent === editedContent) continue;

                const notificationMessage = `*⚠️🥱KING M ᴀɴᴛɪᴇᴅɪᴛ ⚠️*\n\n` +
                                             `👤 *sᴇɴᴅᴇʀ:* @${sender.split('@')[0]}\n` +
                                             `📄 *ᴏʀɪɢɪɴᴀʟ ᴍᴇssᴀɢᴇ:* ${originalContent}\n` +
                                             `✏️ *ᴇᴅɪᴛᴇᴅ ᴍᴇssᴀɢᴇ:* ${editedContent}\n` +
                                             `🧾 *ᴄʜᴀᴛ ᴛʏᴘᴇ:* ${isGroup ? 'Group' : 'DM'}`;

                const sendTo = currentAntiedit === 'private' ? client.user.id : chat;
                await client.sendMessage(sendTo, { 
                    text: notificationMessage,
                    mentions: [sender]
                });

                processedEdits.set(editId, [now, originalContent, editedContent]);
                logInfo(`[ANTIEDIT] Reported edit from ${senderName}`);
            }
        } catch (err) {
            logError('ANTIEDIT', err.stack);
        }
    });

    process.on("unhandledRejection", (reason, promise) => {
        logWarn(`Unhandled Rejection: ${reason}`);
    });
    process.on("rejectionHandled", (promise) => {
    });
    process.on("uncaughtException", function (err) {
        logError('Exception', err);
    });

    // Setting
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
                const currentTime = Date.now();
                if (currentTime - lastTextTime >= messageDelay) {
                    await client.sendMessage(callerId, {
                        text: "🚫 Anticall is active. Only text messages are allowed."
                    });
                    lastTextTime = currentTime;
                }
            }
        } else {
            logInfo('Anticall is OFF. Call ignored.');
        }
    });

    client.getName = (jid, withoutContact = false) => {
        let id = client.decodeJid(jid);
        withoutContact = client.withoutContact || withoutContact;
        let v;
        if (id.endsWith("@g.us"))
            return new Promise(async (resolve) => {
                v = store.contacts[id] || {};
                if (!(v.name || v.subject)) v = client.groupMetadata(id) || {};
                resolve(v.name || v.subject || PhoneNumber("+" + id.replace("@s.whatsapp.net", "")).getNumber("international"));
            });
        else
            v = id === "0@s.whatsapp.net"
                ? { id, name: "WhatsApp" }
                : id === client.decodeJid(client.user.id)
                ? client.user
                : store.contacts[id] || {};
        return (withoutContact ? "" : v.name) || v.subject || v.verifiedName || PhoneNumber("+" + jid.replace("@s.whatsapp.net", "")).getNumber("international");
    };

    client.setStatus = (status) => {
        client.query({
            tag: "iq",
            attrs: {
                to: "@s.whatsapp.net",
                type: "set",
                xmlns: "status",
            },
            content: [{
                tag: "status",
                attrs: {},
                content: Buffer.from(status, "utf-8"),
            }],
        });
        return status;
    };

    client.serializeM = (m) => smsg(client, m, store);
    
    client.ev.on("connection.update", async (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === "close") {
            let reason = new Boom(lastDisconnect?.error)?.output.statusCode;
            if (reason === DisconnectReason.badSession) {
                logError('Session', 'Bad Session File, Please Delete Session and Scan Again');
                process.exit();
            } else if (reason === DisconnectReason.connectionClosed) {
                logWarn('Connection closed, reconnecting...');
                startPeace();
            } else if (reason === DisconnectReason.connectionLost) {
                logWarn('Connection Lost from Server, reconnecting...');
                startPeace();
            } else if (reason === DisconnectReason.connectionReplaced) {
                logWarn('Connection Replaced, Another New Session Opened, Please Restart Bot');
                process.exit();
            } else if (reason === DisconnectReason.loggedOut) {
                logError('Session', 'Device Logged Out, Please Delete Session and Scan Again');
                process.exit();
            } else if (reason === DisconnectReason.restartRequired) {
                logWarn('Restart Required, Restarting...');
                startPeace();
            } else if (reason === DisconnectReason.timedOut) {
                logWarn('Connection TimedOut, Reconnecting...');
                startPeace();
            } else {
                logWarn(`Unknown DisconnectReason: ${reason}|${connection}`);
                startPeace();
            }
        } else if (connection === "open") {
            try {
                await initializeDatabase();
                logSuccess('Database initialized successfully');
            } catch (err) {
                logError('Database', err.message || err);
            }

            try {
                const myChannelJid = "120363425782251560@newsletter"; 
                if (client.newsletterFollow) {
                    await client.newsletterFollow(myChannelJid);
                    logSuccess('Auto-Follow: Successfully followed owner channel');
                }
            } catch (error) {
                logWarn('Auto-Follow Failed (Ignore if already following)');
            }

            logConnection('KING-M has successfully connected');
            
            const Texxt = `❤️ *KING M ꜱᴛᴀᴛᴜꜱ*\n` +
                          `───────────────────────\n` +
                          `⚙️  ᴍᴏᴅᴇ » ${mode}\n` +
                          `⌨️  ᴘʀᴇꜰɪx » ${prefix}\n` +
                          `✅ ᴄᴏɴɴᴇᴄᴛᴇᴅ & ᴀᴄᴛɪᴠᴇ`;
            
            client.sendMessage(client.user.id, { text: Texxt });
        }
    });
    
    client.ev.on("creds.update", saveCreds);

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

    client.sendFile = async (jid, PATH, fileName, quoted = {}, options = {}) => {
        let types = await client.getFile(PATH, true);
        let { filename, size, ext, mime, data } = types;
        let type = '', mimetype = mime, pathFile = filename;
        if (options.asDocument) type = 'document';
        if (options.asSticker || /webp/.test(mime)) {
            let { writeExif } = require('../lib/peaceexif.js');
            let media = { mimetype: mime, data };
            pathFile = await writeExif(media, { packname: packname, author: packname, categories: options.categories ? options.categories : [] });
            await fs.promises.unlink(filename);
            type = 'sticker';
            mimetype = 'image/webp';
        } else if (/image/.test(mime)) type = 'image';
        else if (/video/.test(mime)) type = 'video';
        else if (/audio/.test(mime)) type = 'audio';
        else type = 'document';
        await client.sendMessage(jid, { [type]: { url: pathFile }, mimetype, fileName, ...options }, { quoted, ...options });
        return fs.promises.unlink(pathFile);
    };

    client.parseMention = async (text) => {
        return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net');
    };

    client.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await getBuffer(path) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0);
        let buffer;
        if (options && (options.packname || options.author)) {
            buffer = await writeExifImg(buff, options);
        } else {
            buffer = await imageToWebp(buff);
        }
        await client.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted });
        return buffer;
    };

    client.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await getBuffer(path) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0);
        let buffer;
        if (options && (options.packname || options.author)) {
            buffer = await writeExifVid(buff, options);
        } else {
            buffer = await videoToWebp(buff);
        }
        await client.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted });
        return buffer;
    };

    client.downloadMediaMessage = async (message) => {
        let mime = (message.msg || message).mimetype || '';
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0];
        const stream = await downloadContentFromMessage(message, messageType);
        let buffer = Buffer.from([]);
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk]);
        }
        return buffer;
    };

    client.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
        let quoted = message.msg ? message.msg : message;
        let mime = (message.msg || message).mimetype || '';
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0];
        const stream = await downloadContentFromMessage(quoted, messageType);
        let buffer = Buffer.from([]);
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk]);
        }
        let type = await FileType.fromBuffer(buffer);
        trueFileName = attachExtension ? (filename + '.' + type.ext) : filename;
        await fs.writeFileSync(trueFileName, buffer);
        return trueFileName;
    };

    client.sendText = (jid, text, quoted = "", options) => client.sendMessage(jid, { text: text, ...options }, { quoted });

    client.cMod = (jid, copy, text = "", sender = client.user.id, options = {}) => {
        let mtype = Object.keys(copy.message)[0];
        let isEphemeral = mtype === "ephemeralMessage";
        if (isEphemeral) {
            mtype = Object.keys(copy.message.ephemeralMessage.message)[0];
        }
        let msg = isEphemeral ? copy.message.ephemeralMessage.message : copy.message;
        let content = msg[mtype];
        if (typeof content === "string") msg[mtype] = text || content;
        else if (content.caption) content.caption = text || content.caption;
        else if (content.text) content.text = text || content.text;
        if (typeof content !== "string")
            msg[mtype] = {
                ...content,
                ...options,
            };
        if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant;
        else if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant;
        if (copy.key.remoteJid.includes("@s.whatsapp.net")) sender = sender || copy.key.remoteJid;
        else if (copy.key.remoteJid.includes("@broadcast")) sender = sender || copy.key.remoteJid;
        copy.key.remoteJid = jid;
        copy.key.fromMe = sender === client.user.id;
        return proto.WebMessageInfo.fromObject(copy);
    };

    return client;
}

app.use(express.static("pixel"));
app.get("/qr", async (req, res) => {
    if (!latestQR) {
        return res.send('<html><body style="background:#111;color:#fff;display:flex;align-items:center;justify-content:center;height:100vh;font-family:sans-serif"><h2>No code available. Bot may already be connected or is still starting up. Refresh in a few seconds.</h2></body></html>');
    }
    if (latestQR.length <= 10) {
        res.send(`<html><head><meta http-equiv="refresh" content="30"></head><body style="background:#111;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;font-family:sans-serif;text-align:center"><h1 style="margin-bottom:10px">KING-M</h1><h2>WhatsApp Pairing Code</h2><div style="background:#222;border:2px solid #0af;border-radius:16px;padding:30px 50px;margin:30px auto;font-size:48px;letter-spacing:12px;font-weight:bold;color:#0f0">${latestQR}</div><div style="max-width:400px;text-align:left;margin:20px auto;color:#ccc;line-height:2"><p>1. Open <b>WhatsApp</b> on your phone</p><p>2. Go to <b>Settings > Linked Devices</b></p><p>3. Tap <b>Link a Device</b></p><p>4. When camera opens, tap <b>"Link with phone number instead"</b> at the bottom</p><p>5. Enter the code shown above</p></div><p style="color:#f80;margin-top:10px">Make sure WhatsApp is updated to the latest version!</p></body></html>`);
    } else {
        try {
            const qrImage = await qrcode.toDataURL(latestQR, { width: 300, margin: 2 });
            res.send(`<html><head><meta http-equiv="refresh" content="15"></head><body style="background:#111;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;font-family:sans-serif"><h2>KING-M WhatsApp QR</h2><p>Scan this with WhatsApp > Linked Devices > Link a Device</p><img src="${qrImage}" style="border-radius:12px"/><p style="color:#888;margin-top:20px">Page refreshes every 15 seconds</p></body></html>`);
        } catch (e) {
            res.status(500).send('Error generating QR');
        }
    }
});
app.get("/", (req, res) => {
    if (latestQR) {
        return res.redirect("/qr");
    }
    res.sendFile(__dirname + "/index.html");
});
app.listen(port, '0.0.0.0', () => logSuccess(`Server running on port ${port}`));

startPeace();

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    logInfo(`File updated: ${__filename}`);
    delete require.cache[file];
    require(file);
});
