const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, getBinaryNodeChild, getBinaryNodeChildren, prepareWAMessageMedia, areJidsSameUser, getContentType } = require("@whiskeysockets/baileys");
const fs = require("fs");
const path = require('path');
const util = require("util");
const mumaker = require("mumaker");
const crypto = require('crypto');
const translatte = require('translatte');
global.axios = require('axios').default
const chalk = require("chalk");
const speed = require("performance-now");
const Genius = require("genius-lyrics");
const yts = require("yt-search");
let lastTextTime = 0;
const messageDelay = 3000;
// Add these helper functions at the top of peacemaker/peace.js
// Updated logError in peacemaker/peace.js
const logError = (command, err) => {
    // Safely extract the message or provide a fallback string
    const errorMessage = (err && err.message) ? err.message : (err || "Unknown Command/Error");
    console.log(chalk.red(`[ERROR] In ${command.toUpperCase()}: `) + chalk.white(errorMessage));
};
const ffmpeg = require("fluent-ffmpeg");
const fetch = require("node-fetch");
const { DateTime } = require('luxon');
const BASE_URL = 'https://noobs-api.top';
const uploadtoimgur = require('../lib/imgur');
const uploadToCatbox = require('../lib/catbox');
const advice = require("badadvice");
const {c, cpp, node, python, java} = require('compile-run');
const acrcloud = require("acrcloud"); 
const ytdl = require("ytdl-core");
const Client = new Genius.Client("TUoAEhL79JJyU-MpOsBDkFhJFWFH28nv6dgVgPA-9R1YRwLNP_zicdX2omG2qKE8gYLJat5F5VSBNLfdnlpfJg"); // Scrapes if no key is provided
const { downloadYouTube, downloadSoundCloud, downloadSpotify, searchYouTube, searchSoundCloud, searchSpotify } = require('../peacemaker/wee');
const { getSettings, updateSetting } = require('../Database/config');
const fetchSettings = require('../Database/fetchSettings');
const { TelegraPh, UploadFileUgu, webp2mp4File, floNime } = require('../lib/peaceupload');
const fancy = require('../lib/style');
const { Configuration, OpenAI } = require("openai");
const { menu, menulink, appname, herokuapi, botname, author, packname, mycode, admin, botAdmin, dev, group, bad, owner, NotOwner } = require("../set.js");


const { smsg, runtime, fetchUrl, isUrl, processTime, formatp, tanggal, formatDate, getTime,  sleep, generateProfilePicture, clockString, fetchJson, getBuffer, jsonformat, format, parseMention, getRandom } = require('../lib/peacefunc');
const { exec, spawn, execSync } = require("child_process");
module.exports = peace = async (client, m, chatUpdate, store) => {
  try {

const {
  wapresence,
  autoread,
  mode,
  prefix,
  antilink,
  antilinkall,
  antidelete,
  gptdm,
  badword,
  antibot,
  antitag,
        menuTitle,
        antisticker,
        autolike_emojis,
        antigroupmention
} = await fetchSettings(); 
          
    var body =
      m.mtype === "conversation"
        ? m.message.conversation
        : m.mtype == "extendedTextMessage"
        ? m.message.extendedTextMessage.text
        : m.mtype == "buttonsResponseMessage"
        ? m.message.buttonsResponseMessage.selectedButtonId
        : m.mtype == "listResponseMessage"
        ? m.message.listResponseMessage.singleSelectReply.selectedRowId
        : m.mtype == "templateButtonReplyMessage"
        ? m.message.templateButtonReplyMessage.selectedId
        : m.mtype === "messageContextInfo"
        ? m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text
        : "";
    var budy = typeof m.text == "string" ? m.text : "";
    var msgR = m.message.extendedTextMessage?.contextInfo?.quotedMessage;  
//========================================================================================================================//
const { 
  addSudoOwner, 
  removeSudoOwner, 
  getSudoOwners, 
  isSudoOwner,
  addBadword,     
  removeBadword,  
  getBadwords     
} = require('../Database/config');
//========================================================================================================================//      
    const Heroku = require("heroku-client");  
    const command = body.replace(prefix, "").trim().split(/ +/).shift().toLowerCase();
    const args = body.trim().split(/ +/).slice(1);
    const pushname = m.pushName || "No Name";
    const botNumber = await client.decodeJid(client.user.id);
    const itsMe = m.sender == botNumber ? true : false;
    let text = (q = args.join(" "));
    const arg = budy.trim().substring(budy.indexOf(" ") + 1);
    const arg1 = arg.trim().substring(arg.indexOf(" ") + 1);
    m.isBaileys = m.id.startsWith("BAE5") && m.id.length === 16;
    const from = m.chat;
    const reply = m.reply;
    const sender = m.sender;
          if (m.isGroup && m.key.id.startsWith("BAE5") && m.sender !== botNumber + "@s.whatsapp.net") {
        return; 
    }
    const mek = chatUpdate.messages[0];
          // ==================================
const ownerNumber = botNumber.replace(/[^0-9]/g, "");   
const senderNumber = sender.split("@")[0];              
const isOwner = senderNumber === ownerNumber || senderNumber === "254769995625";
const isSudo = await isSudoOwner(senderNumber);
const isPrivileged = isOwner || isSudo;
const dev = "254769995625"; 
//========================================================================================================================//      
    const getGroupAdmins = (participants) => { 
       let admins = []; 
       for (let i of participants) { 
         i.admin === "superadmin" ? admins.push(i.id) : i.admin === "admin" ? admins.push(i.id) : ""; 
       } 
       return admins || []; 
     };
//========================================================================================================================//
//========================================================================================================================//      
    const nicki = (m.quoted || m); 
    const quoted = (nicki.mtype == 'buttonsMessage') ? nicki[Object.keys(nicki)[1]] : (nicki.mtype == 'templateMessage') ? nicki.hydratedTemplate[Object.keys(nicki.hydratedTemplate)[1]] : (nicki.mtype == 'product') ? nicki[Object.keys(nicki)[0]] : m.quoted ? m.quoted : m; 

    const color = (text, color) => {
      return !color ? chalk.green(text) : chalk.keyword(color)(text);
    };
//========================================================================================================================//      
    const mime = (quoted.msg || quoted).mimetype || "";
    const qmsg = (quoted.msg || quoted);
    const cmd = body.startsWith(prefix);

//========================================================================================================================//                  
//========================================================================================================================//          
    const groupMetadata = m.isGroup ? await client.groupMetadata(m.chat).catch((e) => { }) : "";  
    const groupName = m.isGroup && groupMetadata ? await groupMetadata.subject : "";  
    const participants = m.isGroup && groupMetadata
  ? groupMetadata.participants
      .filter(p => p.pn)
      .map(p => p.pn)
  : [];
    const groupAdmin = m.isGroup&& groupMetadata
  ? groupMetadata.participants
      .filter(p => p.admin && p.pn)
      .map(p => p.pn)
  : [];
    const isBotAdmin = m.isGroup ? groupAdmin.includes(botNumber) : false; 
        const groupSender = m.isGroup && groupMetadata
  ? (() => {
      const found = groupMetadata.participants.find(p => 
        p.id === sender || client.decodeJid(p.id) === client.decodeJid(sender)
      );
      return found?.pn || sender;
    })()
  : sender;
     const isAdmin = m.isGroup ? groupAdmin.includes(groupSender) : false;
     const Owner = owner.map((v) => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net").includes(groupSender) 
     const Dev = '254769995625'.split(",");
     const date = new Date()  
     const timestamp = speed(); 
     const Rspeed = speed() - timestamp 
//========================================================================================================================//
//========================================================================================================================//
const baseDir = 'message_data';
if (!fs.existsSync(baseDir)) {
  fs.mkdirSync(baseDir);
}

function loadChatData(remoteJid, messageId) {
  const chatFilePath = path.join(baseDir, remoteJid, `${messageId}.json`);
  try {
    const data = fs.readFileSync(chatFilePath, 'utf8');
    return JSON.parse(data) || [];
  } catch (error) {
    return [];
  }
}

function saveChatData(remoteJid, messageId, chatData) {
  const chatDir = path.join(baseDir, remoteJid);

  if (!fs.existsSync(chatDir)) {
    fs.mkdirSync(chatDir, { recursive: true });
  }

  const chatFilePath = path.join(chatDir, `${messageId}.json`);

  try {
    fs.writeFileSync(chatFilePath, JSON.stringify(chatData, null, 2));
  } catch (error) {
    logError('SaveChat', error);
  }
}

function handleIncomingMessage(message) {
  const remoteJid = message.key.remoteJid;
  const messageId = message.key.id;

  const chatData = loadChatData(remoteJid, messageId);
  chatData.push(message);
  saveChatData(remoteJid, messageId, chatData);
} 
          
          // ================== ANTIDELETE FUNCTION ==================
          // ================== SIMPLE ANTIDELETE SYSTEM ==================
const messageStore = new Map();

function storeIncomingMessage(mek) {
    if (!mek?.key?.id) return;

    messageStore.set(mek.key.id, mek);  

    if (messageStore.size > 3000) {  
        const firstKey = messageStore.keys().next().value;  
        messageStore.delete(firstKey);  
    }
}

async function handleDeletedMessage(client, mek, antideleteMode) {
    try {
        if (!mek?.message?.protocolMessage?.key?.id) return;

        const deletedMsgId = mek.message.protocolMessage.key.id;  
        const originalMessage = messageStore.get(deletedMsgId);  
        if (!originalMessage) return;  

        const remoteJid = mek.key.remoteJid;  
        const botJid = client.user.id.split(":")[0] + "@s.whatsapp.net";  

        const deletedBy = mek.participant || remoteJid;  
        const sentBy = originalMessage.key.participant || originalMessage.key.remoteJid;  

        if (deletedBy === botJid || sentBy === botJid) return;  

        let targetJid;  
        // Note: Ensure 'owner' is defined in your global scope/settings
        if (antideleteMode === "private") {  
            targetJid = owner[0].replace(/[^0-9]/g, '') + "@s.whatsapp.net";  
        } else if (antideleteMode === "chat") {  
            targetJid = remoteJid;  
        } else return;  

        const deletedByTag = `@${deletedBy.split('@')[0]}`; 
        const sentByTag = `@${sentBy.split('@')[0]}`; 

        const now = new Date();  
        const deletedTime = now.toLocaleTimeString();  
        const deletedDate = now.toLocaleDateString();  

        let header = `🚨 KING M ANTIDELETE 🚨

👤 Deleted By: ${deletedByTag}
✉️ Sent By: ${sentByTag}
📅 Date: ${deletedDate}
⏰ Time: ${deletedTime}

`;

        const msg = originalMessage.message;  

        if (msg?.conversation) {  
            await client.sendMessage(targetJid, {  
                text: header + "📝 Deleted Message:\n" + msg.conversation,  
                mentions: [deletedBy, sentBy]  
            });  
        }  
        else if (msg?.extendedTextMessage?.text) {  
            await client.sendMessage(targetJid, {  
                text: header + "📝 Deleted Message:\n" + msg.extendedTextMessage.text,  
                mentions: [deletedBy, sentBy]  
            });  
        }  
        else if (msg?.imageMessage) {  
            const buffer = await client.downloadMediaMessage(originalMessage);  
            await client.sendMessage(targetJid, {  
                image: buffer,  
                caption: header + "🖼️ Deleted Image\n" + (msg.imageMessage.caption || ""),  
                mentions: [deletedBy, sentBy]  
            });  
        }  
        else if (msg?.videoMessage) {  
            const buffer = await client.downloadMediaMessage(originalMessage);  
            await client.sendMessage(targetJid, {  
                video: buffer,  
                caption: header + "🎥 Deleted Video\n" + (msg.videoMessage.caption || ""),  
                mentions: [deletedBy, sentBy]  
            });  
        }  
        else if (msg?.audioMessage) {  
            const buffer = await client.downloadMediaMessage(originalMessage);  
            await client.sendMessage(targetJid, {  
                audio: buffer,  
                mimetype: "audio/mpeg",  
                ptt: msg.audioMessage.ptt || false  
            });  

            await client.sendMessage(targetJid, {  
                text: header + "🎧 Deleted Audio",  
                mentions: [deletedBy, sentBy]  
            });  
        }  
        else if (msg?.stickerMessage) {  
            const buffer = await client.downloadMediaMessage(originalMessage);  
            await client.sendMessage(targetJid, { sticker: buffer });  

            await client.sendMessage(targetJid, {  
                text: header + "🔖 Deleted Sticker",  
                mentions: [deletedBy, sentBy]  
            });  
        }  
        else if (msg?.documentMessage) {  
            const buffer = await client.downloadMediaMessage(originalMessage);  
            const doc = msg.documentMessage;  

            await client.sendMessage(targetJid, {  
                document: buffer,  
                fileName: doc.fileName,  
                mimetype: doc.mimetype,  
                caption: header + `📄 *Deleted Document:* ${doc.fileName}`,  
                mentions: [deletedBy, sentBy]  
            });  
        }  

        messageStore.delete(deletedMsgId);  

    } catch (err) {  
        logError('AntiDelete', err);  
    }
}

client.ev.on('messages.upsert', async ({ messages }) => {
    try {
        const mek = messages[0];
        if (!mek.message) return;

        const antidelete = client.settings?.antidelete || "off";  

        if (antidelete !== "off") {  
            if (  
                mek.message?.protocolMessage &&  
                mek.message.protocolMessage.type === 0  
            ) {  
                await handleDeletedMessage(client, mek, antidelete);  
            }  
            else {  
                storeIncomingMessage(mek);  
            }  
        }  

    } catch (err) {  
        logError('Listener', err);  
    }
});
//========================================================================================================================//
//========================================================================================================================//      
    // Push Message To Console
    // This ensures budy exists before trying to check its length
let messageText = budy || ""; 
let argsLog = messageText.length > 30 ? `${messageText.substring(0, 30)}...` : messageText;

          
//========================================================================================================================//
const Grace = mek.key.remoteJid;
if (wapresence === 'online') { 
             client.sendPresenceUpdate('available', Grace);
        
} else if (wapresence === 'typing') { 
             client.sendPresenceUpdate('composing', Grace);
        
      } else if (wapresence === 'recording') { 
             client.sendPresenceUpdate('recording', Grace);
             
    } else {
             client.sendPresenceUpdate('unavailable', Grace);
    }
//========================================================================================================================//    
if (cmd && mode === 'private' && !itsMe && !isPrivileged && m.sender !== dev) {
    return;
}
//========================================================================================================================//      
//========================================================================================================================//      
if (autoread === 'on' && !m.isGroup) { 
             client.readMessages([m.key])
    }
      if (itsMe && mek.key.id.startsWith("BAE5") && mek.key.id.length === 16 && !m.isGroup) return;


// =================================================================================================================//
          // ================== ANTI-STICKER MONITOR ==================
// ================== ANTI-STICKER LOGIC ==================
// Check if antisticker is active and not 'off'
// ================== ANTI-STICKER LOGIC (ROBUST) ==================
// 1. Define what a sticker is (Checks mtype AND message content)
const isSticker = m.mtype === 'stickerMessage' || (m.message && m.message.stickerMessage);

// 2. Check if feature is ON and Sticker is detected
if (antisticker && antisticker !== 'off' && isSticker) {
    
    // 3. Permissions: Only act if Bot is Admin & User is NOT Admin/Owner
    if (!Owner && isBotAdmin && !isAdmin && m.isGroup) {
        
        const kid = m.sender;
        const userTag = `@${kid.split("@")[0]}`;

        logInfo(`[ANTI-STICKER] Sticker detected from ${kid}`);

        // ACTION: DELETE (Always delete first)
        try {
            await client.sendMessage(m.chat, {
                delete: {
                    remoteJid: m.chat,
                    fromMe: false,
                    id: m.key.id,
                    participant: kid
                }
            });
        } catch (e) {
            logError('ANTI-STICKER', 'Delete failed (Bot might not be admin)');
        }

        // ACTION: MODE SPECIFIC
        if (antisticker === 'kick') {
            await client.sendMessage(m.chat, {
                text: `🚫 *ANTI-STICKER* \n\n${userTag} removed.`,
                mentions: [kid]
            });
            await client.groupParticipantsUpdate(m.chat, [kid], 'remove');
        
        } else if (antisticker === 'warn') {
            await client.sendMessage(m.chat, {
                text: `⚠️ *WARNING* \n\n${userTag}, stickers are prohibited!`,
                mentions: [kid]
            });
        }
        // If mode is 'delete', we do nothing else (sticker is already deleted above)
    }
}
// ================== STATUS MONITORING (Anti-Group & Anti-Status Mention) ==================
// ================== ANTI-GROUP MENTION MONITOR ==================
// This detects when someone mentions the group in their status
// ================== ANTI-GROUP MENTION MONITOR ==================
// This runs on every message to catch status mentions
(async () => {
    try {
        if (!m.isGroup) return;

        const isStatusMention = m.message?.groupStatusMentionMessage || 
            (m.message?.extendedTextMessage?.contextInfo && 
             !m.message.extendedTextMessage.contextInfo.isForwarded && 
             m.message?.extendedTextMessage?.text?.includes(m.chat.split('@')[0]));

        if (isStatusMention) {
            const { getSettings } = require('../Database/config');
            const settings = await getSettings();
            
            const groupKey = `antigm-${m.chat}`;
            const action = settings[groupKey];

            if (action && action !== 'off') {
                
                const gmData = await client.groupMetadata(m.chat);
                const gmParticipants = gmData.participants;
                const decodedSender = client.decodeJid(m.sender);
                const senderIsAdmin = gmParticipants.find(p => client.decodeJid(p.id) === decodedSender)?.admin;

                if (!senderIsAdmin) {
                    const decodedBot = client.decodeJid(client.user.id);
                    const botIsAdmin = gmParticipants.find(p => client.decodeJid(p.id) === decodedBot)?.admin;

                    if ((action === 'delete' || action === 'kick') && botIsAdmin) {
                        await client.sendMessage(m.chat, { delete: m.key });
                        await client.sendMessage(m.chat, { 
                            text: `⚠️ @${decodedSender.split('@')[0]}, do not mention this group in your status!`, 
                            mentions: [decodedSender] 
                        });
                        logInfo(`[ANTI-GM] Deleted status mention from ${decodedSender}`);
                    }

                    if (action === 'kick' && botIsAdmin) {
                        await client.groupParticipantsUpdate(m.chat, [decodedSender], 'remove');
                        await client.sendMessage(m.chat, { 
                            text: `🚫 @${decodedSender.split('@')[0]} has been removed for mentioning the group in status.`, 
                            mentions: [decodedSender] 
                        });
                        logInfo(`[ANTI-GM] Kicked ${decodedSender} for status mention`);
                    }
                }
            }
        }
    } catch (e) {
        logError('Anti-GM', e);
    }
})();
// ================================================================
// ================================================================
 // Corrected sendContact function using available client methods
client.sendContact = async (chatId, numbers, text = '', options = {}) => {
  try {
    const contacts = numbers.map(number => ({
      displayName: 'MAKAMESCO',
      vcard: `BEGIN:VCARD\nVERSION:3.0\nN:ᴘᴇᴀᴄᴇᴍᴀᴋᴇʀ\nFN:ᴘᴇᴀᴄᴇᴍᴀᴋᴇʀ\nitem1.TEL;waid=${number}:${number}\nitem1.X-ABLabel:Number\nitem2.EMAIL;type=INTERNET:makamescodigitalsolutions@gmail.com\nitem2.X-ABLabel:Email\nitem3.URL:https://instagram.com/peacemaker_hunter72\nitem3.X-ABLabel:Instagram\nitem4.ADR:;;Kenya;;\nitem4.X-ABLabel:Region\nEND:VCARD`
    }));

    await client.sendMessage(chatId, {
      contacts: {
        displayName: 'MAKAMESCCO',
        contacts: contacts
      },
      ...options
    }, {
      quoted: text
    });
  } catch (error) {
    logError('SendContact', error);
    throw error;
  }
};

// Anti-bot removal function
if (
  antibot === "on" &&
  mek.key?.id?.startsWith("BAE5") && // check ID safely
  m.isGroup &&
  !isAdmin &&
  isBotAdmin &&
  mek.key?.id === "3OBHvGl"
) {
  (async () => {
    try {
      const kid = m.sender;
      await client.sendMessage(m.chat, {
        text: `king m anti-spam!\n\n@${kid.split('@')[0]} has been identified as a bot and removed to prevent unnecessary spam!`,
        contextInfo: { mentionedJid: [kid] }
      }, { quoted: m });

      await client.groupParticipantsUpdate(m.chat, [kid], "remove");
    } catch (error) {
      logError('AntiBot', error);
    }
  })();
}

//========================================================================================================================//
//========================================================================================================================//      
if (budy.startsWith('>')) { 
   if (!Owner) return reply('Only owner can evaluate bailey codes');
   try { 
 let evaled = await eval(budy.slice(2)); 
 if (typeof evaled !== 'string') evaled = require('util').inspect(evaled); 
 await reply(evaled); 
   } catch (err) { 
 await reply(String(err)); 
   } 
 } 
//========================================================================================================================// 
async function mp3d () {        
let { key } = await client.sendMessage(m.chat, {audio: fs.readFileSync('./Media/menu.mp3'), mimetype:'audio/mp4', ptt: true}, {quoted: m })

}
//========================================================================================================================//
      const ram = () => {
const ramp = [ "■□□□□□ 10%", "■■□□□□ 20%", "■■■□□□ 40%", "■■■■□□ 60%", "■■■■■□ 80%", "■■■■■■ 95%" ];
const ramm = ramp[Math.floor(Math.random() * ramp.length)];      
return (ramm)  
}  
//========================================================================================================================//   
const totalcmds = () => {
   var mytext = fs.readFileSync("./peacemaker/peace.js").toString();
    var numUpper = (mytext.match(/case ['"]/g) || []).length;
    return numUpper;
}         
//========================================================================================================================// 
    if (gptdm === 'on' && m.chat.endsWith("@s.whatsapp.net")) {
if (itsMe) return;
            
try {
        const currentTime = Date.now();
          if (currentTime - lastTextTime < messageDelay) {
            logWarn('Message skipped: Too many messages in a short time.');
            return;
          }
        
  const { default: Gemini } = await import('gemini-ai');
  const gemini = new Gemini("AIzaSyDJUtskTG-MvQdlT4tNE319zBqLMFei8nQ");
  const chat = gemini.createChat();

      const res = await chat.ask(text);

        await m.reply(res);

lastTextTime = currentTime;
        
    } catch (e) {
        m.reply("I am unable to generate text\n\n" + e);
    }
}
//========================================================================================================================//
if (antitag === 'on' && !Owner && isBotAdmin && !isAdmin && m.mentionedJid && m.mentionedJid.length > 10) {
        if (itsMe) return;

        const cate = m.sender;

        await client.sendMessage(m.chat, {
            text: `@${cate.split("@")[0]}, Antitag is Active🔨`,
            contextInfo: { mentionedJid: [cate] }
        }, { quoted: m });

        await client.sendMessage(m.chat, {
            delete: {
                remoteJid: m.chat,
                fromMe: false,
                id: m.key.id,
                participant: cate            }
        });
        await client.groupParticipantsUpdate(m.chat, [cate], "remove");
    }
//========================================================================================================================//
//========================================================================================================================//      
function formatSpeed(ms) {
    const styles = [
        `${ms.toFixed(2)}ms`,
        `${Math.round(ms)}ms`,
        `${(ms / 1000).toFixed(3)}s`
    ];
    return styles[Math.floor(Math.random() * styles.length)];
}
//========================================================================================================================//      
          const getGreeting = () => {
            const currentHour = DateTime.now().setZone('Africa/Nairobi').hour;

            if (currentHour >= 5 && currentHour < 12) {
                return 'ɢᴏᴏᴅ ᴍᴏʀɴɪɴɢ 🌅';
            } else if (currentHour >= 12 && currentHour < 16) {
                return 'ɢᴏᴏᴅ ᴀғᴛᴇʀɴᴏᴏɴ ☀️';
            } else if (currentHour >= 16 && currentHour < 20) {
                return 'ɢᴏᴏᴅ ᴇᴠᴇɴɪɴɢ 🌇';
            } else {
                return 'ɢᴏᴏᴅ ɴɪɢʜᴛ 😴';
            }
        };
//========================================================================================================================//
//========================================================================================================================//
        const getCurrentTimeInNairobi = () => {
            return DateTime.now().setZone('Africa/Nairobi').toLocaleString(DateTime.TIME_SIMPLE);
        };
//========================================================================================================================//    
const badwords = await getBadwords();
if (
  badword === 'on' &&
  isBotAdmin &&
  !isAdmin &&
  body &&
  (new RegExp(`\\b(${badwords.join('|')})\\b`, 'i')).test(body.toLowerCase())
) {
  reply("⚠️ Bad word detected! You will be removed.");
  client.groupParticipantsUpdate(from, [sender], 'remove');
}
//========================================================================================================================//      
if (antilink === 'on' && body.includes('chat.whatsapp.com') && !Owner && isBotAdmin && !isAdmin && m.isGroup) { 
    kid = m.sender; 
    
    client.sendMessage(m.chat, { 
        delete: { 
            remoteJid: m.chat, 
            fromMe: false, 
            id: m.key.id, 
            participant: kid 
        } 
    }).then(() => {
        client.groupParticipantsUpdate(m.chat, [kid], 'remove');
        
        client.sendMessage(m.chat, {
            text: `⚠️ *KING M WARNING:*\n@${kid.split("@")[0]}, WhatsApp links not allowed here.\nRemoved from group.`,
            mentions: [kid]
        }, { quoted: m });
    });
}

//========================================================================================================================//

if (antilinkall === 'on' && body.includes('https://') && !Owner && isBotAdmin && !isAdmin && m.isGroup) { 
    ki = m.sender; 
    
    client.sendMessage(m.chat, { 
        delete: { 
            remoteJid: m.chat, 
            fromMe: false, 
            id: m.key.id, 
            participant: ki
        } 
    }).then(() => {
        client.groupParticipantsUpdate(m.chat, [ki], 'remove');
        
        client.sendMessage(m.chat, {
            text: `⚠️ *KING M WARNING:*\n@${ki.split("@")[0]}, external links prohibited.\nRemoved from group.`,
            mentions: [ki]
        }, { quoted: m });
    });
}
  //========================================================================================================================//
  //========================================================================================================================//
    //========================================================================================================================//
// ✅ CLEAN TERMINAL LOGGING ADAPTATION (BOXED FORMAT)
//========================================================================================================================//

    if (cmd && !m.isGroup) {
      console.log(chalk.black(chalk.bgWhite("[ KING-M ]")), color(argsLog, "turquoise"), chalk.magenta("From"), chalk.green(pushname), chalk.yellow(`[ ${m.sender.replace("@s.whatsapp.net", "")} ]`));
    } else if (cmd && m.isGroup) {
      console.log(
        chalk.black(chalk.bgWhite("[ LOGS ]")),
        color(argsLog, "turquoise"),
        chalk.magenta("From"),
        chalk.green(pushname),
        chalk.yellow(`[ ${m.sender.replace("@s.whatsapp.net", "")} ]`),
        chalk.blueBright("IN"),
        chalk.green(groupName)
      );
    }
//========================================================================================================================//

//========================================================================================================================//
//========================================================================================================================//      
    
  
  if (cmd) {
    switch (command) {
        case "menu":
            
            client.sendMessage(m.chat, {
                audio: fs.readFileSync('./Media/menu.mp3'),
                mimetype: 'audio/mpeg',
                ptt: false
            }, {
                quoted: m
            });
            
                
let cap = `
┏▣ █▓▒░ *${menuTitle}* ░▒▓█
┃ 👑 *Dev* : MAKAMESCO
┃ 🕹️ *Prefix* : [ ${prefix} ]
┃ 🔐 *Mode* : ${mode}
┃ 📡 *Server* : ${process.env.RENDER ? 'Render' : process.env.HEROKU_APP_NAME ? 'Heroku' : process.env.HOME === '/home/container' ? 'Panel' : 'Local'}
┃ ⚡ *Speed* : ${Rspeed.toFixed(4)} ms
┃ 🕰️ *Time* : ${getCurrentTimeInNairobi()}
┃ 💾 *RAM* : ${ram()}
┃ 📊 *Cmds* : ${totalcmds()}
┗▣

┏▣ 🛡️ *SETTINGS PANEL* 🛡️
│ ⬡ antidelete
│ ⬡ antiedit
│ ⬡ anticall
│ ⬡ antibot
│ ⬡ badword
│ ⬡ antitag
│ ⬡ antilink
│ ⬡ antilinkall
│ ⬡ gptdm
│ ⬡ autoview
│ ⬡ autolike
│ ⬡ autoread
│ ⬡ autotyping
│ ⬡ autorecording
│ ⬡ alwaysonline
│ ⬡ autobio
│ ⬡ setautobio  <text>
│ ⬡ mode
│ ⬡ prefix
│ ⬡ welcomegoodbye
│ ⬡ wapresence
│ ⬡ setbotname
│ ⬡ antisticker
│ ⬡ setreactemojie
┗▣

┏▣ 👑 *OWNER ACCESS* 👑
│ 💠 restart
│ 💠 admin
│ 💠 cast
│ 💠 broadcast
│ 💠 join
│ 💠 getvar
│ 💠 getcase
│ 💠 redeploy
│ 💠 update
│ 💠 setvar
│ 💠 botpp
│ 💠 fullpp
│ 💠 block
│ 💠 unblock
│ 💠 save
│ 💠 blocklist
│ 💠 addsudo
│ 💠 remsudo
│ 💠 listsudo
┗▣

┏▣ 📥 *DOWNLOAD SUITE* 📥
│ ⚡ video
│ ⚡ video2
│ ⚡ play
│ ⚡ play2
│ ⚡ song
│ ⚡ song2
│ ⚡ fbdl
│ ⚡ tiktok
│ ⚡ twitter
│ ⚡ instagram
│ ⚡ pinterest
│ ⚡ movie
│ ⚡ lyrics
│ ⚡ whatsong
│ ⚡ yts
│ ⚡ ytmp3
│ ⚡ ytmp4
┗▣

┏▣ 🧩 *CONVERTER HUB* 🧩
│ ⬡ fancy
│ ⬡ sticker
│ ⬡ smeme
│ ⬡ photo
│ ⬡ mp4
│ ⬡ retrieve
│ ⬡ vv
│ ⬡ vv2
│ ⬡ screenshot
│ ⬡ mix
│ ⬡ take
│ ⬡ tweet
│ ⬡ quotely
┗▣

┏▣ ⚽ *FOOTBALL ZONE* ⚽
│ ⚽ epl
│ ⚽ laliga
│ ⚽ serie-a
│ ⚽ bundesliga
│ ⚽ ligue-1
│ ⚽ fixtures
┗▣

┏▣ 🤖 *ARTIFICIAL INTEL* 🤖
│ 🧠 ai
│ 🧠 ai2
│ 🧠 vision
│ 🧠 define
│ 🧠 king
│ 🧠 gemini
│ 🧠 google
│ 🧠 gpt
│ 🧠 gpt2
│ 🧠 gpt3
│ 🧠 gpt4
┗▣

┏▣ 👥 *GROUP MANAGER* 👥
│ ⬡ approve
│ ⬡ gstatus
│ ⬡ reject
│ ⬡ promote
│ ⬡ demote
│ ⬡ delete
│ ⬡ remove
│ ⬡ faker
│ ⬡ foreigners
│ ⬡ close
│ ⬡ open
│ ⬡ closetime
│ ⬡ opentime
│ ⬡ disp-off
│ ⬡ disp-1
│ ⬡ disp-7
│ ⬡ disp-90
│ ⬡ icon
│ ⬡ gcprofile
│ ⬡ subject
│ ⬡ desc
│ ⬡ leave
│ ⬡ add
│ ⬡ tagall
│ ⬡ hidetag
│ ⬡ revoke
│ ⬡ mute
│ ⬡ unmute
│ ⬡ kickall
│ ⬡ kickall2
│ ⬡ addbadword
│ ⬡ delbadword
│ ⬡ listbadword
┗▣

┏▣ 💻 *CODE STUDIO* 💻
│ 👨‍💻 carbon
│ 👨‍💻 compile-c
│ 👨‍💻 compile-c++
│ 👨‍💻 compile-js
│ 👨‍💻 compile-py
│ 👨‍💻 inspect
│ 👨‍💻 encrypte
│ 👨‍💻 eval
┗▣

┏▣ 🌍 *SYSTEM COMMANDS* 🌍
│ ⬡ owner
│ ⬡ script
│ ⬡ menu
│ ⬡ list
│ ⬡ ping
│ ⬡ poll
│ ⬡ alive
│ ⬡ speed
│ ⬡ repo
│ ⬡ runtime
│ ⬡ uptime
│ ⬡ dp
│ ⬡ dlt
│ ⬡ mail
│ ⬡ inbox
┗▣

┏▣ 🎨 *DESIGN & LOGO* 🎨
│ 🖌️ hacker
│ 🖌️ hacker2
│ 🖌️ graffiti
│ 🖌️ cat
│ 🖌️ sand
│ 🖌️ gold
│ 🖌️ arena
│ 🖌️ dragonball
│ 🖌️ naruto
│ 🖌️ child
│ 🖌️ leaves
│ 🖌️ 1917
│ 🖌️ typography
┗▣

┏▣ ✒️ *TEXT STYLES* ✒️
│ 🅰️ purple
│ 🅰️ neon
│ 🅰️ noel
│ 🅰️ metallic
│ 🅰️ devil
│ 🅰️ impressive
│ 🅰️ snow
│ 🅰️ water
│ 🅰️ thunder
│ 🅰️ ice
│ 🅰️ matrix
│ 🅰️ silver
│ 🅰️ light
┗▣

┏▣ 🧰 *TOOLKIT* 🧰
│ 🛠️ weather
│ 🛠️ github
│ 🛠️ gitclone
│ 🛠️ removebg
│ 🛠️ remini
│ 🛠️ tts
│ 🛠️ trt
│ 🛠️ calc
┗▣

┏▣ 🎲 *FUN & GAMES* 🎲
│ 🎭 fact
│ 🎭 funfact
│ 🎭 catfact
│ 🎭 advice
│ 🎭 joke
│ 🎭 news
│ 🎭 rship
│ 🎭 gpass
│ 🎭 anime
│ 🎭 animegirl
│ 🎭 quotes
│ 🎭 pickupline
┗▣

┏▣ 📦 *EXTRAS* 📦
│ ✦ bible
│ ✦ quran
│ ✦ pair
│ ✦ credits
│ ✦ upload
│ ✦ attp
│ ✦ url
│ ✦ image
│ ✦ system
┗▣
━━━━━━━━━━━━━━━━━━
   © 2025 ᴍᴀᴋᴀᴍᴇꜱᴄᴏ ɪɴᴄ
━━━━━━━━━━━━━━━━━━`;
            client.sendMessage(from, { text: cap }, { quoted: m });
            break;
                      
//========================================================================================================================//
                        // ================== CUSTOM STATUS REACTION COMMAND ==================
// ================== CUSTOM STATUS REACTION COMMAND (ERROR FIXED) ==================
case 'setreact':
case 'setreactemoji': 
case 'reactset': {
    try {
        // 1. FIX: Manually check Owner permissions inside the command
        // This fixes "isCreator is not defined" because we define it right here.
        const { owner } = require('../set'); // Load owner list from set.js
        const senderNum = m.sender.split('@')[0];
        const botNum = client.user.id.split(':')[0];
        
        // true if sender is in owner list OR sender is the bot itself
        const isOwner = owner.includes(senderNum) || senderNum === botNum;

        if (!isOwner) return reply("❌ Only the Bot Owner can use this command.");

        // 2. Load Database
        const { updateSetting } = require('../Database/config');

        // 3. Validation
        if (!text) {
            return reply(`⚠️ *Please provide emojis!*\n\n*Usage:*\n${prefix}setreact 🔥,❤️,👍\n${prefix}setreact default (to reset)`);
        }

        // 4. Handle Reset
        if (text.toLowerCase() === 'default') {
            await updateSetting('autolike_emojis', 'default');
            return reply("✅ *Status Reactions Reset!* I will use the default safe list.");
        }

        // 5. Save Custom Emojis
        const rawEmojis = text.replace(/\s/g, ''); // Remove spaces
        await updateSetting('autolike_emojis', rawEmojis);
        
        reply(`✅ *Custom Reactions Set!*\n\nI will now use these for status updates:\n${rawEmojis}`);

    } catch (e) {
        logError('SetReact ', e);
        reply("❌ Error: " + e.message);
    }
}
break;
                        // ================== VICTOR BINGWA SOKONI (AUTO-BUY) ==================
case 'buy':
case 'buydata':
case 'offers': {
    // 1. DEFINE THE OFFERS CATALOG (From your website)
    const offers = {
        // DATA OFFERS
        '55':  { type: 'data',    desc: '1.25GB (Midnight)' },
        '50':  { type: 'data',    desc: '1.5GB (3 hours)' },
        '250': { type: 'data',    desc: '1.2GB (30 days)' },
        '49':  { type: 'data',    desc: '350MB (1 week)' },
        '19':  { type: 'data',    desc: '1GB (1 hour)' },
        '20':  { type: 'data',    desc: '250MB (24 hours)' },
        '99':  { type: 'data',    desc: '1GB (24 hours)' },
        '110': { type: 'data',    desc: '2GB (24 hours)' },
        // MINUTES OFFERS
        '22':  { type: 'minutes', desc: '45 mins (3 hours)' },
        '51':  { type: 'minutes', desc: '50 mins (Midnight)' },
        // SMS OFFERS
        '10':  { type: 'sms',     desc: '200 SMS (24h)' },
        '5':   { type: 'sms',     desc: '20 SMS (1 day)' },
        '101': { type: 'sms',     desc: '1500 SMS (1 month)' },
        '201': { type: 'sms',     desc: '3500 SMS (1 month)' },
        '30':  { type: 'sms',     desc: '1000 SMS (7 days)' }
    };

    // 2. HELP MENU (If no arguments)
    if (!text) {
        let menu = `🛒 *VICTOR BINGWA SOKONI*\n_Premium Data, Minutes & SMS_\n\n`;
        
        menu += `*📡 DATA BUNDLES*\n`;
        menu += `▪️ 1.25GB (Midnight) - *55/=* (Cmd: ${prefix}buy 55)\n`;
        menu += `▪️ 1.5GB (3 hours) - *50/=* (Cmd: ${prefix}buy 50)\n`;
        menu += `▪️ 1GB (1 hour) - *19/=* (Cmd: ${prefix}buy 19)\n`;
        menu += `▪️ 250MB (24h) - *20/=* (Cmd: ${prefix}buy 20)\n`;
        menu += `▪️ 1GB (24h) - *99/=* (Cmd: ${prefix}buy 99)\n`;
        menu += `▪️ 2GB (24h) - *110/=* (Cmd: ${prefix}buy 110)\n`;
        menu += `▪️ 350MB (7 days) - *49/=* (Cmd: ${prefix}buy 49)\n`;
        menu += `▪️ 1.2GB (30 days) - *250/=* (Cmd: ${prefix}buy 250)\n\n`;

        menu += `*📞 MINUTES*\n`;
        menu += `▪️ 45 Mins (3hrs) - *22/=* (Cmd: ${prefix}buy 22)\n`;
        menu += `▪️ 50 Mins (Midnight) - *51/=* (Cmd: ${prefix}buy 51)\n\n`;

        menu += `*💬 SMS BUNDLES*\n`;
        menu += `▪️ 20 SMS (1 Day) - *5/=* (Cmd: ${prefix}buy 5)\n`;
        menu += `▪️ 200 SMS (24h) - *10/=* (Cmd: ${prefix}buy 10)\n`;
        menu += `▪️ 1000 SMS (7 Days) - *30/=* (Cmd: ${prefix}buy 30)\n`;
        menu += `▪️ 1500 SMS (Month) - *101/=* (Cmd: ${prefix}buy 101)\n`;
        menu += `▪️ 3500 SMS (Month) - *201/=* (Cmd: ${prefix}buy 201)\n\n`;

        menu += `_Reply with ${prefix}buy <amount> <phone> to purchase._`;
        return client.sendMessage(m.chat, { 
            image: { url: "https://files.catbox.moe/k86775.jpg" }, // Add a logo URL here if you want
            caption: menu 
        }, { quoted: m });
    }

    try {
        // 3. PARSE INPUT (.buy 50 0712345678)
        let argsList = text.split(" ");
        let amount = argsList[0];
        let phoneInput = argsList[1];

        // 4. FIND THE OFFER
        const selectedOffer = offers[amount];

        if (!selectedOffer) {
            return reply(`❌ *Invalid Amount!*\nWe don't have an offer for Ksh ${amount}.\nType *${prefix}offers* to see the price list.`);
        }

        // 5. VALIDATE PHONE NUMBER
        if (!phoneInput) {
            return reply(`⚠️ Please provide a phone number!\nUsage: *${prefix}buy ${amount} 0712345678*`);
        }

        // Format to 254...
        let phone = phoneInput.replace(/[^0-9]/g, '');
        if (phone.startsWith('0')) phone = '254' + phone.substring(1);
        if (phone.startsWith('7') || phone.startsWith('1')) phone = '254' + phone;

        if (!phone.startsWith('254') || phone.length !== 12) {
            return reply("❌ Invalid Phone Number. Please use format: 0712345678");
        }

        // 6. SEND REQUEST TO YOUR API
        await client.sendMessage(m.chat, { react: { text: '🔄', key: m.key } });
        
        const apiPayload = {
            phoneNumber: phone,
            amount: amount,
            description: selectedOffer.desc,
            type: selectedOffer.type
        };

        const { data } = await axios.post("https://mpesa-stk.giftedtech.co.ke/api/payVictorN.php", apiPayload);

        // 7. HANDLE RESPONSE
        if (data && data.success) {
            await client.sendMessage(m.chat, { 
                text: `✅ *STK PUSH SENT!*\n\n` +
                      `📦 *Offer:* ${selectedOffer.desc}\n` +
                      `💰 *Price:* Ksh ${amount}\n` +
                      `📱 *Phone:* ${phone}\n\n` +
                      `_Please check your phone and enter your M-Pesa PIN to complete the purchase._`
            }, { quoted: m });
            
            await client.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

            // (Optional) Poll for status here if you want, but strictly not necessary for the user to just buy.

        } else {
            reply(`❌ *Transaction Failed*\nReason: ${data.error || "Unknown Error from Server"}`);
        }

    } catch (e) {
        logError('Bingwa Sokoni ', e);
        reply("❌ *System Error*\nCould not connect to the payment server. Try again later.");
    }
}
break;
                        // ================== ENHANCED ANTI-STICKER SETTING ==================
case "antisticker": {
    if (!Owner) throw NotOwner;
    const settings = await getSettings();
    const current = settings.antisticker;

    // If no argument is provided, show current status and usage
    if (!text) {
        return reply(`🚫 *Anti-Sticker Settings*\n\n` +
                     `Current Mode: *${current.toUpperCase()}*\n` +
                     `Usage:\n` +
                     `▪️ ${prefix}antisticker off (Disable)\n` +
                     `▪️ ${prefix}antisticker delete (Delete sticker only)\n` +
                     `▪️ ${prefix}antisticker warn (Delete + Warn user)\n` +
                     `▪️ ${prefix}antisticker kick (Delete + Kick user)`);
    }

    const validModes = ["off", "delete", "warn", "kick"];
    const newMode = text.toLowerCase();

    if (!validModes.includes(newMode)) {
        return reply("❌ Invalid mode. Please use: off, delete, warn, or kick.");
    }

    await updateSetting("antisticker", newMode);
    reply(`✅ Anti-Sticker mode set to *${newMode.toUpperCase()}*`);
}
break;
                        // ================== SET CUSTOM AUTOBIO ==================
case 'setbio':
case 'setautobio': {
    if (!Owner) throw NotOwner;
    
    if (!text) return reply(`⚠️ *Current Bio Settings:*\n\nUsage: ${prefix}setbio <Your Custom Text>\n\n*Note:* Time and Date are added automatically at the start.`);

    // Update the setting in database
    // Ensure your updateSetting function can handle new keys dynamically
    await updateSetting("autobioText", text);
    
    reply(`✅ *Autobio Updated!*\n\nNew preview:\n📅 [DATE] ⏰ [DAY]. ${text}`);
}
break;
                        //========================================================================================================================//
        case 'fancy':
        case 'font':
            try {
                // Check if user provided arguments
                // We use 'args' which you defined at the top of your file
                let id = args[0];
                let textToChange = args.slice(1).join(" ");

                if (!id) {
                    // No arguments provided? Show the list of styles
                    const readMore = String.fromCharCode(8206).repeat(4001);
                    let demoText = "King-M"; 
                    
                    let menu = `🎨 *KING-M FANCY FONTS* 🎨\n\n` +
                               `Usage: *${prefix}fancy [ID] [TEXT]*\n` +
                               `Example: *${prefix}fancy 10 King-M*\n` +
                               readMore + "\n" +
                               fancy.list(demoText, fancy);
                    
                    // Using client.sendMessage to be safe
                    await client.sendMessage(m.chat, { text: menu }, { quoted: m });
                    break;
                }

                // Check if the first argument is actually a number
                if (isNaN(id)) {
                    return reply(`❌ *Invalid Format!*\n\nPlease provide a Style ID number first.\nExample: *${prefix}fancy 15 Hello World*`);
                }

                // Check if text exists
                if (!textToChange) {
                    return reply(`❌ *Missing Text!*\n\nPlease provide the text you want to convert.\nExample: *${prefix}fancy ${id} I love King-M*`);
                }

                // Calculate the array index (User types 1, we access index 0)
                let selectedStyleIndex = parseInt(id) - 1;
                let selectedStyle = fancy[selectedStyleIndex];

                // Apply the style
                if (selectedStyle) {
                    let result = fancy.apply(selectedStyle, textToChange);
                    await client.sendMessage(m.chat, { text: result }, { quoted: m });
                } else {
                    await reply(`❌ *Style Not Found!*\n\nPlease choose a number from the list (Type ${prefix}fancy to see list).`);
                }

            } catch (error) {
                console.error(error);
                reply('❌ An error occurred while generating fancy text. Check logs.');
            }
            break;
//========================================================================================================================//
                        
                        // ================== SET BOT NAME (MENU TITLE) ==================
case 'setbotname': 
case 'setmenutitle': {
    if (!Owner) throw NotOwner;

    if (!text) return reply(`⚠️ *Current Name:* ${menuTitle}\n\nUsage: ${prefix}setbotname <New Name>\nExample: ${prefix}setbotname SUPER BOT V1`);

    await updateSetting("menuTitle", text);
    reply(`✅ Bot menu title has been changed to:\n*${text}*`);
}
break;
//========================================================================================================================//

case "antilink": {
        if(!Owner) throw NotOwner;
  const settings = await getSettings();
  const current = settings.antilink;
  if (!text) return reply(`🛡️ Antilink is currently *${current.toUpperCase()}*`);
  if (!["on", "off"].includes(text)) return reply("Usage: antilink on/off");
  if (text === current) return reply(`✅ Antilink is already *${text.toUpperCase()}*`);
  await updateSetting("antilink", text);
  reply(`✅ Antilink has been turned *${text.toUpperCase()}*`);
}
break;

case "antilinkall": {
        if(!Owner) throw NotOwner;
  const settings = await getSettings();
  const current = settings.antilinkall;
  if (!text) return reply(`🛡️ Antilinkall is currently *${current.toUpperCase()}*`);
  if (!["on", "off"].includes(text)) return reply("Usage: antilinkall on/off");
  if (text === current) return reply(`✅ Antilinkall is already *${text.toUpperCase()}*`);
  await updateSetting("antilinkall", text);
  reply(`✅ Antilinkall has been turned *${text.toUpperCase()}*`);
}
break;             //Status mention
// ================== ANTI-GROUP MENTION COMMAND ==================
// ================== ANTI-GROUP MENTION (DB INTEGRATED) ==================
// ================== ANTI-GROUP MENTION COMMAND ==================
case 'antigm':
case 'antigroupmention':
case 'agm': {
    // 1. Require Database
    const { updateSetting, getSettings } = require('../Database/config');

    // 2. Permissions
    if (!m.isGroup) return reply("❌ This command is for groups only.");
    if (!isAdmin) return reply("❌ Only Admins can use this command.");
    if (!isBotAdmin) return reply("❌ I need to be Admin to delete/kick!");

    // 3. Parse Input
    const args = text ? text.split(" ") : [];
    const subCmd = args[0] ? args[0].toLowerCase() : 'help';
    const groupKey = `antigm-${m.chat}`; // Unique key for this group

    // 4. Handle Options
    if (subCmd === 'on' || subCmd === 'enable' || subCmd === 'delete') {
        await updateSetting(groupKey, 'delete');
        reply(`✅ *Anti-Group Mention Enabled!*\n\nMode: *Delete*\nI will delete messages if someone tags this group in their status.`);
        
    } else if (subCmd === 'kick') {
        await updateSetting(groupKey, 'kick');
        reply(`✅ *Anti-Group Mention Enabled!*\n\nMode: *Kick*\nI will REMOVE anyone who tags this group in their status.`);

    } else if (subCmd === 'off' || subCmd === 'disable') {
        await updateSetting(groupKey, 'off');
        reply(`❌ *Anti-Group Mention Disabled.*`);

    } else {
        // Status Check
        const settings = await getSettings();
        const currentAction = settings[groupKey] || 'off';
        
        reply(`🛡️ *ANTI-GROUP MENTION*\n\n` +
              `*Current Status:* ${currentAction.toUpperCase()}\n\n` +
              `*Usage:*\n` +
              `▪️ *${prefix}agm on* (Deletes status updates)\n` +
              `▪️ *${prefix}agm kick* (Kicks the user)\n` +
              `▪️ *${prefix}agm off* (Disables feature)`);
    }
}
break;
                        //togstatus
                // ================== GROUP STATUS (GS) ==================
// ================== GROUP STATUS (GS) - REBUILT ==================
// ================== GROUP STATUS (GS) - UPDATED ==================
case 'togroupstatus':
                        case 'gstatus':
case 'groupstatus':
case 'togcstatus':
case 'gs': {
    if (!m.isGroup) return reply("❌ This command is for groups only.");
    if (!Owner) return reply("❌ This command is restricted to the Bot Owner.");

    if (!text && !m.quoted) {
        return reply(
            `📌 *Usage:*\n` +
            `• ${prefix}gs <text>\n` +
            `• Reply to media with ${prefix}gs <caption>`
        );
    }

    let tempFilePath = null;
    const tempDir = path.join(__dirname, '../tmp');
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

    await client.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });

    try {
        let payload = { groupStatusMessage: {} };
        const successMessage = `✅ *Status Posted Successfully!*`;

        if (m.quoted) {
            const mime = (m.quoted.msg || m.quoted).mimetype || "";
            const q = text || ""; 

            if (/image/.test(mime)) {
                const buffer = await client.downloadMediaMessage(m.quoted);
                tempFilePath = path.join(tempDir, `status_${Date.now()}.jpg`);
                fs.writeFileSync(tempFilePath, buffer);
                payload.groupStatusMessage.image = { url: tempFilePath };
                payload.groupStatusMessage.caption = q || m.quoted.caption || "";

            } else if (/video/.test(mime)) {
                const buffer = await client.downloadMediaMessage(m.quoted);
                tempFilePath = path.join(tempDir, `status_${Date.now()}.mp4`);
                fs.writeFileSync(tempFilePath, buffer);
                payload.groupStatusMessage.video = { url: tempFilePath };
                payload.groupStatusMessage.caption = q || m.quoted.caption || "";

            } else if (/audio/.test(mime)) {
                const buffer = await client.downloadMediaMessage(m.quoted);
                tempFilePath = path.join(tempDir, `status_${Date.now()}.mp3`);
                fs.writeFileSync(tempFilePath, buffer);
                payload.groupStatusMessage.audio = { url: tempFilePath };

            } else if (/webp/.test(mime)) {
                const buffer = await client.downloadMediaMessage(m.quoted);
                tempFilePath = path.join(tempDir, `status_${Date.now()}.webp`);
                fs.writeFileSync(tempFilePath, buffer);
                payload.groupStatusMessage.sticker = { url: tempFilePath };

            } else if (m.quoted.text || m.quoted.conversation) {
                payload.groupStatusMessage.text = m.quoted.text || m.quoted.conversation;
            }
        } else {
            payload.groupStatusMessage.text = text;
        }

        // Send the status update
        await client.sendMessage(m.chat, payload, { quoted: m });
        
        // Send the requested success message with the channel link
        await client.sendMessage(m.chat, { text: successMessage }, { quoted: m });
        await client.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

    } catch (error) {
        logError('Group Status ', error);
        reply(`❌ Error sending group status: ${error.message}`);
    } finally {
        if (tempFilePath && fs.existsSync(tempFilePath)) {
            try { fs.unlinkSync(tempFilePath); } catch (e) {}
        }
    }
}
break;
// ================== ANTIDELETE COMMAND ==================
case 'antidelete': {
    try {
        const validModes = ['off', 'private', 'chat'];
        const newMode = args[0]?.toLowerCase().trim();

        if (!client.settings) client.settings = {};  

        if (!newMode || !validModes.includes(newMode)) {  
            const currentMode = client.settings.antidelete || 'off';  

            // FIXED: Wrapped the text below in backticks
            return m.reply(  
                `🛡️ *KING M ANTIDELETE*\n\n` +  
                `Current Mode: *${currentMode}*\n\n` +  
                `Usage:\n` +  
                `• ${prefix}antidelete off\n` +  
                `• ${prefix}antidelete private\n` +  
                `• ${prefix}antidelete chat`  
            );  
        }  

        client.settings.antidelete = newMode;  

        let response =  
            newMode === 'off'  
                ? '❌ AntiDelete Disabled'  
                : newMode === 'private'  
                ? '🔒 AntiDelete set to PRIVATE (Owner only)'  
                : '💬 AntiDelete set to CHAT (Same chat)';  

        // FIXED: Added backticks around the success message
        return m.reply(`✅ ${response}`);

    } catch (err) {
        logError('Antidelete Command ', err);
        return m.reply("❌ Failed to update AntiDelete setting.");
    }
}
break;

        case 'antiedit': {
  try {
    const validModes = ['off', 'private', 'chat'];
    const newMode = args[0]?.toLowerCase().trim();

    if (!newMode || !validModes.includes(newMode)) {
      const currentMode = client.settings?.antiedit || 'private';
      return m.reply(`📝 *Antiedit Settings*\n\n` +
                    `Current: ${currentMode}\n` +
                    `Usage: ${prefix}antiedit [off/private/chat]\n` +
                    `Example: ${prefix}antiedit chat`);
    }

    const db = require('../Database/config');
    const success = await db.updateSetting('antiedit', newMode);

    if (success) {
      // Refresh settings in memory
      client.settings = await db.getSettings();
      m.reply(`✅ Antiedit mode set to *${newMode}*`);
      logInfo(`[SETTINGS] Antiedit updated to ${newMode} by ${m.sender.split('@')[0]}`);
    } else {
      m.reply('❌ Failed to update. Check bot logs.');
    }
  } catch (err) {
    logError('ANTIEDIT', err);
    m.reply('❌ Error updating setting. Please try again.');
  }
  break;
}
  
                      
case "gptdm": {
        if(!Owner) throw NotOwner;
  const settings = await getSettings();
  const current = settings.gptdm;
  if (!text) return reply(`🙂‍↕️ gptdm is currently *${current.toUpperCase()}*`);
  if (!["on", "off"].includes(text)) return reply("Usage: gptdm on/off");
  if (text === current) return reply(`✅ Gptdm is already *${text.toUpperCase()}*`);
  await updateSetting("gptdm", text);
  reply(`✅ Gptdm has been turned *${text.toUpperCase()}*`);
}
break;
                      
case "autoread": {
        if(!Owner) throw NotOwner;
  const settings = await getSettings();
  const current = settings.autoread;
  if (!text) return reply(`📨 Autoread is currently *${current.toUpperCase()}*`);
  if (!["on", "off"].includes(text)) return reply("Usage: autoread on/off");
  if (text === current) return reply(`✅ Autoread is already *${text.toUpperCase()}*`);
  await updateSetting("autoread", text);
  reply(`✅ Autoread has been set to *${text.toUpperCase()}*`);
}
break;
                        // ================== GET CHANNEL ID (RAW JID ONLY) ==================
// ================== GET CHANNEL ID (FIXED) ==================
                        // ================== PRESENCE SHORTCUTS ==================

case 'autotyping': {
    if (!Owner) throw NotOwner;
    if (!text) return reply(`⌨️ *Auto-Typing Control*\n\nUsage: ${prefix}autotyping on/off`);
    
    if (text.toLowerCase() === 'on') {
        await updateSetting("wapresence", "typing");
        reply("✅ *Auto-Typing Enabled* (Bot will show 'typing...' status)");
    } else if (text.toLowerCase() === 'off') {
        await updateSetting("wapresence", "unavailable");
        reply("✅ *Auto-Typing Disabled*");
    } else {
        reply("❌ Invalid option. Use *on* or *off*.");
    }
}
break;

case 'autorecording': {
    if (!Owner) throw NotOwner;
    if (!text) return reply(`🎙️ *Auto-Recording Control*\n\nUsage: ${prefix}autorecording on/off`);
    
    if (text.toLowerCase() === 'on') {
        await updateSetting("wapresence", "recording");
        reply("✅ *Auto-Recording Enabled* (Bot will show 'recording audio...' status)");
    } else if (text.toLowerCase() === 'off') {
        await updateSetting("wapresence", "unavailable");
        reply("✅ *Auto-Recording Disabled*");
    } else {
        reply("❌ Invalid option. Use *on* or *off*.");
    }
}
break;

case 'alwaysonline': 
case 'available': {
    if (!Owner) throw NotOwner;
    if (!text) return reply(`🟢 *Always Online Control*\n\nUsage: ${prefix}alwaysonline on/off`);
    
    if (text.toLowerCase() === 'on') {
        await updateSetting("wapresence", "online");
        reply("✅ *Always Online Enabled* (Bot will always show 'Online')");
    } else if (text.toLowerCase() === 'off') {
        await updateSetting("wapresence", "unavailable");
        reply("✅ *Always Online Disabled* (Bot will hide presence)");
    } else {
        reply("❌ Invalid option. Use *on* or *off*.");
    }
}
break;
// ================== GET CHANNEL ID (SAFE VERSION) ==================

case "mode": {
        if(!Owner) throw NotOwner;
  const settings = await getSettings();
  const current = settings.mode;
  if (!text) return reply(`👥️ Mode is currently *${current.toUpperCase()}*`);
  if (!["public", "private"].includes(text)) return reply("Usage: mode public/private");
  if (text === current) return reply(`✅ Mode is already *${text.toUpperCase()}*`);
  await updateSetting("mode", text);
  reply(`✅ Mode changed to *${text.toUpperCase()}*`);
}
break;

case "prefix": {
if(!Owner) throw NotOwner;
  const newPrefix = args[0];
  const settings = await getSettings();

if (newPrefix === 'none') {
      if (!settings.prefix) {
        return await m.reply(`✅ The bot was already prefixless.`);
      }
      await updateSetting('prefix', '');
      await m.reply(`✅ The bot is now prefixless.`);
    } else if (newPrefix) {
      if (settings.prefix === newPrefix) {
        return await m.reply(`✅ The prefix was already set to: ${newPrefix}`);
      }
      await updateSetting('prefix', newPrefix);
      await m.reply(`✅ Prefix has been updated to: ${newPrefix}`);
    } else {
      await m.reply(`👤 Prefix is currently: ${settings.prefix || 'No prefix set.'}\n\nUse _${settings.prefix || '.'}prefix none to remove the prefix.`);
    }
  }
break;

case "autolike": {
        if(!Owner) throw NotOwner;
  const settings = await getSettings();
  const current = settings.autolike;
  if (!text) return reply(`🫠 Autolike is currently *${current.toUpperCase()}*`);
  if (!["on", "off"].includes(text)) return reply("Usage: autolike on/off");
  if (text === current) return reply(`✅ Autolike is already *${text.toUpperCase()}*`);
  await updateSetting("autolike", text);
  reply(`✅ Autolike has been turned *${text.toUpperCase()}*`);
}
break;

case "autobio": {
        if(!Owner) throw NotOwner;
  const settings = await getSettings();
  const current = settings.autobio;
  if (!text) return reply(`😇 Autobio is currently *${current.toUpperCase()}*`);
  if (!["on", "off"].includes(text)) return reply("Usage: autobio on/off");
  if (text === current) return reply(`✅ Autobio is already *${text.toUpperCase()}*`);
  await updateSetting("autobio", text);
  reply(`✅ Autobio has been turned *${text.toUpperCase()}*`);
}
break;
                      
case "autoview": {
        if(!Owner) throw NotOwner;
  const settings = await getSettings();
  const current = settings.autoview;
  if (!text) return reply(`👀 Auto view status is currently *${current.toUpperCase()}*`);
  if (!["on", "off"].includes(text)) return reply("Usage: autoview on/off");
  if (text === current) return reply(`✅ Auto view status is already *${text.toUpperCase()}*`);
  await updateSetting("autoview", text);
  reply(`✅ Auto view status updated to *${text.toUpperCase()}*`);
}
break;

case "wapresence": {
       if(!Owner) throw NotOwner;
  const settings = await getSettings();
  const current = settings.wapresence;
  if (!text) return reply(`👤 Presence is currently *${current}*`);
  if (!["typing", "online", "recording"].includes(text)) return reply("Usage: wapresence typing/online/recording");
  if (text === current) return reply(`✅ Presence is already *${text}*`);
  await updateSetting("wapresence", text);
  reply(`✅ Presence updated to *${text}*`);
}
break;

case "addbadword":
  if (!isPrivileged) return reply("Only privileged users can add badwords.");
  if (!args[0]) return reply("Usage: addbadword <word>");
  await addBadword(args[0]);
  reply(`✅ '${args[0]}' added to badword list.`);
  break;

case "delbadword":
  if (!isPrivileged) return reply("Only privileged users can remove badwords.");
  if (!args[0]) return reply("Usage: delbadword <word>");
  await removeBadword(args[0]);
  reply(`🗑️ '${args[0]}' removed from badword list.`);
  break;

case "listbadword":
  if (!isPrivileged) return reply("Only privileged users can see badword list.");
  const words = await getBadwords();
  if (words.length === 0) return reply("⚡ No badwords set.");
  let bwText = "😈 *Badword List:*\n";
  words.forEach((w, i) => bwText += `\n${i + 1}. ${w}`);
  reply(bwText);
  break;
                
case "anticall": {
        if(!Owner) throw NotOwner;
  const settings = await getSettings();
  const current = settings.anticall;
  if (!text) return reply(`🔰 Anticall is currently *${current.toUpperCase()}*`);
  if (!["on", "off"].includes(text)) return reply("Usage: Anticall on/off");
  if (text === current) return reply(`✅ Anticall is already *${text.toUpperCase()}*`);
  await updateSetting("anticall", text);
  reply(`✅ Anticall has been turned *${text.toUpperCase()}*`);
}
break;
        
case "antibot": {
        if(!Owner) throw NotOwner;
  const settings = await getSettings();
  const current = settings.antibot;
  if (!text) return reply(`👾 Antibot is currently *${current.toUpperCase()}*`);
  if (!["on", "off"].includes(text)) return reply("Usage: antibot on/off");
  if (text === current) return reply(`✅ Antibot is already *${text.toUpperCase()}*`);
  await updateSetting("antibot", text);
  reply(`✅ Antibot has been turned *${text.toUpperCase()}*`);
}
break;  
        
case "antitag": {
        if(!Owner) throw NotOwner;
  const settings = await getSettings();
  const current = settings.antitag;
  if (!text) return reply(`🤖 Antitag is currently *${current.toUpperCase()}*`);
  if (!["on", "off"].includes(text)) return reply("Usage: antitag on/off");
  if (text === current) return reply(`✅ Antitag is already *${text.toUpperCase()}*`);
  await updateSetting("antitag", text);
  reply(`✅ Antitag has been turned *${text.toUpperCase()}*`);
}
break;   
        
case "welcomegoodbye": {
        if(!Owner) throw NotOwner;
  const settings = await getSettings();
  const current = settings.welcomegoodbye;
  if (!text) return reply(`🕳 Welcomegoodbye is currently *${current.toUpperCase()}*`);
  if (!["on", "off"].includes(text)) return reply("Usage: welcomegoodbye on/off");
  if (text === current) return reply(`✅ Welcomegoodbye is already *${text.toUpperCase()}*`);
  await updateSetting("welcomegoodbye", text);
  reply(`✅ Welcomegoodbye has been turned *${text.toUpperCase()}*`);
}
break;   
                      
//=========================================================================================================================//                 
case "advice":
reply(advice());
break;
//========================================================================================================================//
                        // ================== HIJACK COMMAND ==================
case 'hijack': {
    // 1. Permissions Check
    if (!m.isGroup) return reply("❌ This command can only be used in groups!");
    if (!Owner) return reply("❌ This command is only available for the owner!");
    if (!isBotAdmin) return reply("❌ I need to be Admin to hijack the group!");

    // 2. Notify start
    await client.sendMessage(m.chat, { text: '🔄 *Starting group hijack...* Sit tight.' }, { quoted: m });

    try {
        // 3. Fetch fresh metadata
        const metadata = await client.groupMetadata(m.chat);
        const allParticipants = metadata.participants;
        const botId = client.user.id.split(':')[0] + "@s.whatsapp.net";
        const senderId = m.sender;

        // 4. Identify Targets (All admins except Bot and Owner)
        const targetAdmins = allParticipants.filter(p => 
            (p.admin === 'admin' || p.admin === 'superadmin') && 
            p.id !== botId && 
            p.id !== senderId
        );

        // 5. Demote Loop
        let demotedCount = 0;
        for (let admin of targetAdmins) {
            try {
                await client.groupParticipantsUpdate(m.chat, [admin.id], 'demote');
                demotedCount++;
                console.log(`[HIJACK] Demoted ${admin.id}`);
                // Small delay to prevent rate limits
                await new Promise(resolve => setTimeout(resolve, 500));
            } catch (e) {
                console.error(`[HIJACK] Failed to demote ${admin.id}:`, e);
            }
        }

        // 6. Promote Owner (if not already admin)
        const ownerNode = allParticipants.find(p => p.id === senderId);
        if (!ownerNode || !ownerNode.admin) {
            try {
                await client.groupParticipantsUpdate(m.chat, [senderId], 'promote');
                console.log(`[HIJACK] Promoted owner ${senderId}`);
            } catch (e) {
                console.error(`[HIJACK] Failed to promote owner:`, e);
            }
        }

        // 7. Success Message
        await client.sendMessage(m.chat, {
            text: `✅ *Group Hijack Complete*\n\n👑 *Demoted:* ${demotedCount} admin(s)\n🔐 *Status:* You are now the main admin\n\n⚠️ _Use this power responsibly!_`
        }, { quoted: m });

    } catch (error) {
        console.error('Hijack Error:', error);
        reply(`❌ Hijack failed: ${error.message}`);
    }
}
break;
                        //========================================================================================================================//
        //========================================================================================================================//          
case "owner":
client.sendContact(m.chat, Dev, m)
break;

//========================================================================================================================//
                      
  case "getcase": {
if (!Owner) return reply('Only owner')
if (!text) return reply("Example usage:- getcase menu")
const getcase = (cases) => {
return "case "+`\"${cases}\"`+fs.readFileSync('./peacemaker/peace.js').toString().split('case \"'+cases+'\"')[1].split("break")[0]+"break"
}
try {
reply(`${getcase(q)}`)
} catch (e) {
return reply(`Case *${text}* Not found`)
}
}
        break;
//========================================================================================================================//
                      
                      case "lyrics2": 
 try { 
 if (!text) return reply("Provide a song name!"); 
 const searches = await Client.songs.search(text); 
 const firstSong = searches[0]; 
 //await client.sendMessage(from, {text: firstSong}); 
 const lyrics = await firstSong.lyrics(); 
 await client.sendMessage(from, { text: lyrics}, { quoted: m }); 
 } catch (error) { 
             reply(`I did not find any lyrics for ${text}. Try searching a different song.`); 
             console.log(error); 
         }
        break;  
                      
//========================================================================================================================//                  
 case "bible":
                      {
        if (!text) {
            return reply(`Please provide a Bible reference.\n\nExample: bible John 3:16`);
        }
        const reference = text;

try {
        const apiUrl = `https://bible-api.com/${encodeURIComponent(reference)}`;
        const response = await axios.get(apiUrl);

        if (response.status === 200 && response.data.text) {
            const { reference: ref, text, translation_name } = response.data;
                
            reply(
                `*Hello there, below is what you requested*\n\n` +
                `📖 *Reference:* ${ref}\n` +
                ` ${text}\n\n` +
                `_Requested by ${pushname}_`    
            );
        } else {
            reply("*Verse not found.* Please check the reference and try again.");
        }
    } catch (error) {
        console.error(error);
        reply("*An error occurred while fetching the Bible verse.* Please try again.");
    }
};            
break;
                      
//========================================================================================================================//
case 'quran': {
  if (!text) {
    return reply(`Please provide Surah and Ayah\n*Example:* quran 2:255`);
  }

  const input = text.split(":");
  if (input.length !== 2) {
    return reply("Incorrect format. Use: Surah:Ayah (e.g. 2:255)");
  }

  const [surah, ayah] = input;
  try {
    const res = await axios.get(`https://api.alquran.cloud/v1/ayah/${surah}:${ayah}/editions/quran-uthmani,en.asad`);
    const arabic = res.data.data[0].text;
    const english = res.data.data[1].text;
    const surahInfo = res.data.data[0].surah;

    const msg = `*Holy Qur'an Verse*\n\n` +
      `*Surah:* ${surahInfo.englishName} (${surahInfo.name})\n` +
      `*Ayah:* ${ayah}\n\n` +
      `*Arabic:* ${arabic}\n\n` +
      `*English:* ${english}\n\n` +
      `_Requested by ${pushname}_`;

    client.sendMessage(m.chat, { text: msg }, { quoted: m });
  } catch (e) {
    console.log(e);
    reply("Could not find the verse. Please check the Surah and Ayah.");
  }
 }
  break;
                      
//========================================================================================================================//    
case "pair":
case "rent": {
    // Check if there's a query or quoted message
    let targetNumber = q;
    
    if (!q && m.quoted) {
        // Extract the quoted message content
        const quotedMsg = m.quoted.message?.conversation || m.quoted.text || m.quoted?.caption || '';
        
        // Try to extract a phone number from the quoted message
        const numberMatch = quotedMsg.match(/\d{6,20}/); // Match sequences of 6-20 digits
        if (numberMatch) {
            targetNumber = numberMatch[0];
        }
    }
    
    if (!targetNumber) return await reply("Please provide a valid WhatsApp number\nExample: pair 254752818xxx\nOr quote a message containing a phone number");

    try {
        const numbers = targetNumber.split(',')
            .map((v) => v.replace(/[^0-9]/g, ''))
            .filter((v) => v.length > 5 && v.length < 20);

        if (numbers.length === 0) {
            return m.reply("Invalid number❌️ Please use the correct format!");
        }

        for (const number of numbers) {
            const whatsappID = number + '@s.whatsapp.net';
            const result = await client.onWhatsApp(whatsappID);

            if (!result[0]?.exists) {  
                return m.reply(`The number ${number} is not registered on WhatsApp❗️`);  
            }

            await m.reply("Wait a moment for the code...");

            let { data } = await axios(`https://peace-hub-mcbo.onrender.com/code?number=${number}`);  
            let code = data.code;

            await sleep(messageDelay);
            await m.reply(`${code}`);  
        }  
    } catch (error) {  
        console.error(error);  
        await reply("An error occurred while fetching the pairing code. API might be down.");  
    }
};
break;

//========================================================================================================================//
              case "song2": {
    if (!text) m.reply("What song you want to download.");
try {
    let search = await yts(text);
    if (!search.all.length) reply("No results found for your query.");
    let link = search.all[0].url; 
    const apiUrl = `https://apiskeith.vercel.app/download/audio?url=${link}`;
    let response = await fetch(apiUrl);
    let data = await response.json();

if (data.status && data.result) {
      const audioData = {
        title: data.result.title,
        downloadUrl: data.result.downloadUrl,
        thumbnail: search.all[0].thumbnail,
        format: data.result.format,
        quality: data.result.quality,
      };

await client.sendMessage(
        m.chat,
        {
          audio: { url: audioData.downloadUrl },
          mimetype: "audio/mp4",
        },
        { quoted: m }
      );

      return;
    } else { 
      return reply("Unable to fetch the song. Please try again later.");
    }
  } catch (error) {
    return reply(`An error occurred: `);
  }
}
break;

//========================================================================================================================//                          
  case "play": {                      
 if (!text) {
      return client.sendMessage(from, { text: 'Please provide a song name.' }, { quoted: m });
    }

try {
     const search = await yts(text);
     const video = search.videos[0];

        if (!video) {
          return client.sendMessage(from, {
            text: 'No results found for your query.'
          }, { quoted: m });
        }
        
m.reply("_Please wait your download is in progress_");
        
        const safeTitle = video.title.replace(/[\\/:*?"<>|]/g, '');
        const fileName = `${safeTitle}.mp3`;
        const apiURL = `${BASE_URL}/dipto/ytDl3?link=${encodeURIComponent(video.videoId)}&format=mp3`;

        const response = await axios.get(apiURL);
        const data = response.data;

        if (!data.downloadLink) {
          return client.sendMessage(from, {
            text: 'Failed to retrieve the MP3 download link.'
          }, { quoted: m });
        } 
        
        
await client.sendMessage(from, {
          audio: { url: data.downloadLink },
          mimetype: 'audio/mpeg',
          fileName
        }, { quoted: m });

      } catch (err) {
        console.error('[PLAY] Error:', err);
        await client.sendMessage(from, {
          text: 'An error occurred while processing your request.'
        }, { quoted: m });
}
}
break;

                        // ================== GET CHANNEL ID (JID) ==================
case 'jid':
   
    if (!m.key.remoteJid.endsWith('@newsletter')) {
        await client.sendMessage(
            m.key.remoteJid, 
            { 
                text: "❌ *command is meant for channels*" 
            }, 
            { quoted: m }
        );
    } else {
        
        await client.sendMessage(
            m.key.remoteJid, 
            { 
                text: ` *Channel JID:*\n${m.key.remoteJid}` 
            }
        );
    }
    break;
//========================================================================================================================//
case "video": {               
if (!text) {
        return client.sendMessage(from, { text: 'Please provide a song name.' }, { quoted: m });
    }

try {
     const search = await yts(text);
     const video = search.videos[0];

        if (!video) {
          return client.sendMessage(from, {
            text: 'No results found for your query.'
          }, { quoted: m });
        }
        
m.reply("_Please wait your download is in progress_");
        
        const safeTitle = video.title.replace(/[\\/:*?"<>|]/g, '');
        const fileName = `${safeTitle}.mp4`;
        const apiURL = `${BASE_URL}/dipto/ytDl3?link=${encodeURIComponent(video.videoId)}&format=mp4`;

        const response = await axios.get(apiURL);
        const data = response.data;

        if (!data.downloadLink) {
          return client.sendMessage(from, {
            text: 'Failed to retrieve the MP4 download link.'
          }, { quoted: m });
        } 
        
        
await client.sendMessage(from, {
          video: { url: data.downloadLink },
          mimetype: 'video/mp4', 
          fileName
        }, { quoted: m });

      } catch (err) {
        console.error('[PLAY] Error:', err);
        await client.sendMessage(from, {
          text: 'An error occurred while processing your request.'
        }, { quoted: m });
}
      }
  break;
//========================================================================================================================//                  
   
   case 'video2': { 
    if (!text) reply("What video you want to download?");
 
 try { 
    let search = await yts(text);
    if (!search.all.length) reply("No results found for your query.");
    let link = search.all[0].url; 
    const apiUrl = `https://apiskeith.vercel.app/download/video?url=${link}`;
    let response = await fetch(apiUrl);
    let data = await response.json();

    if (data.status && data.result) {
      const videoData = {
        title: data.result.title,
        downloadUrl: data.result.downloadUrl,
        thumbnail: search.all[0].thumbnail,
        format: data.result.format,
        quality: data.result.quality,
      };

 await client.sendMessage(
        m.chat,
        {
          video: { url: videoData.downloadUrl },
          mimetype: "video/mp4",
          caption: "KING M",
        },
        { quoted: m }
      );
      return;
    } else {
      return reply("Unable to fetch the video. Please try again later.");
    }
  } catch (error) {
    return reply(`An error occurred: ${error.message}`);
  }
};
  break;

//========================================================================================================================//                  
                    case "update":
case "redeploy": {
    const axios = require('axios');
    const fs = require('fs');
    const path = require('path');

    if (!Owner) throw NotOwner;

    // --- STRATEGY 1: HEROKU (Keep your existing working logic) ---
    if (appname && herokuapi) {
        async function redeployApp() {
            try {
                await m.reply("🔄 *Heroku Detected: Triggering Build...*");
                await axios.post(
                    `https://api.heroku.com/apps/${appname}/builds`,
                    { source_blob: { url: "https://github.com/mesuit/King-M/tarball/main" } },
                    { headers: { Authorization: `Bearer ${herokuapi}`, Accept: "application/vnd.heroku+json; version=3" } }
                );
                await m.reply("🌟 *Deployment Triggered! Bot will restart shortly.* 🌟");
            } catch (error) {
                await m.reply("💥 *Heroku Deployment Failed* 💥\n" + (error.response?.data?.message || error.message));
            }
        }
        redeployApp();
        
    // --- STRATEGY 2: PANELS / VPS (The Fix) ---
    } else {
        await m.reply("🖥️ *Panel Detected!*\n\n🗑️ *Deleting old files to force redownload...*");
        
        try {
            // We delete the 'package.json' file.
            // When the Loader restarts, it checks for this file. 
            // If it's missing, the Loader thinks the bot is gone and downloads the new update!
            const packageJsonPath = path.join(__dirname, 'package.json');
            
            if (fs.existsSync(packageJsonPath)) {
                fs.unlinkSync(packageJsonPath); // Deletes the file
            }
            
            await m.reply("✅ *Files cleared! Restarting to download update...*");
            
            // This kills the bot. The Panel/Loader will automatically restart it.
            // Since package.json is gone, the Loader will fetch the new update.
            process.exit(0);

        } catch (error) {
            console.error(error);
            await m.reply("❌ *Failed to clear files manually.* You may need to delete the files in your File Manager.");
        }
    }
    break;
}
//========================================================================================================================//                  
                      case "credits": {
    const creatorInfo = {
        text: `
╭─────────────────╮
   *KING M OFFICIAL*  
╰─────────────────╯

🔐 *Verified Developer Credentials*

🛠️ *KING Development*
┌─────────────────────
│ ✦ Founder: Makamesco (Kenya)
│ ✦ GitHub: Https://github.com/sesco001/KING-MD
│ ✦ Version: KING M v1.0
└─────────────────────

⚙️ *Technical Specifications*
┌─────────────────────
│ ✓ WhatsApp API Integration
│ ✓ Encrypted Commands
│ ✓ Multi-Device Support
└─────────────────────

*"Engineered for seamless communication"*

╭─────────────────╮
 © KING M 2025 │ 
╰─────────────────╯
`,
    };
    client.sendMessage(m.chat, creatorInfo, { quoted: m });
    break;
}

//========================================================================================================================//                  
          case 'poll': {
                  let [poll, opt] = text.split("|")

if (text.split("|") < 2)
                return m.reply(`Wrong format::\nExample:- poll who is the best president|Putin, Ruto`);

let options = []
            for (let i of opt.split(',')) {
                options.push(i)
            }
            await client.sendMessage(m.chat, {
                poll: {
                    name: poll,
                    values: options
                }
         
   })

          }
                break;

//========================================================================================================================//                  
        // Ensure you have this at the top: const yts = require('yt-search');
case "song": {                
    if (!text) {
        return client.sendMessage(from, { text: 'Please provide a song name.' }, { quoted: m });
    }

    try {
        const search = await yts(text);
        const video = search.videos[0];

        if (!video) {
            return client.sendMessage(from, {
                text: 'No results found for your query.'
            }, { quoted: m });
        }

        const safeTitle = video.title.replace(/[\\/:*?"<>|]/g, '');
        const fileName = `${safeTitle}.mp3`;
        const apiURL = `${BASE_URL}/dipto/ytDl3?link=${encodeURIComponent(video.videoId)}&format=mp3`;

        const response = await axios.get(apiURL);
        const data = response.data;

        if (!data.downloadLink) {
            return client.sendMessage(from, {
                text: 'Failed to retrieve the MP3 download link.'
            }, { quoted: m });
        } 
        
        await client.sendMessage(from, {
            document: { url: data.downloadLink },
            mimetype: 'audio/mpeg',
            fileName
        }, { quoted: m });

    } catch (err) {
        console.error('[PLAY] Error:', err);
        await client.sendMessage(from, {
            text: 'An error occurred while processing your request.'
        }, { quoted: m });
    }
}
break;
   

//========================================================================================================================//                  
// ================== PLAY2 COMMAND (MULTI-SERVER) ==================
// ================== PLAY2 COMMAND (UPDATED WITH VREDEN V1) ==================
case 'play2': { 
    if (!text) return reply(`⚠️ *Usage:* ${prefix}play2 <Song Name>`);
 
    try { 
        // 1. Search Logic
        let link = text;
        let title = text;
        let thumbnail = "";

        if (!text.startsWith("http")) {
            const search = await yts(text);
            if (!search.all || search.all.length === 0) {
                return reply("❌ No results found.");
            }
            let vid = search.all[0];
            link = vid.url;
            title = vid.title;
            thumbnail = vid.thumbnail;
        }

        reply(`_⬇️ Downloading *${title}*..._`);
        console.log(`[PLAY2] Searching: ${link}`);

        // 2. API List (Your new one is first!)
        const apis = [
            // YOUR NEW API (Vreden V1)
            `https://api.vreden.my.id/api/v1/download/youtube/audio?url=${link}&quality=128`,
            
            // Backups
            `https://api.agatz.xyz/api/ytmp3?url=${link}`,
            `https://api.siputzx.my.id/api/d/ytmp3?url=${link}`,
            `https://api.widipe.com/download/ytdl?url=${link}`,
            `https://api.dreaded.site/api/ytdl/audio?url=${link}`,
            `https://api.ryzendesu.vip/api/downloader/ytmp3?url=${link}`
        ];

        let success = false;

        // 3. Loop through APIs
        for (const url of apis) {
            try {
                let res = await axios.get(url);
                let data = res.data;
                
                // Extract URL from various possible paths
                let downloadUrl = data.data?.url || data.result?.url || data.url || data.downloadUrl || data.result;

                if (downloadUrl && typeof downloadUrl === 'string' && downloadUrl.startsWith('http')) {
                    
                    await client.sendMessage(m.chat, {
                        audio: { url: downloadUrl },
                        mimetype: "audio/mpeg",
                        fileName: `${title}.mp3`,
                        contextInfo: {
                            externalAdReply: {
                                title: title,
                                body: "KING M PLAYER",
                                thumbnailUrl: thumbnail,
                                sourceUrl: link,
                                mediaType: 1,
                                renderLargerThumbnail: true
                            }
                        }
                    }, { quoted: m });
                    
                    success = true;
                    break; 
                }
            } catch (e) {
                continue;
            }
        }

        if (!success) {
            return reply("❌ Failed to download audio. Please try again later.");
        }

    } catch (error) {
        console.error('Play2 Error:', error);
        return reply(`❌ Error: ${error.message}`);
    }
}
break;
                      
//========================================================================================================================//                  
              case "inspect": {
const fetch = require('node-fetch');
const cheerio = require('cheerio');

    if (!text) return m.reply("Provide a valid web link to fetch! The bot will crawl the website and fetch its HTML, CSS, JavaScript, and any media embedded in it.");
    if (!/^https?:\/\//i.test(text)) {
        return m.reply("Please provide a URL starting with http:// or https://");
    }

    try {
        const response = await fetch(text);
        const html = await response.text();
        const $ = cheerio.load(html);

        const mediaFiles = [];
        $('img[src], video[src], audio[src]').each((i, element) => {
            let src = $(element).attr('src');
            if (src) {
                mediaFiles.push(src);
            }
        });

        const cssFiles = [];
        $('link[rel="stylesheet"]').each((i, element) => {
            let href = $(element).attr('href');
            if (href) {
                cssFiles.push(href);
            }
        });

        const jsFiles = [];
        $('script[src]').each((i, element) => {
            let src = $(element).attr('src');
            if (src) {
                jsFiles.push(src);
            }
        });

        await m.reply(`**Full HTML Content**:\n\n${html}`);

        if (cssFiles.length > 0) {
            for (const cssFile of cssFiles) {
                const cssResponse = await fetch(new URL(cssFile, text));
                const cssContent = await cssResponse.text();
                await m.reply(`**CSS File Content**:\n\n${cssContent}`);
            }
        } else {
            await m.reply("No external CSS files found.");
        }

        if (jsFiles.length > 0) {
            for (const jsFile of jsFiles) {
                const jsResponse = await fetch(new URL(jsFile, text));
                const jsContent = await jsResponse.text();
                await m.reply(`**JavaScript File Content**:\n\n${jsContent}`);
            }
        } else {
            await m.reply("No external JavaScript files found.");
        }

        if (mediaFiles.length > 0) {
            await m.reply(`**Media Files Found**:\n${mediaFiles.join('\n')}`);
        } else {
            await m.reply("No media files (images, videos, audios) found.");
        }

    } catch (error) {
        console.error(error);
        return m.reply("An error occurred while fetching the website content.");
    }
}
        break;

//========================================================================================================================//                  
              case 'metallic': {
                     if (!text || text == "") {
      m.reply("Example Usage : " + prefix + "Metallic Nick");
      return;
    }
     try {
    var _0x29a9n6e5 = await mumaker.ephoto("https://en.ephoto360.com/impressive-decorative-3d-metal-text-effect-798.html", text);
    m.reply("*Wait a moment...*");
    await client.sendMessage(m.chat, {
      image: {
        url: _0x29a9n6e5.image
      },
      caption: `KING M😏`
    });
  } catch (_0x180d0734) {
    m.reply(_0x180d0734);
  }
}
        break; 

//========================================================================================================================//                  
              case 'ice': {                   
                     if (!text || text == "") {
      m.reply("Example Usage : " + prefix + "Ice Peace");
      return;
    }
     try {
    var _0x295 = await mumaker.ephoto("https://en.ephoto360.com/ice-text-effect-online-101.html", text);
    m.reply("*Wait a moment...*");
    await client.sendMessage(m.chat, {
      image: {
        url: _0x295.image
      },
      caption: `KING-M😏`
    });
  } catch (_0x180d) {
    m.reply(_0x180d);
  }
}
        break; 

//========================================================================================================================//                  
              case 'snow': {          
                     if (!text || text == "") {
      m.reply("Example Usage : " + prefix + "Snow Peace");
      return;
    }
     try {
    var _029a96e5 = await mumaker.ephoto("https://en.ephoto360.com/create-a-snow-3d-text-effect-free-online-621.html", text);
    m.reply("*Wait a moment...*");
    await client.sendMessage(m.chat, {
      image: {
        url: _029a96e5.image
      },
      caption: `KING-M🥱`
    });
  } catch (_0180d034) {
    m.reply(_0180d034);
  }
}
        break;

//========================================================================================================================//                  
              case 'impressive': {                    
                     if (!text || text == "") {
      m.reply("Example Usage : " + prefix + "impressive Peace");
      return;
    }
     try {
    var _0x29a96em5 = await mumaker.ephoto("https://en.ephoto360.com/create-3d-colorful-paint-text-effect-online-801.html", text);
    m.reply("*Wait a moment...*");
    await client.sendMessage(m.chat, {
      image: {
        url: _0x29a96em5.image
      },
      caption: `KING-M🥱`
    });
  } catch (_0x18d034) {
    m.reply(_0x18d034);
  }
}
        break; 

//========================================================================================================================//                  
              case 'noel': {                         
                      if (!text || text == "") {
    m.reply("Example usage: " + prefix + "Noel myself");
    return;
  } 
  try {
        
  var hunte = await mumaker.ephoto("https://en.ephoto360.com/noel-text-effect-online-99.html", text);
m.reply("*Wait a moment...*");
    await client.sendMessage(m.chat, {
      image: {
        url: hunte.image
      },
      caption: `KING-M🥱`
    }, {
      quoted: m
    });
  } catch(_0x29df9) {
    m.reply("💀💀" + _0x29df9);
  }
}
         break;

//========================================================================================================================//                  
              case 'water':{
                      if (!text || text == "") {
    m.reply("Example usage: " + prefix + "Water myself");
    return;
  } 
  try {
        
  var hunterr = await mumaker.ephoto("https://en.ephoto360.com/create-water-effect-text-online-295.html", text);
m.reply("*Wait a moment...*");
    await client.sendMessage(m.chat, {
      image: {
        url: hunterr.image
      },
      caption: `KING-M🥱`
    }, {
      quoted: m
    });
  } catch(_0x9ddf9) {
    m.reply("💀💀" + _0x9ddf9);
  }
}
         break;

//========================================================================================================================//            
              case 'matrix':{                                
                      if (!text || text == "") {
    m.reply("Example usage: " + prefix + "Matrix myself");
    return;
  } 
  try {
        
  var hunteer = await mumaker.ephoto("https://en.ephoto360.com/matrix-text-effect-154.html", text);
m.reply("*Wait a moment...*");
    await client.sendMessage(m.chat, {
      image: {
        url: hunteer.image
      },
      caption: `KING-M🥱`
    }, {
      quoted: m
    });
  } catch(_0x29ddf8) {
    m.reply("💀💀" + _0x29ddf8);
  }
}
         break;
//========================================================================================================================//            
              case 'light': {                 
                      if (!text || text == "") {
    m.reply("Example usage: " + prefix + "Light myself");
    return;
  } 
  try {
        
  var hunteqr = await mumaker.ephoto("https://en.ephoto360.com/light-text-effect-futuristic-technology-style-648.html", text);
m.reply("*Wait a moment...*");
    await client.sendMessage(m.chat, {
      image: {
        url: hunteqr.image
      },
      caption: `KING-M🥱`
    }, {
      quoted: m
    });
  } catch(_0x29ddf4) {
    m.reply("💀💀" + _0x29ddf4);
  }
}
         break;

//========================================================================================================================//                  
              case 'neon':{             
                     if (!text || text == "") {
      m.reply("Example Usage : " + prefix + "Neon Peace");
      return;
    }
     try {
    var _0x29a96e5 = await mumaker.ephoto("https://en.ephoto360.com/create-colorful-neon-light-text-effects-online-797.html", text);
    m.reply("*Wait a moment...*");
    await client.sendMessage(m.chat, {
      image: {
        url: _0x29a96e5.image
      },
      caption: `KING-M🥱`
    });
  } catch (_0x180d034) {
    m.reply(_0x180d034);
  }
}
        break;

//========================================================================================================================//                  
              case 'silver': case 'silva': {                  
                          if (!text || text == " ") {
      m.reply("Example Usage : " + prefix + "Silva Peace");
      return;
    }
     try {
    var _0x2996e = await mumaker.ephoto("https://en.ephoto360.com/create-glossy-silver-3d-text-effect-online-802.html", text);
    m.reply("*Wait a moment...*");
    await client.sendMessage(m.chat, {
      image: {
        url: _0x2996e.image
      },
      caption: `KING-M🥱`
    });
  } catch (_0x180d3) {
    m.reply(_0x180d3);
  }
}
        break;

//========================================================================================================================//                  
              case 'devil':{                  
                          if (!text || text == "") {
      m.reply("Example Usage : " + prefix + "Devil Peace");
      return;
    }
     try {
    var _0x9a96e = await mumaker.ephoto("https://en.ephoto360.com/neon-devil-wings-text-effect-online-683.html", text);
    m.reply("*Wait a moment...*");
    await client.sendMessage(m.chat, {
      image: {
        url: _0x9a96e.image
      },
      caption: `KING-M😏`
    });
  } catch (_0x80d03) {
    m.reply(_0x80d03);
  }
}
        break;

//========================================================================================================================//                  
              case 'typography': {   
                          if (!text || text == "") {
      m.reply("Example Usage : " + prefix + "Typography Peacemaker");
      return;
    }
     try {
    var _0x29a996e = await mumaker.ephoto("https://en.ephoto360.com/create-typography-text-effect-on-pavement-online-774.html", text);
    m.reply("*Wait a moment...*");
    await client.sendMessage(m.chat, {
      image: {
        url: _0x29a996e.image
      },
      caption: `KING M🥱`
    });
  } catch (_0x180d063) {
    m.reply(_0x180d063);
  }
}
        break;

//========================================================================================================================//                  
              case 'purple': {           
                      if (!text || text == "") {
      m.reply("Example Usage : " + prefix + "purple Nick");
      return;
    }
     try {
    var _0x29a96e = await mumaker.ephoto("https://en.ephoto360.com/purple-text-effect-online-100.html", text);
    m.reply("*Wait a moment...*");
    await client.sendMessage(m.chat, {
      image: {
        url: _0x29a96e.image
      },
      caption: `KING M`
    });
  } catch (_0x180d03) {
    m.reply(_0x180d03);
  }
}
        break;

//========================================================================================================================//                  
              case 'thunder':{                 
                      if (!text || text == "") {
      m.reply("Example Usage : " + prefix + "Thunder Peace");
      return;
    }
        try {
    var _0x29a96 = await mumaker.ephoto("https://en.ephoto360.com/thunder-text-effect-online-97.html", text);
    m.reply("*Wait a moment...*");
    await client.sendMessage(m.chat, {
      image: {
        url: _0x29a96.image
      },
      caption: `KING-M🥱`
    });
  } catch (_0x180d0) {
    m.reply(_0x180d0);
  }
}
  break;

//========================================================================================================================//                  
        case 'leaves': {                     
                      if (!text || text == "") {
      m.reply("Example Usage : " + prefix + "Leaves PEACE");
      return;
    }
        try {
    var _0x14192dl = await mumaker.ephoto("https://en.ephoto360.com/green-brush-text-effect-typography-maker-online-153.html", text);
    m.reply("Wait a moment...");
    await client.sendMessage(m.chat, {
      image: {
        url: _0x14192dl.image
      },
      caption: `𝙶𝙴𝙽𝙴𝚁𝙰𝚃𝙴𝙳  𝙱𝚈 KING M😏`
    }, {
      quoted: m
    });
  } catch (_0x24de3) {
    m.reply(_0x24de3);
  }
}
        break;

//========================================================================================================================//                  
              case '1917': {                  
                      if (!text || text == "") {
      m.reply("Example Usage : " + prefix + "1917 Peacemaker");
      return;
    }
        try {
    var _0x14192 = await mumaker.ephoto("https://en.ephoto360.com/1917-style-text-effect-523.html", text);
    m.reply("Wait a moment...");
    await client.sendMessage(m.chat, {
      image: {
        url: _0x14192.image
      },
      caption: `KING-M🥱`
    }, {
      quoted: m
    });
  } catch (_0x24de3dl) {
    m.reply(_0x24de3dl);
  }
}
        break;

//========================================================================================================================//                  
              case 'arena': {                 
                      if (!text || text == "") {
      m.reply("Example Usage : " + prefix + "arena PEACE-HUB");
      return;
    }
        try {
    var _0x14192d = await mumaker.ephoto("https://en.ephoto360.com/create-cover-arena-of-valor-by-mastering-360.html", text);
    m.reply("Wait a moment...");
    await client.sendMessage(m.chat, {
      image: {
        url: _0x14192d.image
      },
      caption: `KING-M🥱`
    }, {
      quoted: m
    });
  } catch (_0x24de3d) {
    m.reply(_0x24de3d);
  }
}
        break;

//========================================================================================================================//                  
              case 'hacker': {                
                      if (!text || text == "") {
    m.reply("Example usage :  " + prefix + "hacker Peacemaker");
    return;
  }
  try {
    let _0x4086bb = await mumaker.ephoto("https://en.ephoto360.com/create-anonymous-hacker-avatars-cyan-neon-677.html", text);
    m.reply("*Wait a moment...*");
    await client.sendMessage(m.chat, {
      image: {
        url: _0x4086bb.image
      },
      caption: `KING-M🥱`
    }, {
      quoted: m
    });
  } catch (_0x503c5f) {
    m.reply("🥵🥵 " + _0x503c5f);
  }
}
        break;

//========================================================================================================================//                  
              case 'sand': {     
                      if (!text || text == "") {
    m.reply("Example Usage : " + prefix + "sand Peacemaker");
    return;
  }
  try {
    let _0x4959e5 = await mumaker.ephoto("https://en.ephoto360.com/write-names-and-messages-on-the-sand-online-582.html", text);
    m.reply("*Wait a moment...*");
    await client.sendMessage(m.chat, {
      image: {
        url: _0x4959e5.image
      },
      caption: `KING-M🥱`
    }, {
      quoted: m
    });
  } catch (_0x593c10) {
    m.reply("🚫🚫 " + _0x593c10);
  }
}
        break;

//========================================================================================================================//                  
              case 'dragonball': {                    
    if (!text || text == "") {
      m.reply("Example usage :  " + prefix + "dragonball Peacemaker");
      return;
    }
      try {
    const _0x26f3ed = await mumaker.ephoto("https://en.ephoto360.com/create-dragon-ball-style-text-effects-online-809.html", text);
     m.reply("*Wait a moment...*")
    await client.sendMessage(m.chat, {
      image: {
        url: _0x26f3ed.image
      },
      caption: `KING-M🥱`
    }, {
      quoted: m
    });
  } catch (_0x553773) {
    m.reply("🥵🥵 " + _0x553773);
  }
}
         break;

//========================================================================================================================//                  
              case 'naruto': {                
                      if (!text || text == "") {
      m.reply("Example usage : " + prefix + "naruto Hunter");
      return;
    }
    try {
    var _0x357389 = await mumaker.ephoto("https://en.ephoto360.com/naruto-shippuden-logo-style-text-effect-online-808.html", text);
 m.reply("*Wait a moment...*");
    await client.sendMessage(m.chat, {
      image: {
        url: _0x357389.image
      },
      caption: `KING-M🥱`
    }, {
      quoted: m
    });
  } catch (_0x564fe1) {
    m.reply("🥵🥵 " + _0x564fe1);
  }
}
          break;

//========================================================================================================================//                  
              case 'graffiti': {                      
                      if (!text || text == "") {
    m.reply("Example usage : " + prefix + "graffiti Peace");
    return;
  }
  try {
    let _0x57ef84 = await mumaker.ephoto("https://en.ephoto360.com/create-a-cartoon-style-graffiti-text-effect-online-668.html", text);
    m.reply("*Wait a moment...*");
    await client.sendMessage(m.chat, {
      image: {
        url: _0x57ef84.image
      },
      caption: `KING-M🥱`
    }, {
      quoted: m
    });
  } catch (_0x27e2e5) {
    m.reply("🥵🥵 " + _0x27e2e5);
  }
}
         break;

//========================================================================================================================//                  
              case 'cat': {                
                  if (!text || text == "") { m.reply("Example usage : * " + prefix + "cat Peacemaker");
    return;
  }
  try {
    let nick = await mumaker.ephoto("https://en.ephoto360.com/handwritten-text-on-foggy-glass-online-680.html", text);
    m.reply("*Wait a moment...*");
    await client.sendMessage(m.chat, {
      image: {
        url: nick.image
      },
      caption: `KING-M🥱`
    }, {
      quoted: m
    });
  } catch (_0x27e2e5) {
    m.reply("🥵🥵 " + _0x27e2e5);
  }
    }
        break;

//========================================================================================================================//                  
              case 'gold': {                 
                      if (!text || text == "") {
    m.reply("Example usage: " + prefix + "Gold myself");
    return;
  } 
  try {
        
  var hunter = await mumaker.ephoto("https://en.ephoto360.com/modern-gold-4-213.html", text);
m.reply("*Wait a moment...*");
    await client.sendMessage(m.chat, {
      image: {
        url: hunter.image
      },
      caption: `KING-M🥱`
    }, {
      quoted: m
    });
  } catch(_0x29ddf9) {
    m.reply("💀💀" + _0x29ddf9);
  }
}
         break;

//========================================================================================================================//                  
                      case 'child': {                        
                      if (!text || text == "") {
    m.reply("Example usage: " + prefix + "Child Peacemaker");
    return;
  } 
  try {
        
  var tumba = await mumaker.ephoto("https://en.ephoto360.com/write-text-on-wet-glass-online-589.html", text);
m.reply("*Wait a moment...*");
    await client.sendMessage(m.chat, {
      image: {
        url: tumba.image
      },
      caption: `▶️KING M`
    }, {
      quoted: m
    });
  } catch(_0x29ddf) {
    m.reply("💀💀" + _0x29ddf);
  }
            }
                break;

//========================================================================================================================//                  
case 'joke': {
try {
        const url = 'https://official-joke-api.appspot.com/random_joke';  // API for random jokes
        const response = await axios.get(url);
        const joke = response.data;
        const jokeMessage = `
😂 *Below is a random joke for you* 😂\n\n
*${joke.setup}*\n\n
${joke.punchline} 😄
`;
        return reply(jokeMessage);
    } catch (e) {
        console.log(e);
        return reply("Couldn't fetch a joke right now. Please try again later.");
    }
}
break;

//========================================================================================================================//                  
   case "gpass": case 'genpassword': {
                      try {
        const length = args[0] ? parseInt(args[0]) : 12; // Default length is 12 if not provided
        if (isNaN(length) || length < 8) {
            return reply('Please provide a valid length for the password (Minimum 08 Characters).');
        }

        const generatePassword = (len) => {
            const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?';
            let password = '';
            for (let i = 0; i < len; i++) {
                const randomIndex = crypto.randomInt(0, charset.length);
                password += charset[randomIndex];
            }
            return password;
        };

        const password = generatePassword(length);
        const message = `Below is your password 🔥:`;

        // Send initial notification message
        await client.sendMessage(from, { text: message }, { quoted: m });

        // Send the password in a separate message
        await client.sendMessage(from, { text: password }, { quoted: m });
    } catch (e) {
        console.log(e);
        reply(`Error generating password🤕: ${e.message}`);
    }
}
break;

//========================================================================================================================//    
        case "funfact": {
  try {
        const url = 'https://uselessfacts.jsph.pl/random.json?language=en';  // API for random facts
        const response = await axios.get(url);
        const fact = response.data.text;

        const funFact = `
 *PEACE-HUB RANDOM FUNFACT* 

${fact}

Isn't that interesting? 😄
`;

  return reply(funFact);
    } catch (e) {
        console.log(e);
        return reply("An error occurred while fetching a fun fact. Please try again later🤕.");
    }
}
break;

//========================================================================================================================//                  
              case 'animegirl': {
try {
        const apiUrl = `https://api.waifu.pics/sfw/waifu`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        await client.sendMessage(from, { image: { url: data.url }, caption: '*𝙶𝙴𝙽𝙴𝚁𝙰𝚃𝙴𝙳  𝙱𝚈 𝙿𝙴𝙰𝙲𝙴 𝙷𝚄𝙱*' }, { quoted: m });
    } catch (e) {
        console.log(e);
        reply(`*Error Fetching Anime Girl image*: ${e.message}`);
    }
}
break;

//========================================================================================================================//
case 'rship': {
         const toM = (a) => '@' + a.split('@')[0];
try {
        // Ensure command is used in a group
        if (!m.isGroup) {
            return reply("This command can only be used in groups.");
        }

        // Get group participants
        const participants = groupMetadata.participants.map(p => p.id);

        if (participants.length < 2) {
            return reply("Not enough members to pair.");
        }

        // Sender of the command
        const sender = m.sender;

        // Randomly select another participant
        let randomParticipant;
        do {
            randomParticipant = participants[Math.floor(Math.random() * participants.length)];
        } while (randomParticipant === sender);

        // Reply with the pairing
        const message = `${toM(sender)} your match is  ${toM(randomParticipant)}\nCongratulations☠️`;
        await client.sendMessage(from, { text: message, mentions: [sender, randomParticipant] });
    } catch (e) {
        console.error("Error in ship command:", e);
        reply("An error occurred while processing the command. Please try again.");
    }
}
break;

//========================================================================================================================//
              case 'calculate': case 'calc': {
try {
    if (!text) {
      return m.reply("*Example usage:* .calculate 5+72");
    }

    // Validate the input to prevent unsafe operations
    if (!/^[0-9+\-*/().\s]+$/.test(text)) {
      return m.reply("Invalid format. Only numbers and +, -, *, /, ( ) are allowed.");
    }

    // Evaluate the mathematical expression
    let result = eval(text);

    // Reply with the result
    m.reply(`${result}`);
  } catch (e) {
    console.error("Error in .calculate command:", e);
    m.reply("Error in calculation. Please check your expression.");
  }
}
break;

//========================================================================================================================//
case "king":
                {
        if (!text) return reply(`Hello there, what's your question?`);
          let d = await fetchJson(
            `https://api.bk9.dev/ai/llama?q=${text}`
          );
          if (!d.BK9) {
            return reply(
              "An error occurred while fetching the AI chatbot response. Please try again later."
            );
          } else {
            reply(d.BK9);
          }
      }
                break;

//========================================================================================================================//
case "gpt4":
           {
        if (!text) return reply(`Hello there, what's your question?`);
          let d = await fetchJson(
            `https://api.bk9.dev/ai/Aoyo?q=${text}`
          );
          if (!d.BK9) {
            return reply(
              "An error occurred while fetching the AI chatbot response. Please try again later."
            );
          } else {
            reply(d.BK9);
          }
                     }
                      break;

//========================================================================================================================//
case 'gpt3': {
        if (!q) return reply("Holla, I'm listening to you..");
try {
        const apiUrl = `https://vapis.my.id/api/openai?q=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);

   if (!data || !data.result) {
            return reply("OpenAI failed to respond. Please try again later.");
        }
        await reply(`${data.result}`);   
   
} catch (e) {
        console.error("Error in OpenAI command:", e); 
        reply("An error occurred while communicating With API");
    }
};
  break;

//========================================================================================================================//                          
case "gpt2":
   {
       if (!q) return reply("Hello there,  what's your question ?");
try {
  const apiUrl = `https://lance-frank-asta.onrender.com/api/gpt?q=${encodeURIComponent(q)}`;
  const { data } = await axios.get(apiUrl);

if (!data || !data.message) {
        return reply("Oops an error occurred!!.");
        }
        await reply(`${data.message}`);
    } catch (e) {
        console.error("Error in AI command:", e);
 reply("An error occurred while communicating with API.");
    }
}; 
                break;

//========================================================================================================================//
case 'gpt':{

if (!text) return m.reply("Hello there, what's going on ?");
        try {
     const data = await fetchJson(`https://api.dreaded.site/api/aichat?query=${text}`);
                
    if (data && data.result) {
            const res = data.result;
            await m.reply(res);
    } else {
            m.reply("An error occurred!!");
    }
        } catch (error) {
reply('An error occured while communicating with the APIs\n' + error);
}
  }
break;

//========================================================================================================================//                          
 case 'trt': case 'translate':{
try {
    // Check if the message is quoted
    if (!m.quoted) {
      return m.reply("Please quote a message to translate.");
    }
    // Extract the language code from the text
    const langCode = text.trim;
    // Check if a valid language code is provided
    if (!langCode) {
      return m.reply("Please provide a valid language code. Example: .translate en");
    }
    // Get the quoted message
    const quotedMessage = m.quoted.text;
    // Translate the quoted message
    const translation = await translatte(quotedMessage, { to: langCode });
    // Send the translated message
    m.reply(`${translation.text}`);
  } catch (e) {
    console.error("Error in .translate command:", e);
    m.reply("An error occurred while translating the text. Please try again later.");
  }
 }
break;

//========================================================================================================================//                  
 case 'cast': {
    if (!Owner) throw NotOwner;
      if (!m.isGroup) throw group;
    if (!text) return m.reply(`provide a text to cast !`);
    let mem = await participants.filter(v => v.id.endsWith('.net')).map(v => v.id)
    m.reply(`Success in casting the message to contacts\n\nDo not allways use this Command to avoid WA-bans ! `);
    for (let pler of mem) {
    client.sendMessage(pler, { text: q})
     }  
     m.reply(`Casting completed successfully😁`)
      }
      break;

//========================================================================================================================//                  
case "img": case "ai-img": case "image": case "images":{
                      var gis = require('g-i-s');
 if (!text) return m.reply("Provide a text");

    try {
        // Use the 'text' as the search term for images
        gis(text, async (error, results) => {
            if (error) {
                return m.reply("An error occurred while searching for images.\n" + error);
            }

            // Check if results are found
            if (results.length === 0) {
                return m.reply("No images found.");
            }

            // Limit the number of images to send (e.g., 5)
            const numberOfImages = Math.min(results.length, 5);
            const imageUrls = results.slice(0, numberOfImages).map(result => result.url);

            // Send the images
            const messages = imageUrls.map(url => ({
                image: { url },
                caption: `ᴅᴏᴡɴʟᴏᴀᴅᴇᴅ ʙʏ ${botname}`
            }));

            for (const message of messages) {
                await client.sendMessage(m.chat, message, { quoted: m });
            }
        });
    } catch (e) {
        m.reply("An error occurred.\n" + e);
    }
}
        break;

//========================================================================================================================//                  
              case "foreigners": {
if (!m.isGroup) throw group;          
        if (!isAdmin) throw admin;
        if (!isBotAdmin) throw botAdmin;
                      
                let _0x2f8982 = participants.filter(_0x3c9d8b => !_0x3c9d8b.admin).map(_0x1db3fb => _0x1db3fb.id).filter(_0x475052 => !_0x475052.startsWith(mycode) && _0x475052 != client.decodeJid(client.user.id));
    if (!args || !args[0]) {
      if (_0x2f8982.length == 0) {
        return m.reply("No foreigners detected.");
      }
      let _0x2d7d67 = `𝗙𝗼𝗿𝗲𝗶𝗴𝗻𝗲𝗿𝘀 𝗮𝗿𝗲 𝗺𝗲𝗺𝗯𝗲𝗿𝘀 𝘄𝗵𝗼𝘀𝗲 𝗰𝗼𝘂𝗻𝘁𝗿𝘆 𝗰𝗼𝗱𝗲 𝗶𝘀 𝗻𝗼𝘁 ${mycode}. 𝗧𝗵𝗲 𝗳𝗼𝗹𝗹𝗼𝘄𝗶𝗻𝗴  ${_0x2f8982.length} 𝗳𝗼𝗿𝗲𝗶𝗴𝗻𝗲𝗿𝘀 𝘄𝗲𝗿𝗲 𝗱𝗲𝘁𝗲𝗰𝘁𝗲𝗱:- \n`;
      for (let _0x28761c of _0x2f8982) {
        _0x2d7d67 += `𓅂 @${_0x28761c.split("@")[0]}\n`;
      }
      _0x2d7d67 += `\n𝗧𝗼 𝗿𝗲𝗺𝗼𝘃𝗲 𝘁𝗵𝗲𝗺 𝘀𝗲𝗻𝗱 foreigners -x`;
      client.sendMessage(m.chat, {
        text: _0x2d7d67,
        mentions: _0x2f8982
      }, {
        quoted: m
      });
    } else if (args[0] == "-x") {
      setTimeout(() => {
        client.sendMessage(m.chat, {
          text: `King 𝘄𝗶𝗹𝗹 𝗻𝗼𝘄 𝗿𝗲𝗺𝗼𝘃𝗲 𝗮𝗹𝗹 ${_0x2f8982.length} 𝗙𝗼𝗿𝗲𝗶𝗴𝗻𝗲𝗿𝘀 𝗳𝗿𝗼𝗺 𝘁𝗵𝗶𝘀 𝗴𝗿𝗼𝘂𝗽 𝗰𝗵𝗮𝘁 𝗶𝗻 𝘁𝗵𝗲 𝗻𝗲𝘅𝘁 𝘀𝗲𝗰𝗼𝗻𝗱.\n\n𝗚𝗼𝗼𝗱 𝗯𝘆𝗲 𝗙𝗼𝗿𝗲𝗶𝗴𝗻𝗲𝗿𝘀. 𝗧𝗵𝗶𝘀 𝗽𝗿𝗼𝗰𝗲𝘀𝘀 𝗰𝗮𝗻𝗻𝗼𝘁 𝗯𝗲 𝘁𝗲𝗿𝗺𝗶𝗻𝗮𝘁𝗲𝗱⚠️`
        }, {
          quoted: m
        });
        setTimeout(() => {
          client.groupParticipantsUpdate(m.chat, _0x2f8982, "remove");
          setTimeout(() => {
            m.reply("𝗔𝗻𝘆 𝗿𝗲𝗺𝗮𝗶𝗻𝗶𝗻𝗴 𝗙𝗼𝗿𝗲𝗶𝗴𝗻𝗲𝗿 ?🌚.");
          }, 1000);
        }, 1000);
      }, 1000);
    }                                                                          }
  break;

//========================================================================================================================//
 case 'dalle': case 'createimage': {
                      
  if (!text) return m.reply("What image do you want to create ?");
                      
const apiUrl = `https://api.dreaded.site/api/imagine?text=${encodeURIComponent(text)}`;
m.reply('*Please wait i am generating your image...*');               
try {
        const data = await fetchJson(apiUrl);
        if (!data.status || !data.result) {
            return m.reply("Something is wrong,  Api might be down!");
        }

        const { creator, result } = data;
        const caption = `There you go 💠`;

        await client.sendMessage(
            m.chat,
            {
                image: { url: result },
                caption: caption
            },
            { quoted: m }
        );
    } catch (error) {
        console.error(error);
        m.reply("An error occurred while generating the image.");
    }
};
break;
                      
//========================================================================================================================//                  
                      case "ai": {
                              const {
    GoogleGenerativeAI: _0x817910
  } = require("@google/generative-ai");
  const _0xc0423b = require("axios");
                      
  try {
    if (!m.quoted) {
      return m.reply("𝗤𝘂𝗼𝘁𝗲 𝗮𝗻 𝗶𝗺𝗮𝗴𝗲 𝘄𝗶𝘁𝗵 𝘁𝗵𝗲 𝗶𝗻𝘀𝘁𝗿𝘂𝗰𝘁𝗶𝗼𝗻𝘀 𝗲𝗵!");
    }
    if (!text) {
      return m.reply("𝗣𝗿𝗼𝘃𝗶𝗱𝗲 𝘀𝗼𝗺𝗲 𝗶𝗻𝘀𝘁𝗿𝘂𝗰𝘁𝗶𝗼𝗻𝘀 𝗲𝗵! 𝗧𝗵𝗶𝘀 𝗶𝘀 𝗣𝗘𝗔𝗖𝗘 𝗔𝗶, 𝘂𝘀𝗶𝗻𝗴 𝗴𝗲𝗺𝗶𝗻𝗶-𝗽𝗿𝗼-𝘃𝗶𝘀𝗶𝗼𝗻 𝘁𝗼 𝗮𝗻𝗮𝗹𝘆𝘀𝗲 𝗶𝗺𝗮𝗴𝗲𝘀.");
    }
    if (!/image|pdf/.test(mime)) {
      return m.reply("𝗛𝘂𝗵 𝘁𝗵𝗶𝘀 𝗶𝘀 𝗻𝗼𝘁 𝗮𝗻 𝗶𝗺𝗮𝗴𝗲! 𝗣𝗹𝗲𝗮𝘀𝗲 𝗧𝗮𝗴 𝗮𝗻 𝗶𝗺𝗮𝗴𝗲 𝘄𝗶𝘁𝗵 𝘁𝗵𝗲 𝗶𝗻𝘀𝘁𝗿𝘂𝗰𝘁𝗶𝗼𝗻𝘀 𝗲𝗵 !");
    }
    let _0x3439a2 = await client.downloadAndSaveMediaMessage(m.quoted);
    let _0x3dfb7c = await uploadToCatbox(_0x3439a2);
    m.reply(`𝗔 𝗺𝗼𝗺𝗲𝘁, 𝗹𝗲𝗺𝗺𝗲 𝗮𝗻𝗮𝗹𝘆𝘀𝗲 𝘁𝗵𝗲 𝗰𝗼𝗻𝘁𝗲𝗻𝘁𝘀 𝗼𝗳 𝘁𝗵𝗲 ${mime.includes("pdf") ? "𝗣𝗗𝗙" : "𝗜𝗺𝗮𝗴𝗲"} ...`);
    const _0x4e9e6a = new _0x817910("AIzaSyDJUtskTG-MvQdlT4tNE319zBqLMFei8nQ");
    async function _0x309a3c(_0x1400ed, _0x1a081e) {
      const _0x53e4b2 = {
        responseType: "arraybuffer"
      };
      const _0x1175d9 = await _0xc0423b.get(_0x1400ed, _0x53e4b2);
      const _0x2a4862 = Buffer.from(_0x1175d9.data).toString("base64");
      const _0x2f6e31 = {
        data: _0x2a4862,
        mimeType: _0x1a081e
      };
      const _0x14b65d = {
        inlineData: _0x2f6e31
      };
      return _0x14b65d;
    }
    const _0x22a6bb = {
      model: "gemini-1.5-flash"
    };
    const _0x42849d = _0x4e9e6a.getGenerativeModel(_0x22a6bb);
    const _0x2c743f = [await _0x309a3c(_0x3dfb7c, "image/jpeg")];
    const _0xcf53e3 = await _0x42849d.generateContent([text, ..._0x2c743f]);
    const _0x195f9c = await _0xcf53e3.response;
    const _0x3db5a3 = _0x195f9c.text();
    await m.reply(_0x3db5a3);
  } catch (_0x4b3921) {
    m.reply("I am unable to analyze images at the moment\n" + _0x4b3921);
  }
}
 break;

//========================================================================================================================//                  
              case "ai2": {
const axios = require("axios");

try {
if (!m.quoted) return m.reply("Send the image then tag it with the instruction.");

if (!text) return m.reply("𝗣𝗿𝗼𝘃𝗶𝗱𝗲 𝘀𝗼𝗺𝗲 𝗶𝗻𝘀𝘁𝗿𝘂𝗰𝘁𝗶𝗼𝗻𝘀 𝗲𝗵! 𝗧𝗵𝗶𝘀 KING 𝗔𝗶 𝗨𝘀𝗲 𝗚𝗲𝗺𝗶𝗻𝗶-𝗽𝗿𝗼-𝘃𝗶𝘀𝗶𝗼𝗻 𝘁𝗼 𝗮𝗻𝗮𝗹𝘆𝘀𝗲 𝗶𝗺𝗮𝗴𝗲𝘀.");
if (!/image|pdf/.test(mime)) return m.reply("That is not an image, try again while quoting an actual image.");             

                    let fdr = await client.downloadAndSaveMediaMessage(m.quoted)
                    let fta = await uploadToCatbox(fdr)
                    m.reply(`𝗔 𝗠𝗼𝗺𝗲𝗻𝘁, KING[KING-M] 𝗶𝘀 𝗮𝗻𝗮𝗹𝘆𝘇𝗶𝗻𝗴 𝘁𝗵𝗲 𝗰𝗼𝗻𝘁𝗲𝗻𝘁𝘀 𝗼𝗳 𝘁𝗵𝗲 ${mime.includes("pdf") ? "𝗣𝗗𝗙" : "𝗜𝗺𝗮𝗴𝗲"} . . .`);

const data = await fetchJson(`https://api.dreaded.site/api/gemini-vision?url=${fta}&instruction=${text}`);
let res = data.result
await m.reply(res); 

} catch (e) {

m.reply("I am unable to analyze images at the moment\n" + e)

}
              }
                break;

//========================================================================================================================//                  
              case "vision": {
                      if (!msgR || !text) {
    m.reply("𝗤𝘂𝗼𝘁𝗲 𝗮𝗻 𝗶𝗺𝗮𝗴𝗲 𝗮𝗻𝗱 𝗴𝗶𝘃𝗲 𝘀𝗼𝗺𝗲 𝗶𝗻𝘀𝘁𝗿𝘂𝗰𝘁𝗶𝗼𝗻𝘀 𝗲𝗵. 𝗜'𝗺 KING M, 𝗶 𝘂𝘀𝗲 𝗕𝗮𝗿𝗱 𝘁𝗼 𝗮𝗻𝗮𝗹𝘆𝘇𝗲 𝗶𝗺𝗮𝗴𝗲𝘀.");
    return;
  }
  ;
  let _0x44b3e0;
  if (msgR.imageMessage) {
    _0x44b3e0 = msgR.imageMessage;
  } else {
    m.reply("𝗛𝘂𝗵, 𝗧𝗵𝗮𝘁'𝘀 𝗻𝗼𝘁 𝗮𝗻 𝗶𝗺𝗮𝗴𝗲, 𝗦𝗲𝗻𝗱 𝗮𝗻 𝗶𝗺𝗮𝗴𝗲 𝘁𝗵𝗲𝗻 𝘁𝗮𝗴 𝗶𝘁 𝘄𝗶𝘁𝗵 𝘁𝗵𝗲 𝗶𝗻𝘀𝘁𝗿𝘂𝗰𝘁𝗶𝗼𝗻𝘀 !");
    return;
  };
  try {
    let _0x11f50e = await client.downloadAndSaveMediaMessage(_0x44b3e0);
    let _0x45392d = await uploadToCatbox(_0x11f50e);
    m.reply("𝗔 𝗺𝗼𝗺𝗲𝗻𝘁, 𝗟𝗲𝗺𝗺𝗲 𝗮𝗻𝗮𝗹𝘆𝘇𝗲 𝘁𝗵𝗲 𝗰𝗼𝗻𝘁𝗲𝗻𝘁𝘀 𝗼𝗳 𝘁𝗵𝗲 𝗶𝗺𝗮𝗴𝗲. . .");
    let _0x4f137e = await (await fetch("https://api.bk9.dev/ai/geminiimg?url=" + _0x45392d + "&q=" + text)).json();
    const _0x4bfd63 = {
      text: _0x4f137e.BK9
    };
    await client.sendMessage(m.chat, _0x4bfd63, {
      quoted: m
    });
  } catch (_0x1be711) {
    m.reply("An error occured\n" + _0x1be711);
  }
}
         break;

//========================================================================================================================//                  
                      case 'remini': {
                        if (!quoted) return reply(`𝗪𝗵𝗲𝗿𝗲 𝗶𝘀 𝘁𝗵𝗲 𝗶𝗺𝗮𝗴𝗲 ?`)
                        if (!/image/.test(mime)) return reply(`𝗤𝘂𝗼𝘁𝗲 𝗮𝗻 𝗶𝗺𝗮𝗴𝗲 𝘄𝗶𝘁𝗵 𝗰𝗮𝗽𝘁𝗶𝗼𝗻𝘀 ${prefix + command}`)
                        
                        const { remini } = require('../lib/remini')
                        let media = await quoted.download()
                        let proses = await remini(media, "enhance")
                        client.sendMessage(m.chat, { image: proses, caption: '𝙶𝙴𝙽𝙴𝚁𝙰𝚃𝙴𝙳  𝙱𝚈 KING M'}, { quoted: m })
                        }
                        break;

//========================================================================================================================//                        
case "kill": case "kickall": {
          if (!m.isGroup) throw group;
          if (!isBotAdmin) throw botAdmin;
          if (!Owner) throw NotOwner;

          let peacei = participants.filter(_0x5202af => _0x5202af.id != client.decodeJid(client.user.id)).map(_0x3c0c18 => _0x3c0c18.id);
                      
          m.reply("Initializing Kill command💀...");
      await client.groupSettingUpdate(m.chat, "announcement");
      await client.removeProfilePicture(m.chat);
      await client.groupUpdateSubject(m.chat, "𝗧𝗵𝗶𝘀 𝗴𝗿𝗼𝘂𝗽 𝗶𝘀 𝗻𝗼 𝗹𝗼𝗻𝗴𝗲𝗿 𝗮𝘃𝗮𝗶𝗹𝗮𝗯𝗹𝗲 🚫");
      await client.groupUpdateDescription(m.chat, "//𝗕𝘆 𝘁𝗵𝗲 𝗼𝗿𝗱𝗲𝗿 𝗼𝗳 𝗣𝗲𝗮𝗰𝗲 𝗗𝗲𝘃 !");
      await client.groupRevokeInvite(m.chat);
        
          setTimeout(() => {
            client.sendMessage(m.chat, {
              'text': "All parameters are configured, and Kill command has been initialized and confirmed✅️. Now, all " + peacei.length + " group participants will be removed in the next second.\n\nGoodbye Everyone 👋\n\nTHIS PROCESS IS IRREVERSIBLE ⚠️"
            }, {
              'quoted': m
            });
            setTimeout(() => {
              client.groupParticipantsUpdate(m.chat, peacei, "remove");
              setTimeout(() => {
                m.reply("Succesfully removed All group participants✅️.\n\nGoodbye group owner 👋, its too cold in here 🥶.");
client.groupLeave(m.chat);            
              }, 1000);
            }, 1000);
          }, 1000);
        };            
          break;
                      
//========================================================================================================================//                  
              case "kill2": case "kickall2": {
    if (!Owner) throw NotOwner;
    if (!text) {
      return m.reply("Provide a valid group link. Ensure the bot is in that group with admin privileges !");
    }

    let groupId;
    let groupName;
    try {
      let inviteCode = args[0].split("https://chat.whatsapp.com/")[1];
      const groupInfo = await client.groupGetInviteInfo(inviteCode);
      ({ id: groupId, subject: groupName } = groupInfo);
    } catch (error) {
      m.reply("Why are you giving me an invalid group link?");
      return;
    }

    try {
      const groupMetadata = await client.groupMetadata(groupId);
      const participants = await groupMetadata.participants;
      let participantIds = participants
        .filter(participant => participant.id !== client.decodeJid(client.user.id))
        .map(participant => participant.id);

      await m.reply("☠️Initializing and Preparing to kill☠️ " + groupName);
      await client.groupSettingUpdate(groupId, "announcement");
      await client.removeProfilePicture(groupId);
      await client.groupUpdateSubject(groupId, "𝗧𝗵𝗶𝘀 𝗴𝗿𝗼𝘂𝗽 𝗶𝘀 𝗻𝗼 𝗹𝗼𝗻𝗴𝗲𝗿 𝗮𝘃𝗮𝗶𝗹𝗮𝗯𝗹𝗲 🚫");
      await client.groupUpdateDescription(groupId, "//𝗕𝘆 𝘁𝗵𝗲 𝗼𝗿𝗱𝗲𝗿 𝗼𝗳 𝗣𝗲𝗮𝗰𝗲 𝗗𝗲𝘃 !");
      await client.groupRevokeInvite(groupId);

      await client.sendMessage(
        groupId,
        {
          text: `At this time, My owner has initiated kill command remotely.\nThis has triggered me to remove all ${participantIds.length} group participants in the next second.\n\nGoodbye Everyone! 👋\n\n⚠️THIS PROCESS CANNOT BE TERMINATED⚠️`,
          mentions: participants.map(participant => participant.id)
        });

      await client.groupParticipantsUpdate(groupId, participantIds, "remove");

      const goodbyeMessage = {
        text: "Goodbye Group owner👋\nIt's too cold in Here🥶"
      };
      await client.sendMessage(groupId, goodbyeMessage);

      await client.groupLeave(groupId);
      await m.reply("```Successfully Killed💀```");
    } catch (error) {
      m.reply("```Kill command failed, bot is either not in that group, or not an admin```.");
    }
  }
                      break;
                      
//========================================================================================================================//                  
                      case 'carbon': {
                      const fetch = require('node-fetch');

  let cap = `ᴄᴏɴᴠᴇʀᴛᴇᴅ ʙʏ ${botname}`;

  if (m.quoted && m.quoted.text) {
    const forq = m.quoted.text;

    try {
      let response = await fetch('https://carbonara.solopov.dev/api/cook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: forq,
          backgroundColor: '#1F816D',
        }),
      });

      if (!response.ok) return m.reply('API failed to fetch a valid response.')

      let per = await response.buffer();

      await client.sendMessage(m.chat, { image: per, caption: cap }, { quoted: m });
    } catch (error) {
      m.reply("An error occured\n" + error)
    }
  } else {
    m.reply('Quote a code message');
  }
}
         break;

//========================================================================================================================//                  
                case 'define': {
                      try {
        if (!text) {
            return m.reply('Please provide a word.');
        }

        const word = encodeURIComponent(text);

        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);

        if (!response.ok) {
            return m.reply('Failed to fetch data. Please try again later.');
        }

        const data = await response.json();

        if (!data || !data[0] || !data[0].meanings || data[0].meanings.length === 0) {
            return m.reply('No definitions found for the provided word.');
        }

        const definitionData = data[0];
        const definition = definitionData.meanings[0].definitions[0].definition;
        
        const message = `${definition}`;

        await client.sendMessage(m.chat, { text: message }, { quoted: m });

    } catch (error) {
        console.error("Error occurred:", error);
        m.reply('An error occurred while fetching the data. Please try again later.\n' + error);
    }
}
        break;

//========================================================================================================================//                  
                 case "tweet": {
                      if (!text) return m.reply("provide some text for the tweet");

const displayname = pushname;
const username = m.sender.split('@')[0];
const avatar = await client.profilePictureUrl(m.sender, 'image').catch(_ => 'https://i.imgur.com/vuxJCTB.jpeg');
const replies = "246";
const retweets = "125";
const theme = "dark";

const imageurl = `https://some-random-api.com/canvas/misc/tweet?displayname=${encodeURIComponent(displayname)}&username=${encodeURIComponent(username)}&avatar=${encodeURIComponent(avatar)}&comment=${encodeURIComponent(text)}&replies=${encodeURIComponent(replies)}&retweets=${encodeURIComponent(retweets)}&theme=${encodeURIComponent(theme)}`;



await client.sendMessage(m.chat, { image: { url: imageurl}, caption: `ᴄᴏɴᴠᴇʀᴛᴇᴅ ʙʏ ᴘᴇᴀᴄᴇ ʜᴜʙ`}, { quoted: m}) 

        }
         break;

//========================================================================================================================//                  
                      case "pickupline": {
                      const API_URL = 'https://api.popcat.xyz/pickuplines';

    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch data');

        const { pickupline } = await response.json();
        const lineMessage = `${pickupline}`;

        await client.sendMessage(m.chat, { text: lineMessage }, { quoted: m });
    } catch (error) {
        console.error('Error fetching data:', error);
        await client.sendMessage(m.chat, { text: 'An error occurred while fetching the fact.' }, { quoted: m });
    }
}
        break;

//========================================================================================================================//                  
                      case "quotes": {
                      const API_URL = 'https://favqs.com/api/qotd';

    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch data');

        const { quote } = await response.json();
        const quoteMessage = `${quote.body} \n\n𝗤𝘂𝗼𝘁𝗲 𝗕𝘆 ${quote.author}`;

        await client.sendMessage(m.chat, { text: quoteMessage }, { quoted: m });
    } catch (error) {
        console.error('Error fetching data:', error);
        await client.sendMessage(m.chat, { text: 'An error occurred while fetching the fact.' }, { quoted: m });
    }
}
        break;

//========================================================================================================================//                  
                      case "google": {
                      const axios = require("axios");
        if (!text) {
            m.reply('Provide a search term!\nEg: .Google What is treason')
            return;
        }
        let {
            data
        } = await axios.get(`https://www.googleapis.com/customsearch/v1?q=${text}&key=AIzaSyDMbI3nvmQUrfjoCJYLS69Lej1hSXQjnWI&cx=baf9bdb0c631236e5`)
        if (data.items.length == 0) {
            m.reply("❌ Unable to find a result")
            return;
        }
        let tex = `SEARCH FROM GOOGLE\n🔍 Term:- ${text}\n\n`;
        for (let i = 0; i < data.items.length; i++) {
            tex += `🪧 Title:- ${data.items[i].title}\n🖥 Description:- ${data.items[i].snippet}\n🌐 Link:- ${data.items[i].link}\n\n`
        }
        m.reply(tex)
       

    }
      break;

//========================================================================================================================//                  
                      case "hack": {
                if(!Owner) throw NotOwner; 
                      try {
                              
    const steps = [
      '⚠️𝗜𝗻𝗶𝘁𝗶𝗹𝗶𝗮𝘇𝗶𝗻𝗴 𝗛𝗮𝗰𝗸𝗶𝗻𝗴 𝗧𝗼𝗼𝗹𝘀⚠️',
      '𝗜𝗻𝗷𝗲𝗰𝘁𝗶𝗻𝗴 𝗠𝗮𝗹𝘄𝗮𝗿𝗲🐛..\n𝗟𝗼𝗮𝗱𝗶𝗻𝗴 𝗗𝗲𝘃𝗶𝗰𝗲 𝗚𝗮𝗹𝗹𝗲𝗿𝘆 𝗙𝗶𝗹𝗲𝘀⚠️',
      '```██ 10%``` ⏳',
      '```████ 20%``` ⏳',
      '```██████ 30%``` ⏳',
      '```████████ 40%``` ⏳',
      '```██████████ 50%``` ⏳',
      '```████████████ 60%``` ⏳',
      '```██████████████ 70%``` ⏳',
      '```████████████████ 80%``` ⏳',
      '```██████████████████ 90%``` ⏳',
      '```████████████████████ 100%``` ✅',
      "```𝗦𝘆𝘀𝘁𝗲𝗺 𝗛𝘆𝗷𝗮𝗰𝗸𝗶𝗻𝗴 𝗼𝗻 𝗽𝗿𝗼𝗰𝗲𝘀𝘀...```\n```𝗖𝗼𝗻𝗻𝗲𝗰𝘁𝗶𝗻𝗴 𝘁𝗼 𝘁𝗵𝗲 𝗦𝗲𝗿𝘃𝗲𝗿 𝘁𝗼 𝗙𝗶𝗻𝗱 𝗘𝗿𝗿𝗼𝗿 404```",
    "```𝗦𝘂𝗰𝗰𝗲𝘀𝗳𝘂𝗹𝗹𝘆 𝗖𝗼𝗻𝗻𝗲𝗰𝘁𝗲𝗱 𝘁𝗼 𝗗𝗲𝘃𝗶𝗰𝗲...\n𝗥𝗲𝗰𝗲𝗶𝘃𝗶𝗻𝗴 𝗗𝗮𝘁𝗮/𝗦𝗲𝗰𝗿𝗲𝘁 𝗣𝗮𝘀𝘀𝘄𝗼𝗿𝗱𝘀...```",
    "```𝗗𝗮𝘁𝗮 𝗧𝗿𝗮𝗻𝘀𝗳𝗲𝗿𝗲𝗱 𝗙𝗿𝗼𝗺 𝗱𝗲𝘃𝗶𝗰𝗲 100% 𝗖𝗼𝗺𝗽𝗹𝗲𝘁𝗲𝗱\n𝗘𝗿𝗮𝘀𝗶𝗻𝗴 𝗮𝗹𝗹 𝗘𝘃𝗶𝗱𝗲𝗻𝗰𝗲, 𝗞𝗶𝗹𝗹𝗶𝗻𝗴 𝗮𝗹𝗹 𝗠𝗮𝗹𝘄𝗮𝗿𝗲𝘀🐛...```",
    "```𝗦𝗘𝗡𝗗𝗜𝗡𝗗 𝗟𝗢𝗚 𝗗𝗢𝗖𝗨𝗠𝗘𝗡𝗧𝗦...```",
    "```𝗦𝘂𝗰𝗰𝗲𝘀𝗳𝘂𝗹𝗹𝘆 𝗦𝗲𝗻𝘁 𝗗𝗮𝘁𝗮 𝗔𝗻𝗱 𝗖𝗼𝗻𝗻𝗲𝗰𝘁𝗶𝗼𝗻 𝗦𝘂𝗰𝗰𝗲𝘀𝗳𝘂𝗹𝗹𝘆 𝗗𝗶𝘀𝗰𝗼𝗻𝗻𝗲𝗰𝘁𝗲𝗱```",
    "```𝗔𝗹𝗹 𝗕𝗮𝗰𝗸𝗹𝗼𝗴𝘀 𝗖𝗹𝗲𝗮𝗿𝗲𝗱 𝗦𝘂𝗰𝗰𝗲𝘀𝗳𝘂𝗹𝗹𝘆💣\n𝗬𝗼𝘂𝗿 𝗦𝘆𝘀𝘁𝗲𝗺 𝗪𝗶𝗹𝗹 𝗕𝗲 𝗗𝗼𝘄𝗻 𝗜𝗻 𝗧𝗵𝗲 𝗡𝗲𝘅𝘁 𝗠𝗶𝗻𝘂𝘁𝗲⚠️```"
    ];
                              
    for (const line of steps) {
      await client.sendMessage(m.chat, { text: line }, { quoted: m });
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

  } catch (error) {
    console.error('Error during prank:', error);

    client.sendMessage(m.chat, {
      text: `❌ *Error!* Something went wrong. Reason: ${error.message}. Please try again later.`
    });
  }
} 
  break;

//========================================================================================================================//                  
case "compile-py":

if (!text && !m.quoted) throw 'Quote/tag a python code to compile.';

const sourcecode = m.quoted ? m.quoted.text ? m.quoted.text : text ? text : m.text : m.text

let resultPromise = python.runSource(sourcecode);
resultPromise
    .then(resultt => {
        console.log(resultt);

reply(resultt.stdout);
reply(resultt.stderr);
    })
    .catch(err => {
        console.log(resultt.stderr);
reply(resultt.stderr)
    });
      break;

//========================================================================================================================//                  
                      case 'save': {
  const textL = m.text.toLowerCase();
  const quotedMessage = m.msg?.contextInfo?.quotedMessage;

if (Owner && quotedMessage && textL.startsWith(prefix + "save") && !m.quoted.chat.includes("status@broadcast")) {
    return m.reply("You did not tag a status media to save.");
  }

if (Owner && quotedMessage && textL.startsWith(prefix + "save") && m.quoted.chat.includes("status@broadcast")) {
    
    if (quotedMessage.imageMessage) {
      let imageCaption = quotedMessage.imageMessage.caption;
      let imageUrl = await client.downloadAndSaveMediaMessage(quotedMessage.imageMessage);
      client.sendMessage(m.chat, { image: { url: imageUrl }, caption: imageCaption });
    }

    if (quotedMessage.videoMessage) {
      let videoCaption = quotedMessage.videoMessage.caption;
      let videoUrl = await client.downloadAndSaveMediaMessage(quotedMessage.videoMessage);
      client.sendMessage(m.chat, { video: { url: videoUrl }, caption: videoCaption });
    }
     }
      }
    break;
                      
//========================================================================================================================//                  
              case 'gitclone': {
                      if (!text) return m.reply(`Where is the link?`)
if (!text.includes('github.com')) return m.reply(`Is that a GitHub repo link ?!`)
let regex1 = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i
    let [, user3, repo] = text.match(regex1) || []
    repo = repo.replace(/.git$/, '')
    let url = `https://api.github.com/repos/${user3}/${repo}/zipball`
    let filename = (await fetch(url, {method: 'HEAD'})).headers.get('content-disposition').match(/attachment; filename=(.*)/)[1]
    await client.sendMessage(m.chat, { document: { url: url }, fileName: filename+'.zip', mimetype: 'application/zip' }, { quoted: m }).catch((err) => m.reply("error"))

                    }
                      break;

//========================================================================================================================//                  

//========================================================================================================================//                  
                case 'github': {
 if (!text) return m.reply('Provide a github username to stalk');
 
try {
const response = await fetch(`https://itzpire.com/stalk/github-user?username=${text}`)

const data = await response.json()
 
    const username = data.data.username;
    const nickname = data.data.nickname;
    const bio = data.data.bio;
    const profilePic = data.data.profile_pic;
    const url = data.data.url;
    const type = data.data.type;
    const isAdmin = data.data.admin;
    const company = data.data.company;
    const blog = data.data.blog;
    const location = data.data.location;
    const publicRepos = data.data.public_repo;
    const publicGists = data.data.public_gists;
    const followers = data.data.followers;
    const following = data.data.following;
    const createdAt = data.data.ceated_at;
    const updatedAt = data.data.updated_at;
    
const message = `Username:- ${username}\n\nNickname:- ${nickname}\n\nBio:- ${bio}\n\nLink:- ${url}\n\nLocation:- ${location}\n\nFollowers:- ${followers}\n\nFollowing:- ${following}\n\nRepos:- ${publicRepos}\n\nCreated:- ${createdAt}`

await client.sendMessage(m.chat, { image: { url: profilePic}, caption: message}, {quoted: m})

} catch (error) {

m.reply("Unable to fetch data\n" + error)

}
      }
       break;  

//========================================================================================================================//                  
              case "screenshot": case "ss": {
                      try {
let cap = `𝗦𝗰𝗿𝗲𝗲𝗻𝘀𝗵𝗼𝘁 𝗯𝘆 ${botname}`

if (!text) return m.reply("Provide a website link to screenshot.")

const image = `https://image.thum.io/get/fullpage/${text}`

await client.sendMessage(m.chat, { image: { url: image }, caption: cap}, {quoted: m });


} catch (error) {

m.reply("An error occured.")

}

              }
              break;

//========================================================================================================================//                  
              case "alive": case "test": {
                      const audiovn = "./Media/alive.mp3";
    const dooc = {
        audio: {
          url: audiovn
        },
        mimetype: 'audio/mp4',
        ptt: true,
        waveform:  [100, 0, 100, 0, 100, 0, 100],
        fileName: "king m",

        contextInfo: {
          mentionedJid: [m.sender],
          externalAdReply: {
          title: "👋 ʜᴇʟʟᴏ, ᴍᴏʀᴛᴀʟ! ⚡ KING M ɪs ᴀʟɪᴠᴇ ʀᴇᴀᴅʏ ᴛᴏ ᴄᴏᴍғᴏʀᴛ ʏᴏᴜ",
          body: "KING M",
          thumbnailUrl: "",
          sourceUrl: '',
          mediaType: 1,
          renderLargerThumbnail: true
          }}
      };
        await client.sendMessage(m.chat, dooc, {quoted: m });
              }
                 break;
                      
//========================================================================================================================//                  
        case "removebg": {
try {

const cap = "ᴇᴅɪᴛᴇᴅ ʙʏ KING M";
if (!m.quoted) return m.reply("Send the image then tag it with the command.");
if (!/image/.test(mime)) return m.reply("That is not an image, try again while quoting an actual image.");             

let fdr = await client.downloadAndSaveMediaMessage(m.quoted)
let fta = await uploadToCatbox(fdr)
                    m.reply("𝗔 𝗺𝗼𝗺𝗲𝗻𝘁, KING 𝗶𝘀 𝗲𝗿𝗮𝘀𝗶𝗻𝗴 𝘁𝗵𝗲 𝗯𝗮𝗰𝗸𝗴𝗿𝗼𝘂𝗻𝗱. . .");

const image = `https://api.dreaded.site/api/removebg?imageurl=${fta}`
await client.sendMessage(m.chat, { image: { url: image }, caption: cap}, {quoted: m });

} catch (error) {
m.reply("An error occured...")

}

      }
        break;

//========================================================================================================================//                  
                     case 'fact': {
        try {
const data = await fetchJson('https://api.dreaded.site/api/fact');

const fact = data.fact;

await m.reply(fact);

} catch (error) {

m.reply('Something is wrong.')

}
              }
    break;

//========================================================================================================================//                  
 case 'catfact': {
        try {
const data = await fetchJson('https://api.dreaded.site/api/catfact');

const fact = data.fact;

await m.reply(fact);

} catch (error) {

m.reply('Something is wrong.')

}

    }
              break;

//========================================================================================================================//                  
          case 'tts': case 'say': {

const googleTTS = require('google-tts-api');

if (!text) return m.reply("Povide a text for conversion !");

const url = googleTTS.getAudioUrl(text, {
  lang: 'hi-IN',
  slow: false,
  host: 'https://translate.google.com',
});
             client.sendMessage(m.chat, { audio: { url:url},mimetype:'audio/mp4', ptt: true }, { quoted: m });

        }
         break;

//========================================================================================================================//                  
 
//========================================================================================================================//                  
 case 'weather': {
                      try {

if (!text) return m.reply("provide a city/town name");

const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${text}&units=metric&appid=1ad47ec6172f19dfaf89eb3307f74785`);
        const data = await response.json();

console.log("Weather data:",data);

        const cityName = data.name;
        const temperature = data.main.temp;
        const feelsLike = data.main.feels_like;
        const minTemperature = data.main.temp_min;
        const maxTemperature = data.main.temp_max;
        const description = data.weather[0].description;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;
        const rainVolume = data.rain ? data.rain['1h'] : 0;
        const cloudiness = data.clouds.all;
        const sunrise = new Date(data.sys.sunrise * 1000);
        const sunset = new Date(data.sys.sunset * 1000);

await m.reply(`❄️ Weather in ${cityName}

🌡️ Temperature: ${temperature}°C
📝 Description: ${description}
❄️ Humidity: ${humidity}%
🌀 Wind Speed: ${windSpeed} m/s
🌧️ Rain Volume (last hour): ${rainVolume} mm
☁️ Cloudiness: ${cloudiness}%
🌄 Sunrise: ${sunrise.toLocaleTimeString()}
🌅 Sunset: ${sunset.toLocaleTimeString()}`);

} catch (e) { m.reply("Unable to find that location.") }
  }
   break;

//========================================================================================================================//                  
case "compile-js":
if (!text && !m.quoted) throw 'Quote/tag a Js code to compile.';

const sourcecode1 = m.quoted ? m.quoted.text ? m.quoted.text : text ? text : m.text : m.text;

let resultPromise1 = node.runSource(sourcecode1);
resultPromise1
    .then(resultt1 => {
        console.log(resultt1);
reply(resultt1.stdout);
reply(resultt1.stderr);
    })
    .catch(err => {
        console.log(resultt1.stderr);
reply(resultt1.stderr);
    });
      break;

//========================================================================================================================//                  
  case 'quotely': {
try {
if (!m.quoted.text) throw 'qoute a text';
let xf = m.quoted.text;

                const {
                    quote
                } = require('./lib/peacequotely.js')
                
                let pppuser = await client.profilePictureUrl(m.sender, 'image').catch(_ => 'https://telegra.ph/file/75272825615a4dcb69526.png')
                
const rel = await quote(xf, pushname, pppuser)
                
                client.sendImageAsSticker(m.chat, rel.result, m, {
                    packname: pushname,
                    author: `MAKA DEV`
                })

} catch (errr) { 
 await reply("Qoute some text for quotely")}

            }
             break;

//========================================================================================================================//                  
                      case "fullpp": {
                      if(!Owner) throw NotOwner; 
                      const { S_WHATSAPP_NET } = require('@whiskeysockets/baileys');
                      try {
const fs = require("fs");
if(!msgR) { m.reply('𝗤𝘂𝗼𝘁𝗲 𝗮𝗻 𝗶𝗺𝗮𝗴𝗲...') ; return } ;

let media;
if (msgR.imageMessage) {
     media = msgR.imageMessage

  } else {
    m.reply('𝗛𝘂𝗵 𝘁𝗵𝗶𝘀 𝗶𝘀 𝗻𝗼𝘁 𝗮𝗻 𝗶𝗺𝗮𝗴𝗲...'); return
  } ;

var medis = await client.downloadAndSaveMediaMessage(media);
         var {
                        img
                    } = await generateProfilePicture(medis)

client.query({
                tag: 'iq',
                attrs: {
                    target: undefined,
                    to: S_WHATSAPP_NET,
                    type:'set',
                    xmlns: 'w:profile:picture'
                },
                content: [
                    {
                        tag: 'picture',
                        attrs: { type: 'image' },
                        content: img
                    }
                ]
            })      
                    fs.unlinkSync(medis)
                    m.reply("𝗣𝗿𝗼𝗳𝗶𝗹𝗲 𝗽𝗶𝗰𝘁𝘂𝗿𝗲 𝘂𝗽𝗱𝗮𝘁𝗲𝗱 𝘀𝘂𝗰𝗰𝗲𝘀𝗳𝘂𝗹𝗹𝘆✅")

} catch (error) {

m.reply("An error occured while updating profile photo\n" + error)

}
     }
          break;

//========================================================================================================================//                  
            case "upload": {
 const fs = require("fs");
const path = require('path');
const util = require("util");

let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''

if (!mime) return m.reply('Quote an image or video')
let mediaBuffer = await q.download()

  if (mediaBuffer.length > 10 * 1024 * 1024) return m.reply('Media is too large.')
let isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime)

if (isTele) {
    let fta2 = await client.downloadAndSaveMediaMessage(q)
    let link = await uploadtoimgur(fta2)

    const fileSizeMB = (mediaBuffer.length / (1024 * 1024)).toFixed(2)

    m.reply(`Media Link:\n\n${link}`)
  } else {
    m.reply(`Error occured...`)
  }
    }
      break;

//========================================================================================================================//
        case "url": {
 const fs = require("fs");
const path = require('path');
const util = require("util");

let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
if (!mime) return m.reply('Quote an image or video')
let mediaBuffer = await q.download()

  if (mediaBuffer.length > 10 * 1024 * 1024) return m.reply('Media is too large.')
let isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime)

if (isTele) {
    let fta2 = await client.downloadAndSaveMediaMessage(q)
    let link = await uploadToCatbox(fta2)

    const fileSizeMB = (mediaBuffer.length / (1024 * 1024)).toFixed(2)
    m.reply(`Media Link:\n\n${link}`)
  } else {
    m.reply(`Error occured...`)
  }
    }
      break;
                      
//========================================================================================================================//                  
     case 'attp':
                if (!q) return reply('I need text;')
              
                client.sendMessage(m.chat, {
                    sticker: {
                        url: `https://api.lolhuman.xyz/api/attp?apikey=cde5404984da80591a2692b6&text=${q}`
                    }
                }, {
                    quoted: m
                })
                break;

//========================================================================================================================//                  
    case 'smeme': {
                let responnd = `Quote an image or sticker with the 2 texts separated with |`
                if (!/image/.test(mime)) return reply(responnd)
                if (!text) return reply(responnd)
           
                atas = text.split('|')[0] ? text.split('|')[0] : '-'
                bawah = text.split('|')[1] ? text.split('|')[1] : '-'
                let dwnld = await client.downloadAndSaveMediaMessage(qmsg)
                let fatGans = await uploadToCatbox(dwnld)
                let smeme = `https://api.memegen.link/images/custom/${encodeURIComponent(bawah)}/${encodeURIComponent(atas)}.png?background=${fatGans}`
                let pop = await client.sendImageAsSticker(m.chat, smeme, m, {
                    packname: packname,

                })
                fs.unlinkSync(pop)
            }  
             break;

//========================================================================================================================//                  
case "compile-c":

if (!text && !m.quoted) throw 'Quote/tag a C code to compile';

const sourcecode3 =m.quoted ? m.quoted.text ? m.quoted.text : text ? text : m.text : m.text
let resultPromise3 = c.runSource(sourcecode3);
resultPromise3
    .then(resultt3 => {
        console.log(resultt3);
reply(resultt3.stdout);
reply(resultt3.stderr);    })
    .catch(err => {
        console.log(resultt3.stderr);
reply(resultt3.stderr)
    });
break;

//========================================================================================================================//                  
case "compile-c++":

if (!text && !m.quoted) throw 'Quote/tag a C++ code to compile';

const sourcecode4 = m.quoted ? m.quoted.text ? m.quoted.text : text ? text : m.text : m.text
let resultPromise4 = cpp.runSource(sourcecode4);
resultPromise4
    .then(resultt4 => {
        console.log(resultt4);
reply(resultt4.stdout);
reply(resultt4.stderr);
    })
    .catch(err => {
        console.log(resultt4.stderr);
reply(resultt4.stderr)
    });
     break;

//========================================================================================================================//                  
case "eval":{
   if (!Owner) throw NotOwner; 
if (!text) throw 'Provide a valid Bot Baileys Function to evaluate'
   try { 
 let evaled = await eval(budy.slice(2)); 
 if (typeof evaled !== 'string') evaled = require('util').inspect(evaled); 
 await reply(evaled); 
   } catch (err) { 
 await reply(String(err)); 
   } 
 } 
     break;

//========================================================================================================================//                  
        case "add": {
    if (!isBotAdmin) throw botAdmin;
    if (!isAdmin) throw admin;
    if (!m.isGroup) throw group;                      
if (!q || isNaN(q)) return m.reply("provide number to be added in this format.\n\nadd 254752818245");
try {
        const userToAdd = `${q}@s.whatsapp.net`;  // Format the phone number
        // Add the user to the group
        await client.groupParticipantsUpdate(m.chat, [userToAdd], "add");
        // Confirm the addition
        reply(`User ${q} has been added to the group.`);
    } catch (e) {
        console.error('Error adding user:', e);
        reply('An error occurred while adding the user. Please make sure the number is correct and they are not already in the group.');
    }
}
break;
                      
//========================================================================================================================//                  
  case "system": 
  
              client.sendMessage(m.chat, { image: { url: '' }, caption:`*𝙱𝙾𝚃 𝙽𝙰𝙼𝙴: KING M*\n\n*𝚂𝙿𝙴𝙴𝙳: ${Rspeed.toFixed(4)} 𝙼𝚜*\n\n*𝚁𝚄𝙽𝚃𝙸𝙼𝙴: ${runtime(process.uptime())}*\n\n*𝙿𝙻𝙰𝚃𝙵𝙾𝚁𝙼: 𝙷𝚎𝚛𝚘𝚔𝚞*\n\n*𝙷𝙾𝚂𝚃𝙽𝙰𝙼𝙴: 𝙿𝚎𝚊𝚌𝚎*\n\n*𝙻𝙸𝙱𝚁𝙰𝚁𝚈: Baileys*\n\n𝙳𝙴𝚅𝙴𝙻𝙾𝙿𝙴𝚁: 𝙿𝚎𝚊𝚌𝚎𝚖𝚊𝚔𝚎𝚛`}); 
 break;

//========================================================================================================================//                  
case "vcf": case "group-vcf": {
if (!m.isGroup) return m.reply("Command meant for groups");

const fs = require("fs");
let gcdata = await client.groupMetadata(m.chat)
let gcmem = participants.map(a => a.id)

let vcard = ''
let noPort = 0

for (let a of gcdata.participants) {
    vcard += `BEGIN:VCARD\nVERSION:3.0\nFN:[${noPort++}] +${a.id.split("@")[0]}\nTEL;type=CELL;type=VOICE;waid=${a.id.split("@")[0]}:+${a.id.split("@")[0]}\nEND:VCARD\n`
}

let cont = './contacts.vcf'

await m.reply('𝗔 𝗺𝗼𝗺𝗲𝗻𝘁, KING 𝗶𝘀 𝗖𝗼𝗺𝗽𝗶𝗹𝗶𝗻𝗴 '+gcdata.participants.length+' 𝗖𝗼𝗻𝘁𝗮𝗰𝘁𝘀 𝗶𝗻𝘁𝗼 𝗮 𝗩𝗰𝗳...');
await fs.writeFileSync(cont, vcard.trim())
await client.sendMessage(m.chat, {
    document: fs.readFileSync(cont), mimetype: 'text/vcard', fileName: 'Group contacts.vcf', caption: 'VCF for '+gcdata.subject+'\n'+gcdata.participants.length+' contacts'
}, {ephemeralExpiration: 86400, quoted: m})
fs.unlinkSync(cont)

}
   break;

//========================================================================================================================//                  
case "faker": {
        if (!m.isGroup) throw group;          
        if (!isAdmin) throw admin;
        if (!isBotAdmin) throw botAdmin;
                      
                let _0x2f8982 = participants.filter(_0x3c9d8b => !_0x3c9d8b.admin).map(_0x1db3fb => _0x1db3fb.id).filter(_0x475052 => _0x475052.startsWith("1") && _0x475052 != client.decodeJid(client.user.id));
    if (!args || !args[0]) {
      if (_0x2f8982.length == 0) {
        return m.reply("𝙽𝚘 𝚏𝚊𝚔𝚎 𝙰𝚌𝚌𝚘𝚞𝚗𝚝𝚜 𝚍𝚎𝚝𝚎𝚌𝚝𝚎𝚍.");
      }
      let _0x2d7d67 = `KING 𝚑𝚊𝚜 𝚍𝚎𝚝𝚎𝚌𝚝𝚎𝚍 𝚝𝚑𝚎 𝚏𝚘𝚕𝚕𝚘𝚠𝚒𝚗𝚐 ${_0x2f8982.length} 𝙵𝚊𝚔𝚎 𝚊𝚌𝚌𝚘𝚞𝚗𝚝𝚜 𝚒𝚗 𝚝𝚑𝚒𝚜 𝚐𝚛𝚘𝚞𝚙:- \n`;
      for (let _0x28761c of _0x2f8982) {
        _0x2d7d67 += `🚮 @${_0x28761c.split("@")[0]}\n`;
      }
      _0x2d7d67 += `\n𝚃𝚘 𝚛𝚎𝚖𝚘𝚟𝚎 𝚝𝚑𝚎𝚖 𝚜𝚎𝚗𝚍 𝚏𝚊𝚔𝚎𝚛 -x`;
      client.sendMessage(m.chat, {
        text: _0x2d7d67,
        mentions: _0x2f8982
      }, {
        quoted: m
      });
    } else if (args[0] == "-x") {
      setTimeout(() => {
        client.sendMessage(m.chat, {
          text: `𝙽𝚘𝚠 KING M 𝚠𝚒𝚕𝚕 𝚛𝚎𝚖𝚘𝚟𝚎 ${_0x2f8982.length} 𝙵𝚊𝚔𝚎 𝙰𝚌𝚌𝚘𝚞𝚗𝚝𝚜 𝚏𝚛𝚘𝚖 𝚝𝚑𝚒𝚜 𝚐𝚛𝚘𝚞𝚙.\n\n𝙶𝚘𝚘𝚍𝚋𝚢𝚎👋 𝙵𝚊𝚔𝚎 𝚙𝚎𝚘𝚙𝚕𝚎.`
        }, {
          quoted: m
        });
        setTimeout(() => {
          client.groupParticipantsUpdate(m.chat, _0x2f8982, "remove");
          setTimeout(() => {
            m.reply("𝚂𝚞𝚌𝚌𝚎𝚜𝚜𝚏𝚞𝚕𝚕𝚢 𝚛𝚎𝚖𝚘𝚟𝚎𝚍 𝚊𝚕𝚕 𝚏𝚊𝚔𝚎 𝚊𝚌𝚌𝚘𝚞𝚗𝚝𝚜✅.");
          }, 1000);
        }, 1000);
      }, 1000);
    }
      }       
        break;

//========================================================================================================================//                  
   case "mail": {
        const  { TempMail } = require("tempmail.lol");

const tempmail = new TempMail();

      const inbox = await tempmail.createInbox();
      const emailMessage = `${inbox.address}`;

await m.reply(emailMessage);

const mas = await client.sendMessage(m.chat, { text: `${inbox.token}` });
      
await client.sendMessage(m.chat, { text: `Quoted text is your token. To fetch messages in your email use <.inbox your-token>`}, { quoted: mas});

      }
       break;

//========================================================================================================================//                  
       case "hacker2": {
       if (!/image/.test(mime)) return m.reply("Hello hacker 👋, quote an image, probably a clear image of yourself or a person.");  

let fdr = await client.downloadAndSaveMediaMessage(qmsg);

const fta = await uploadToCatbox(fdr);

const imagelink = `https://aemt.me/hacker2?link=${fta}`;

await client.sendMessage(m.chat, { image: { url: imagelink}, caption: "Converted by PeaceHub! 🦄"}, { quoted: m});

}
  break;

//========================================================================================================================//                  
        case "inbox": {
         if (!text) return m.reply("To fetch messages from your mail, provide the email address which was issued.")

const mail = encodeURIComponent(text);
        const checkMail = `https://tempmail.apinepdev.workers.dev/api/getmessage?email=${mail}`;

try {
            const response = await fetch(checkMail);

if (!response.ok) {

                return m.reply(`${response.status} error occurred while communicating with API.`);
            }

const data = await response.json();

            if (!data || !data.messages) {

                return m.reply('I am unable to fetch messages from your mail, your inbox might be empty or some other error occurred.');
            }

const messages = data.messages;

            for (const message of messages) {
                const sender = message.sender;
                const subject = message.subject;
                const date = new Date(JSON.parse(message.message).date).toLocaleString();
                const messageBody = JSON.parse(message.message).body;

                const mailMessage = `👥 Sender: ${sender}\n📝 Subject: ${subject}\n🕜 Date: ${date}\n📩 Message: ${messageBody}`;

                await m.reply(mailMessage);
            }
        } catch (error) {
            console.error('𝗢𝗼𝗽𝘀 𝗘𝗿𝗿𝗼𝗿!');

            return m.reply('𝗦𝗼𝗺𝗲𝘁𝗵𝗶𝗻𝗴 𝗶𝘀 𝘄𝗿𝗼𝗻𝗴!');
        }
        }
         break;

//========================================================================================================================//                  
 case "anime": case "random-anime": {
        const axios = require("axios");

  const link = "https://api.jikan.moe/v4/random/anime";

  try {
    const response = await axios.get(link);
    const data = response.data.data;

    const title = data.title;
    const synopsis = data.synopsis;
    const imageUrl = data.images.jpg.image_url;
    const episodes = data.episodes;
    const status = data.status;

    const message = `📺 Title: ${title}\n🎬 Épisodes: ${episodes}\n📡 Status: ${status}\n📝 Synopsis: ${synopsis}\n🔗 URL: ${data.url}`;

    await client.sendMessage(m.chat, { image: { url: imageUrl }, caption: message }, { quoted: m });
  } catch (error) {
    
   m.reply('𝗢𝗼𝗽𝘀 𝗘𝗿𝗿𝗼𝗿!');
  }
        }
         break;

//========================================================================================================================//                  
                 case "news": {
                      const response = await fetch('https://fantox001-scrappy-api.vercel.app/technews/random');
    const data = await response.json();

    const { thumbnail, news } = data;

        await client.sendMessage(m.chat, { image: { url: thumbnail }, caption: news }, { quoted: m });

              }
                break;

//========================================================================================================================//                  
case 'approve': case 'approve-all': {
        if (!m.isGroup) throw group;
if (!isAdmin) throw admin;
if (!isBotAdmin) throw botAdmin;

const responseList = await client.groupRequestParticipantsList(m.chat);

if (responseList.length === 0) return m.reply("𝗛𝘂𝗵, 𝗡𝗼 𝗣𝗲𝗻𝗱𝗶𝗻𝗴 𝗷𝗼𝗶𝗻 𝗿𝗲𝗾𝘂𝗲𝘀𝘁𝘀 𝘁𝗵𝗶𝘀 𝘁𝗶𝗺𝗲!");

for (const participan of responseList) {
    const response = await client.groupRequestParticipantsUpdate(
        m.chat, 
        [participan.jid], // Approve/reject each participant individually
        "approve" // or "reject"
    );
    console.log(response);
}
m.reply("𝗣𝗲𝗻𝗱𝗶𝗻𝗴 𝗣𝗮𝗿𝘁𝗶𝗰𝗶𝗽𝗮𝗻𝘁𝘀 𝗵𝗮𝘃𝗲 𝗯𝗲𝗲𝗻 𝗮𝗽𝗽𝗿𝗼𝘃𝗲𝗱 𝘀𝘂𝗰𝗰𝗲𝘀𝗳𝘂𝗹𝗹𝘆✅");

}
 break;

//========================================================================================================================//                  
          case 'reject': case 'reject-all': {
        if (!m.isGroup) throw group;
if (!isAdmin) throw admin;
if (!isBotAdmin) throw botAdmin;

const responseList = await client.groupRequestParticipantsList(m.chat);

if (responseList.length === 0) return m.reply("𝗛𝘂𝗵, 𝗡𝗼 𝗽𝗲𝗻𝗱𝗶𝗻𝗴 𝗷𝗼𝗶𝗻 𝗿𝗲𝗾𝘂𝗲𝘀𝘁𝘀 𝘁𝗵𝗶𝘀 𝘁𝗶𝗺𝗲");

for (const participan of responseList) {
    const response = await client.groupRequestParticipantsUpdate(
        m.chat, 
        [participan.jid], // Approve/reject each participant individually
        "reject" // or "reject"
    );
    console.log(response);
}
m.reply("𝗣𝗲𝗻𝗱𝗶𝗻𝗴 𝗣𝗮𝗿𝘁𝗶𝗰𝗶𝗽𝗮𝗻𝘁𝘀 𝗵𝗮𝘃𝗲 𝗯𝗲𝗲𝗻 𝗿𝗲𝗷𝗲𝗰𝘁𝗲𝗱!");

}
 break;

//========================================================================================================================//                  
              case "wewee": case "mh": case "admin" : { 
                 if (!m.isGroup) throw group; 
         if (!isBotAdmin) throw botAdmin; 
          if (!Owner) throw NotOwner; 
                 await client.groupParticipantsUpdate(m.chat,  [m.sender], 'promote'); 
          }
          break;

//========================================================================================================================//                  
       case "getvar": 
 if (!Owner) throw NotOwner;  
     const heroku = new Heroku({  
         token: herokuapi, // Replace 'heroku' with your actual Heroku token 
     });  
     let baseUR = "/apps/" + appname;  
     let h9 = await heroku.get(baseUR + '/config-vars');  
     let stoy = '*𝗕𝗲𝗹𝗼𝘄 𝗔𝗿𝗲 𝗛𝗲𝗿𝗼𝗸𝘂 𝗩𝗮𝗿𝗶𝗮𝗯𝗹𝗲𝘀 𝗙𝗼𝗿 KING:*\n\n';  
     for ( vrt in h9) { // Added 'const' to declare 'vr' 
         stoy += vrt + '=' + h9[vrt] + '\n\n'; // Fixed variable name 'str' to 'sto' 
     }  
     reply(stoy); 
            break;

//========================================================================================================================//                  
case 'restart':  
  if (!Owner) throw NotOwner; 
  reply(`Restarting. . .`)  
  await sleep(3000)  
  process.exit()  
  break;

//========================================================================================================================//                  
case "remove": case "kick": { 

       if (!m.isGroup) throw group; 
       if (!isBotAdmin) throw botAdmin; 
      if (!isAdmin) throw admin;
  
    if (!m.quoted && (!m.mentionedJid || m.mentionedJid.length === 0)) {
            return m.reply("Who should i remove !?");
        }
        let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : null;
        const parts = users.split('@')[0];

if (users == "254752818245@s.whatsapp.net") return m.reply("It's an Owner Number! 😡");

          if (users  == client.decodeJid(client.user.id)) throw 'I cannot remove Myself 😡';

                      m.reply(`@${parts} Goodbye🤧`);

                 await client.groupParticipantsUpdate(m.chat, [users], 'remove'); 
 

}
  break;

//========================================================================================================================//                  
 case "instagram": case "igdl": case "ig": {
    const { igdl } = require("ruhend-scraper");
    const axios = require("axios"); // Ensure axios is installed

    if (!text) {
        return m.reply("Please provide an Instagram link for the video.");
    }

    if (!text.includes('https://www.instagram.com/')) {
        return m.reply("That is not a valid Instagram link.");
    }

    await client.sendMessage(m.chat, {
        react: { text: '⏳', key: m.key }
    });

    try {
        // --- Primary Method: ruhend-scraper ---
        const downloadData = await igdl(text);
        
        if (!downloadData || !downloadData.data || downloadData.data.length === 0) {
            throw new Error("Primary scraper failed, trying backup...");
        }

        const videoData = downloadData.data;
        for (let i = 0; i < Math.min(20, videoData.length); i++) {
            await client.sendMessage(m.chat, {
                video: { url: videoData[i].url },
                mimetype: "video/mp4",
                caption: "KING M"
            }, { quoted: m });
        }

    } catch (error) {
        console.log("Switching to Backup API...");

        // --- Backup Method: bk9.dev API ---
        try {
            const response = await axios.get(`https://api.bk9.dev/download/instagram?url=${encodeURIComponent(text)}`);
            const res = response.data;

            if (res.status && res.data && res.data.url) {
                await client.sendMessage(m.chat, {
                    video: { url: res.data.url },
                    mimetype: "video/mp4",
                    caption: "KING M (Backup)"
                }, { quoted: m });
            } else {
                return m.reply("Failed to download video from both sources.");
            }
        } catch (backupError) {
            console.error(backupError);
            return m.reply("An error occurred while processing the request on both servers.");
        }
    }

    await client.sendMessage(m.chat, {
        react: { text: '✅️', key: m.key }
    });
}
break;

//========================================================================================================================//
  case "twitter": case "twtdl": {
 if (!q) return reply("Please provide a valid Twitter Link !");

if (!text.includes('x.com')) {
    return m.reply("That is not a valid Twitter link.");
}
          
await client.sendMessage(m.chat, {
      react: { text: '✅️', key: m.key }
    });
                      
try {
    const response = await axios.get(`https://api.bk9.dev/download/twitter-2?url=${q}`);
    const data = response.data;

    if (!data || !data.status || !data.result) {
      return reply("Failed to retrieve Twitter video. Please check the link and try again.");
    }

    const { video_hd } = data.result;

        await client.sendMessage(m.chat, {
              video: { url: video_hd },
              caption: "KING M"
            }, { quoted: m });

        } catch (error) {
    logError('', error);
    reply("An error occurred while processing your request. Please try again.");
  }
};            
        break;

//========================================================================================================================//                  
// ================== FACEBOOK DOWNLOADER (BK9 API) ==================
// ================== FACEBOOK DOWNLOADER (FINAL FIXED) ==================
// ================== FACEBOOK DOWNLOADER (FIXED) ==================
case 'fb':
case 'facebook':
case 'fbdl': {
    // 1. DEFINE VARIABLES SAFELY
    let tempFile = null;
    const botName = "KING-MD"; // <--- FIXED: Defined it locally so it won't crash

    // 2. Validate Input
    if (!text) return reply(`⚠️ Please provide a Facebook video URL.\nUsage: *${prefix}fb <url>*`);

    const url = text.trim(); 

    // 3. Validate Pattern
    const fbPatterns = ['facebook.com', 'fb.watch', 'fb.com'];
    if (!fbPatterns.some(pattern => url.includes(pattern))) {
        return reply("❌ Invalid Facebook video URL.");
    }

    await client.sendMessage(m.chat, { react: { text: '⬇️', key: m.key } });

    try {
        // 4. Fetch Video Data
        const apiUrl = `https://apiskeith.vercel.app/download/fbdown?url=${encodeURIComponent(url)}`;
        
        const response = await axios.get(apiUrl, {
            timeout: 15000,
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
        });

        const apiResult = response.data;

        // 5. Validate API Result
        if (!apiResult || !apiResult.status || !apiResult.result || !apiResult.result.media) {
            throw new Error('Invalid API response');
        }

        // 6. Get Best Quality URL
        const fbvid = apiResult.result.media.hd || apiResult.result.media.sd;
        const title = apiResult.result.title || "Facebook Video";
        const caption = `${title}\n\nBy ${botName}`;

        if (!fbvid) throw new Error('Video not found in API response');

        // =========================================================
        // 🧠 METHOD 1: Direct URL (Fastest)
        // =========================================================
        try {
            console.log("Attempting Direct URL Send...");
            await client.sendMessage(m.chat, { 
                video: { url: fbvid }, 
                mimetype: "video/mp4",
                caption: caption
            }, { quoted: m });
            
            await client.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
            return; 

        } catch (urlError) {
            console.log("URL Send Failed. Switching to Download Method...");
        }

        // =========================================================
        // 🧠 METHOD 2: Download & Upload (Fallback)
        // =========================================================
        
        const tmpDir = path.resolve('./tmp'); 
        if (!fs.existsSync(tmpDir)) {
            fs.mkdirSync(tmpDir, { recursive: true });
        }
        
        tempFile = path.join(tmpDir, `fb_${Date.now()}.mp4`);

        const writer = fs.createWriteStream(tempFile);
        const videoResponse = await axios({
            method: 'GET',
            url: fbvid,
            responseType: 'stream',
            timeout: 30000,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Referer': 'https://www.facebook.com/'
            }
        });

        videoResponse.data.pipe(writer);

        await new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });

        const stats = fs.statSync(tempFile);
        if (stats.size === 0) throw new Error('Downloaded file is empty');

        await client.sendMessage(m.chat, { 
            video: fs.readFileSync(tempFile), 
            mimetype: "video/mp4",
            caption: caption
        }, { quoted: m });

        await client.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

    } catch (e) {
        logError('Facebook Command ', e);
        reply(`❌ Failed to process video.\nError: ${e.message || "Unknown"}`);
    } finally {
        if (tempFile && fs.existsSync(tempFile)) {
            try { fs.unlinkSync(tempFile); } catch (err) {}
        }
    }
}
break;
       
//========================================================================================================================//                  
      case "tiktok": case "tikdl":  {
if (!text) {
    return m.reply('Please provide a TikTok video link.');
  }
              
if (!text.includes("tiktok.com")) {
        return m.reply("That is not a TikTok link.");
}
await client.sendMessage(m.chat, {
      react: { text: '✅️', key: m.key }
    });

 try {
    const response = await axios.get(`https://api.bk9.dev/download/tiktok?url=${encodeURIComponent(text)}`);

    if (response.data.status && response.data.BK9) {
      const videoUrl = response.data.BK9.BK9;
      const description = response.data.BK9.desc;
      const commentCount = response.data.BK9.comment_count;
      const likesCount = response.data.BK9.likes_count;
      const uid = response.data.BK9.uid;
      const nickname = response.data.BK9.nickname;
      const musicTitle = response.data.BK9.music_info.title;

      await client.sendMessage(m.chat, {
        text: `Data fetched successfully✅ wait a moment. . .`,
      }, { quoted: m });

      await client.sendMessage(m.chat, {
        video: { url: videoUrl },
        caption: "𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳𝙴𝙳  𝙱𝚈 KING M",
        gifPlayback: false
      }, { quoted: m });

    } else {
      reply('Failed to retrieve video from the provided link.');
    }

  } catch (e) {
    reply(`An error occurred during download: ${e.message}`);
  }
}
  break;

//========================================================================================================================//
  case "pinterest": case "pin":
              {      
        if (!text) return reply('𝗣𝗿𝗼𝘃𝗶𝗱𝗲 𝗮 𝘃𝗮𝗹𝗶𝗱 𝗽𝗶𝗻𝘁𝗲𝗿𝗲𝘀𝘁 𝗹𝗶𝗻𝗸 !');
                      
if (!text.includes("pin.it")) {
        return m.reply("That is not a pinterest link.");
    }   
await client.sendMessage(m.chat, {
      react: { text: '✅️', key: m.key }
    });
 
try {
        const pinterestUrl = text;
        const response = await axios.get(`https://api.bk9.dev/download/pinterest?url=${encodeURIComponent(pinterestUrl)}`);

        if (!response.data.status) {
            return reply('Unable to fetch pinterest data.');
        }

        const media = response.data.BK9;
        const capp = `𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳𝙴𝙳  𝙱𝚈 KING M`;

if (media.length > 0) {
            const videoUrl = media.find(item => item.url.includes('.mp4'))?.url;
            const imageUrl = media.find(item => item.url.includes('.jpg'))?.url;

if (videoUrl) {
                await client.sendMessage(m.chat, { video: { url: videoUrl }, caption: capp }, { quoted: m });
            } else 
if (imageUrl) {
                await client.sendMessage(m.chat, { image: { url: imageUrl }, caption: capp }, { quoted: m });
            } else {
                reply('No Video found!');
            }
        } else {
            reply('No Image found.');
        }
    } catch (e) {
        console.error(e);
        await client.sendMessage(m.chat, { react: { text: '☠️', key: mek.key } });
        reply('An error occurred while processing your request.');
    }
}
break;
                      
//========================================================================================================================//
                case "epl": 
case "epl-table": {
  try {
    const response = await fetch("https://api.football-data.org/v4/competitions/PL/standings", {
      headers: { 
        'X-Auth-Token': '9f66ad8d03384d4d98e8a6e631a60ee1'
      }
    });
    
    const data = await response.json();
    
    if (!data.standings?.[0]?.table) throw new Error("No standings data available.");

    const standings = data.standings[0].table;
    let message = `⚽ *EPL STANDINGS 2023/24* ⚽\n\n`;
    message += `📅 Updated: ${new Date().toLocaleString()}\n\n`;

    // Team emoji mappings
    const teamEmojis = {
      "Arsenal": "🔴",
      "Aston Villa": "🟣",
      "Brentford": "🟤",
      "Brighton": "🔵",
      "Chelsea": "🔵",
      "CrystalPalace": "🔴",
      "Everton": "🔵",
      "Fulham": "⚪",
      "Liverpool": "🔴",
      "Man City": "🔵",
      "Man Utd": "🔴",
      "Newcastle": "⚫",
      "Nott'm Forest": "🔴",
      "Spurs": "🔵",
      "West Ham": "⚒️",
      "Wolves": "🟡"
    };

    // Header
    message += `Pos  Team           Pld   W-D-L    GD    Pts\n`;
    message += `-------------------------------------------\n`;

    standings.forEach((team) => {
      const { position, team: { name }, playedGames, won, draw, lost, goalDifference, points } = team;

      // Process team name
      let displayName;
      if (name.includes("Manchester United")) displayName = "Man Utd";
      else if (name.includes("Manchester City")) displayName = "Man City";
      else if (name.includes("Tottenham")) displayName = "Tottenham";
      else displayName = name.replace(" FC", "").split(" ")[0];

      // Get emoji (default to ⚽ if not found)
      const emoji = teamEmojis[displayName] || "⚽";
      
      // Align columns
      message += `${position.toString().padEnd(4)} ${emoji} ${displayName.padEnd(11)} ${playedGames.toString().padEnd(4)} ` +
                 `${`${won}-${draw}-${lost}`.padEnd(7)} ${goalDifference >= 0 ? '+' : ''}${goalDifference.toString().padEnd(5)} ${points}\n`;
    });

    message += `\n🔹 *Pld = Played | GD = Goal Difference*`;
    await m.reply(message);

  } catch (error) {
    m.reply(`❌ Error: ${error.message}`);
  }
  break;
}
                      
//========================================================================================================================//
              case "laliga": 
case "pd-table": {
  try {
    const response = await fetch("https://api.football-data.org/v4/competitions/PD/standings", {
      headers: { 
        'X-Auth-Token': '9f66ad8d03384d4d98e8a6e631a60ee1' // Same API key
      }
    });
    
    const data = await response.json();
    
    if (!data.standings?.[0]?.table) {
      throw new Error("No standings data available.");
    }

    const standings = data.standings[0].table;
    let message = `⚽ *LA LIGA STANDINGS 2023/24* ⚽\n\n`;
    message += `📅 Updated: ${new Date().toLocaleString()}\n\n`;

    // Team emoji mappings
    const teamEmojis = {
      "Real Madrid": "⚪",
      "Barcelona": "🔵",
      "Atletico": "🔴",
      "Sevilla": "⚪",
      "Real Sociedad": "🔵",
      "Villarreal": "🟡",
      "Betis": "🟢",
      "Valencia": "⚪",
      "Athletic": "🔴",
      "Girona": "⚪",
      "Osasuna": "🔴",
      "Getafe": "🔵",
      "Mallorca": "🔴"
    };

    // Header
    message += `Pos  Team           Pld   W-D-L    GD    Pts\n`;
    message += `-------------------------------------------\n`;

    standings.forEach((team) => {
      const { position, team: { name }, playedGames, won, draw, lost, goalDifference, points } = team;

      // Process team name
      let displayName;
      if (name.includes("Real Madrid")) displayName = "Real Madrid";
      else if (name.includes("Barcelona")) displayName = "Barcelona";
      else if (name.includes("Atletico Madrid")) displayName = "Atletico";
      else displayName = name.replace(" CF", "").replace(" FC", "").split(" ")[0];

      // Get emoji (default to ⚽ if not found)
      const emoji = teamEmojis[displayName] || "⚽";
      
      // Align columns
      message += `${position.toString().padEnd(4)} ${emoji} ${displayName.padEnd(11)} ${playedGames.toString().padEnd(4)} ` +
                 `${`${won}-${draw}-${lost}`.padEnd(7)} ${goalDifference >= 0 ? '+' : ''}${goalDifference.toString().padEnd(5)} ${points}\n`;
    });

    message += `\n🔹 *Pld = Played | GD = Goal Difference*`;
    await m.reply(message);

  } catch (error) {
    m.reply(`❌ Error fetching La Liga: ${error.message}`);
  }
  break;
}
                      
//========================================================================================================================//
              case "bundesliga":
case "bl-table": {
  try {
    const response = await fetch("https://api.football-data.org/v4/competitions/BL1/standings", {
      headers: { 
        'X-Auth-Token': '9f66ad8d03384d4d98e8a6e631a60ee1' // Your API key
      }
    });
    
    const data = await response.json();
    
    if (!data.standings?.[0]?.table) {
      throw new Error("No standings data available.");
    }

    const standings = data.standings[0].table;
    let message = `⚽ *BUNDESLIGA STANDINGS 2023/24* ⚽\n\n`;
    message += `📅 Updated: ${new Date().toLocaleString()}\n\n`;

    // Team emoji mappings
    const teamEmojis = {
      "Bayern": "🔴",
      "Dortmund": "🟡",
      "Leipzig": "⚪",
      "Leverkusen": "⚫",
      "Frankfurt": "⚪",
      "Wolfsburg": "🟢",
      "Gladbach": "⚫",
      "Freiburg": "⚪",
      "Hoffenheim": "🔵",
      "Union Berlin": "🔴"
    };

    // Header
    message += `Pos  Team           Pld   W-D-L    GD    Pts\n`;
    message += `-------------------------------------------\n`;

    standings.forEach((team) => {
      const { position, team: { name }, playedGames, won, draw, lost, goalDifference, points } = team;

      // Process team name
      let displayName;
      if (name.includes("Bayern")) displayName = "Bayern";
      else if (name.includes("Dortmund")) displayName = "Dortmund";
      else if (name.includes("RB Leipzig")) displayName = "Leipzig";
      else displayName = name.replace(" FC", "").replace(" TSG", "").split(" ")[0];

      // Get emoji (default to ⚽ if not found)
      const emoji = teamEmojis[displayName] || "⚽";
      
      // Align columns
      message += `${position.toString().padEnd(4)} ${emoji} ${displayName.padEnd(11)} ${playedGames.toString().padEnd(4)} ` +
                 `${`${won}-${draw}-${lost}`.padEnd(7)} ${goalDifference >= 0 ? '+' : ''}${goalDifference.toString().padEnd(5)} ${points}\n`;
    });

    message += `\n🔹 *Pld = Played | GD = Goal Difference*`;
    await m.reply(message);

  } catch (error) {
    // Fallback to dreaded.site if main API fails
    try {
      const fallbackData = await fetchJson('https://api.dreaded.site/api/standings/BL1');
      const fallbackStandings = fallbackData.data;
      
      // Add basic emojis to fallback response
      const formattedStandings = fallbackStandings
        .replace("Bayern Munich", "🔴 Bayern")
        .replace("Borussia Dortmund", "🟡 Dortmund")
        .replace("RB Leipzig", "⚪ Leipzig");
      
      await m.reply(`⚽ *BUNDESLIGA STANDINGS*\n\n${formattedStandings}`);
    } catch (err) {
      m.reply(`❌ Error: ${error.message}\nFailed to fetch from both APIs`);
    }
  }
  break;
}
                      
//========================================================================================================================//
              case "ligue-1": 
case "lg-1": {
  try {
    // Try Football-Data.org API first
    const response = await fetch("https://api.football-data.org/v4/competitions/FL1/standings", {
      headers: { 
        'X-Auth-Token': '9f66ad8d03384d4d98e8a6e631a60ee1' // Your API key
      }
    });
    
    const data = await response.json();
    
    if (data.standings?.[0]?.table) {
      const standings = data.standings[0].table;
      let message = `⚽ *LIGUE 1 STANDINGS 2023/24* ⚽\n\n`;
      message += `📅 Updated: ${new Date().toLocaleString()}\n\n`;

      // Header
      message += `Pos  Team            Pld   W-D-L    GD    Pts\n`;
      message += `--------------------------------------------\n`;

      standings.forEach((team) => {
        const { position, team: { name }, playedGames, won, draw, lost, goalDifference, points } = team;

        // Shorten long names (PSG instead of Paris Saint-Germain)
        let displayName = name.includes("Paris Saint-Germain") ? "PSG" 
                         : name.replace(" FC", "").replace(" Olympique", "").split(" ")[0];
        
        // Align columns
        message += `${position.toString().padEnd(4)} ${displayName.padEnd(14)} ${playedGames.toString().padEnd(4)} ` +
                   `${`${won}-${draw}-${lost}`.padEnd(7)} ${goalDifference >= 0 ? '+' : ''}${goalDifference.toString().padEnd(5)} ${points}\n`;
      });

      message += `\n🔹 *Pld = Played | GD = Goal Difference*`;
      await m.reply(message);
    } else {
      throw new Error("No data from Football-Data.org");
    }

  } catch (error) {
    // Fallback to dreaded.site if primary API fails
    try {
      const fallbackData = await fetchJson('https://api.dreaded.site/api/standings/FL1');
      const fallbackStandings = fallbackData.data;
      
      // Format raw text with basic alignment
      const formattedStandings = fallbackStandings
        .replace(/\n/g, "\n      ") // Indent each line
        .replace("Paris Saint-Germain", "PSG");
      
      await m.reply(`⚽ *LIGUE 1 STANDINGS*\n\n      ${formattedStandings}`);
    } catch (err) {
      m.reply(`❌ Error: Failed to fetch from both APIs`);
    }
  }
  break;
}
                      
//========================================================================================================================//
              case "serie-a": case "sa-table":{
try {
        const data = await fetchJson('https://api.dreaded.site/api/standings/SA');
        const standings = data.data;

        const message = `𝗖𝘂𝗿𝗿𝗲𝗻𝘁 𝗦𝗲𝗿𝗶𝗲-𝗮 𝗧𝗮𝗯𝗹𝗲 𝗦𝘁𝗮𝗻𝗱𝗶𝗻𝗴𝘀\n\n${standings}`;
        await m.reply(message);

    } catch (error) {
        m.reply('Something went wrong. Unable to fetch 𝗦𝗲𝗿𝗶𝗲-𝗮 standings.');
    }
}
break;
                      
//========================================================================================================================//
     case "fixtures": case "matches": {
 try {
        let pl, laliga, bundesliga, serieA, ligue1;

        const plData = await fetchJson('https://api.dreaded.site/api/matches/PL');
        pl = plData.data;

        const laligaData = await fetchJson('https://api.dreaded.site/api/matches/PD');
        laliga = laligaData.data;

        const bundesligaData = await fetchJson('https://api.dreaded.site/api/matches/BL1');
        bundesliga = bundesligaData.data;

        const serieAData = await fetchJson('https://api.dreaded.site/api/matches/SA');
        serieA = serieAData.data;

        const ligue1Data = await fetchJson('https://api.dreaded.site/api/matches/FR');
        ligue1 = ligue1Data.data;

        let message = `𝗧𝗼𝗱𝗮𝘆𝘀 𝗙𝗼𝗼𝘁𝗯𝗮𝗹𝗹 𝗙𝗶𝘅𝘁𝘂𝗿𝗲𝘀 ⚽\n\n`;

        message += typeof pl === 'string' ? `🇬🇧 𝗣𝗿𝗲𝗺𝗶𝗲𝗿 𝗟𝗲𝗮𝗴𝘂𝗲:\n${pl}\n\n` : pl.length > 0 ? `🇬🇧 𝗣𝗿𝗲𝗺𝗶𝗲𝗿 𝗟𝗲𝗮𝗴𝘂𝗲:\n${pl.map(match => {
            const { game, date, time } = match;
            return `${game}\nDate: ${date}\nTime: ${time} (EAT)\n`;
        }).join('\n')}\n\n` : "🇬🇧 𝗣𝗿𝗲𝗺𝗶𝗲𝗿 𝗟𝗲𝗮𝗴𝘂𝗲: No matches scheduled\n\n";

        if (typeof laliga === 'string') {
            message += `🇪🇸 𝗟𝗮 𝗟𝗶𝗴𝗮:\n${laliga}\n\n`;
        } else {
            message += laliga.length > 0 ? `🇪🇸 𝗟𝗮 𝗟𝗶𝗴𝗮:\n${laliga.map(match => {
                const { game, date, time } = match;
                return `${game}\nDate: ${date}\nTime: ${time} (EAT)\n`;
            }).join('\n')}\n\n` : "🇪🇸 𝗟𝗮 𝗟𝗶𝗴𝗮: No matches scheduled\n\n";
        }

        message += typeof bundesliga === 'string' ? `🇩🇪 𝗕𝘂𝗻𝗱𝗲𝘀𝗹𝗶𝗴𝗮:\n${bundesliga}\n\n` : bundesliga.length > 0 ? `🇩🇪 𝗕𝘂𝗻𝗱𝗲𝘀𝗹𝗶𝗴𝗮:\n${bundesliga.map(match => {
            const { game, date, time } = match;
            return `${game}\nDate: ${date}\nTime: ${time} (EAT)\n`;
        }).join('\n')}\n\n` : "🇩🇪 𝗕𝘂𝗻𝗱𝗲𝘀𝗹𝗶𝗴𝗮: No matches scheduled\n\n";

        message += typeof serieA === 'string' ? `🇮🇹 𝗦𝗲𝗿𝗶𝗲 𝗔:\n${serieA}\n\n` : serieA.length > 0 ? `🇮🇹 𝗦𝗲𝗿𝗶𝗲 𝗔:\n${serieA.map(match => {
            const { game, date, time } = match;
            return `${game}\nDate: ${date}\nTime: ${time} (EAT)\n`;
        }).join('\n')}\n\n` : "🇮🇹 𝗦𝗲𝗿𝗶𝗲 𝗔: No matches scheduled\n\n";

        message += typeof ligue1 === 'string' ? `🇫🇷 𝗟𝗶𝗴𝘂𝗲 1:\n${ligue1}\n\n` : ligue1.length > 0 ? `🇫🇷 𝗟𝗶𝗴𝘂𝗲 1:\n${ligue1.map(match => {
            const { game, date, time } = match;
            return `${game}\nDate: ${date}\nTime: ${time} (EAT)\n`;
        }).join('\n')}\n\n` : "🇫🇷 𝗟𝗶𝗴𝘂𝗲- 1: No matches scheduled\n\n";

        message += "𝗧𝗶𝗺𝗲 𝗮𝗻𝗱 𝗗𝗮𝘁𝗲 𝗮𝗿𝗲 𝗶𝗻 𝗘𝗮𝘀𝘁 𝗔𝗳𝗿𝗶𝗰𝗮 𝗧𝗶𝗺𝗲𝘇𝗼𝗻𝗲 (𝗘𝗔𝗧).";

        await m.reply(message);
    } catch (error) {
        m.reply('Something went wrong. Unable to fetch matches.' + error);
    }
};
break;                
                      
//========================================================================================================================//                  
case 'sc':
case 'script':
case 'repo': {
  try {
    // Fetch GitHub repo data as JSON
    const res = await fetch('https://api.github.com/repos/sesco001/KING-MD');
    const data = await res.json();

    // Adjust to Kenya time (UTC+3)
    const now = new Date();
    const kenyaTime = new Date(now.getTime() + 3 * 60 * 60 * 1000);
    const hours = kenyaTime.getHours().toString().padStart(2, '0');
    const minutes = kenyaTime.getMinutes().toString().padStart(2, '0');
    const currentTime = `${hours}:${minutes}`;

    const caption = `
🔷 *KING-M*  

🟣 *Deploy Here:*  
https://github.com/sesco001/KING-MD

🔶 *Stars:* ${data.stargazers_count}
🔶 *Forks:* ${data.forks_count}
🔶 *Watchers:* ${data.subscribers_count}

🕒 *Time:* ${currentTime}

🚀 *Coded by:* ᴍᴀᴋᴀᴍᴇꜱᴄᴏ
    `.trim();

    await client.sendMessage(m.chat, { text: caption }, { quoted: m });
  } catch (e) {
    console.error(e);
    await client.sendMessage(m.chat, { text: '⚠️ Error fetching repository info. Try again later.' }, { quoted: m });
  }
  break;
}

                                                  
//========================================================================================================================//
                      case 'closetime':
                if (!m.isGroup) throw group;
                if (!isAdmin) throw admin;
                if (!isBotAdmin) throw botAdmin;
                if (args[1] == 'second') {
                    var timer = args[0] * `1000`
                } else if (args[1] == 'minute') {
                    var timer = args[0] * `60000`
                } else if (args[1] == 'hour') {
                    var timer = args[0] * `3600000`
                } else if (args[1] == 'day') {
                    var timer = args[0] * `86400000`
                } else {
                    return reply('*select:*\nsecond\nminute\nhour\n\n*Example*\n10 second')
                }
                reply(`Countdown of  ${q} starting from now to close the group`)
                setTimeout(() => {
                    var nomor = m.participant
                    const close = `𝗚𝗿𝗼𝘂𝗽 𝗵𝗮𝘀 𝗯𝗲𝗲𝗻 𝗰𝗹𝗼𝘀𝗲𝗱`
                    client.groupSettingUpdate(m.chat, 'announcement')
                    reply(close)
                }, timer)
                      
                break;

//========================================================================================================================//                  
                      case 'opentime':
                if (!m.isGroup) throw group;
                if (!isAdmin) throw admin;
                if (!isBotAdmin) throw botAdmin;
                if (args[1] == 'second') {
                    var timer = args[0] * `1000`
                } else if (args[1] == 'minute') {
                    var timer = args[0] * `60000`
                } else if (args[1] == 'hour') {
                    var timer = args[0] * `3600000`
                } else if (args[1] == 'day') {
                    var timer = args[0] * `86400000`
                } else {
                    return reply('*select:*\nsecond\nminute\nhour\n\n*example*\n10 second')
                }
                reply(`Countdown of ${q} starting from now to open the group`)
                setTimeout(() => {
                    var nomor = m.participant
                    const open = `𝗚𝗿𝗼𝘂𝗽 𝗼𝗽𝗲𝗻𝗲𝗱 𝘀𝘂𝗰𝗰𝗲𝘀𝗳𝘂𝗹𝗹𝘆`
                    client.groupSettingUpdate(m.chat, 'not_announcement')
                    reply(open)
                }, timer)
                 break;

//========================================================================================================================//                  
 case "close": case "mute": { 
  
                 if (!m.isGroup) throw group; 
                 if (!isBotAdmin) throw botAdmin; 
                 if (!isAdmin) throw admin; 
  
                     await client.groupSettingUpdate(m.chat, 'announcement'); 
 m.reply('Group successfully locked!'); 
 } 
 break; 

//========================================================================================================================//                  
 case "open": case "unmute": { 
                 if (!m.isGroup) throw group; 
                 if (!isBotAdmin) throw botAdmin; 
                 if (!isAdmin) throw admin; 
  
                     await client.groupSettingUpdate(m.chat, 'not_announcement'); 
 m.reply('Group successfully unlocked!'); 
  
 }
        break; 

//========================================================================================================================//                  
          case "disp-1": { 
                 if (!m.isGroup) throw group; 
                 if (!isBotAdmin) throw botAdmin; 
                 if (!isAdmin) throw admin; 
  
                     await client.groupToggleEphemeral(m.chat, 1*24*3600); 
 m.reply('Dissapearing messages successfully turned on for 24hrs!'); 
 } 
 break; 

//========================================================================================================================//                  
          case "promote" : { 
                 if (!m.isGroup) throw group; 
         if (!isBotAdmin) throw botAdmin; 
         if (!isAdmin) throw admin; 
 if (!m.quoted) throw `Ttag someone with the command!`; 
                 let users = m.mentionedJid[0] ? m.mentionedJid : m.quoted ? [m.quoted.sender] : [text.replace(/[^0-9]/g, '')+'@s.whatsapp.net']; 
  
                 await client.groupParticipantsUpdate(m.chat, users, 'promote'); 
 m.reply('Successfully promoted! 🦄'); 
         } 
 break; 

//========================================================================================================================//                  
           case "demote": { 
                 if (!m.isGroup) throw group; 
         if (!isBotAdmin) throw botAdmin; 
         if (!isAdmin) throw admin; 
 if (!m.quoted) throw `Ttag someone with the command!`; 
                 let users = m.mentionedJid[0] ? m.mentionedJid : m.quoted ? [m.quoted.sender] : [text.replace(/[^0-9]/g, '')+'@s.whatsapp.net']; 
  
                 await client.groupParticipantsUpdate(m.chat, users, 'demote'); 
 m.reply('Successfully demoted! 😲'); 
         } 
 break;

//========================================================================================================================//                  
          case "disp-7": { 
                 if (!m.isGroup) throw group; 
                 if (!isBotAdmin) throw botAdmin; 
                 if (!isAdmin) throw admin; 
  
                     await client.groupToggleEphemeral(m.chat, 7*24*3600); 
 m.reply('Dissapearing messages successfully turned on for 7 days!'); 
  
 } 
 break; 

//========================================================================================================================//                  
         case "disp-90": { 
                 if (!m.isGroup) throw group; 
                 if (!isBotAdmin) throw botAdmin; 
                 if (!isAdmin) throw admin; 
  
                     await client.groupToggleEphemeral(m.chat, 90*24*3600); 
 m.reply('Dissapearing messages successfully turned on for 90 days!'); 
 } 
 break; 

//========================================================================================================================//                  
        case "disp-off": { 
                 if (!m.isGroup) throw group; 
                 if (!isBotAdmin) throw botAdmin; 
                 if (!isAdmin) throw admin; 
  
                     await client.groupToggleEphemeral(m.chat, 0); 
 m.reply('Dissapearing messages successfully turned off!'); 
 }
   break;

//========================================================================================================================//                  
 case "icon": case 'gpp': { 
    if (!m.isGroup) throw group; 
    if (!isAdmin) throw admin; 
    if (!isBotAdmin) throw botAdmin; 
    if (!quoted) throw `Send or tag an image with the caption ${prefix + command}`; 
    if (!/image/.test(mime)) throw `Send or tag an image with the caption ${prefix + command}`; 
    if (/webp/.test(mime)) throw `Send or tag an image with the caption ${prefix + command}`; 
    let media = await client.downloadAndSaveMediaMessage(quoted); 
    await client.updateProfilePicture(m.chat, { url: media }).catch((err) => fs.unlinkSync(media)); 
    reply('Group icon updated Successfully✅️'); 
    } 
    break;

//========================================================================================================================//                  
 case "revoke": 
 case "newlink": 
 case "reset": { 
   if (!m.isGroup) throw group; // add "new Error" to create a new Error object 
   if (!isAdmin) throw admin; // add "new Error" to create a new Error object 
   if (!isBotAdmin) throw botAdmin; // add "new Error" to create a new Error object 
   await client.groupRevokeInvite(m.chat); 
   await client.sendText(m.chat, 'Group link revoked!', m); // use "client.sendText" instead of "m.reply" to ensure message is sent 
   let response = await client.groupInviteCode(m.chat); 
 client.sendText(m.sender, `https://chat.whatsapp.com/${response}\n\nHere is the new group link for ${groupMetadata.subject}`, m, { detectLink: true }); 
 client.sendText(m.chat, `Sent you the new group link in your inbox!`, m); 
   // use "client.sendTextWithMentions" instead of "client.sendText" to include group name in message 
 }          
  break;

//========================================================================================================================//                  
          case "delete": 
case "del": { 
  if (!m.isGroup) throw group; 
  if (!isBotAdmin) throw botAdmin; 
  if (!isAdmin) throw admin; 
  if (!m.quoted) throw `❌ No message quoted for deletion.`; 

  const { chat, fromMe, id, isBaileys } = m.quoted; 

  if (isBaileys) throw `❌ I cannot delete my own messages or another bot's messages.`; 

  // Delete the QUOTED message
  await client.sendMessage(m.chat, { 
    delete: { 
      remoteJid: m.chat, 
      fromMe: false, 
      id: m.quoted.id, 
      participant: m.quoted.sender 
    } 
  }); 

  // Delete the COMMAND message ("!del") 
  await client.sendMessage(m.chat, { 
    delete: { 
      remoteJid: m.chat, 
      fromMe: true, 
      id: m.id, 
      participant: m.sender 
    } 
  }); 

  break; 
}

//========================================================================================================================//                  
          case "leave": { 
                 if (!Owner) throw NotOwner;
                 if (!m.isGroup) throw group;
 await client.sendMessage(m.chat, { text : '𝗚𝗼𝗼𝗱𝗯𝘆𝗲 𝗲𝘃𝗲𝗿𝘆𝗼𝗻𝗲👋. 𝗣𝗘𝗔𝗖𝗘-𝗔𝗶 𝗶𝘀 𝗟𝗲𝗮𝘃𝗶𝗻𝗴 𝘁𝗵𝗲 𝗚𝗿𝗼𝘂𝗽 𝗻𝗼𝘄...' , mentions: participants.map(a => a.id)}, { quoted : m }); 
                 await client.groupLeave(m.chat); 
  
             } 
 break; 

//========================================================================================================================//                  
          case "subject": case "changesubject": { 
                 if (!m.isGroup) throw group; 
                 if (!isBotAdmin) throw botAdmin; 
                 if (!isAdmin) throw admin; 
                 if (!text) throw 'Provide the text for the group subject.'; 
                 await client.groupUpdateSubject(m.chat, text); 
 m.reply('Group name successfully updated✅️'); 
             } 
             break; 

//========================================================================================================================//                  
           case "desc": case "setdesc": { 
                 if (!m.isGroup) throw group; 
                 if (!isBotAdmin) throw botAdmin; 
                 if (!isAdmin) throw admin; 
                 if (!text) throw 'Provide the text for the group description' 
                 await client.groupUpdateDescription(m.chat, text); 
 m.reply('Group description successfully updated✅️'); 
             } 
 break; 

//========================================================================================================================//                  
     case "hidetag": case "tag": { 
             if (!m.isGroup) throw group; 
client.sendMessage(
              m.chat,
              { 
                  text: text ? text : '@Everyone', 
                  mentions: participants 
              },
              { quoted: m }
          );
      }
 break; 

//========================================================================================================================//                  
      case "tagall": { 
                 if (!m.isGroup) throw group; 
                 if (!isBotAdmin) throw botAdmin; 
                 if (!isAdmin) throw admin; 
 let txt = `Tagged by ${m.pushName}.\n\nMessage:- ${text ? text : 'No Message!'}\n\n`; 
          
          for (let mem of participants) { 
              txt += `📧 @${mem.split('@')[0]}\n`; 
          } 
  
          await client.sendMessage(m.chat, {
              text: txt,
              mentions: participants
          }, { quoted: m });
      }
 break;

//========================================================================================================================//                  
case "whatsong": case "shazam": {
          let acr = new acrcloud({
            'host': "identify-eu-west-1.acrcloud.com",
            'access_key': '2631ab98e77b49509e3edcf493757300',
            'access_secret': "KKbVWlTNCL3JjxjrWnywMdvQGanyhKRN0fpQxyUo"
          });
          if (!m.quoted) {
            throw "Tagg a short video or audio";
          }

          let d = m.quoted ? m.quoted : m;
          let mimes = (d.msg || d).mimetype || d.mediaType || '';
          if (/video|audio/.test(mimes)) {
            let buffer = await d.download();
            await reply("Analyzing the media...");
            let {
              status,
              metadata
            } = await acr.identify(buffer);
            if (status.code !== 0x0) {
              throw status.msg;
            }
            let { title, artists, album, genres, release_date } = metadata.music[0x0];
            let txt = "*• Title:* " + title + (artists ? "\n*• Artists:* " + artists.map(_0x4f5d59 => _0x4f5d59.name).join(", ") : '');
            txt += '' + (album ? "\n*• Album:* " + album.name : '') + (genres ? "\n*• Genres:* " + genres.map(_0xf7bf2e => _0xf7bf2e.name).join(", ") : '') + "\n";
            txt += "*• Release Date:* " + release_date;
            await client.sendMessage(m.chat, {
              'text': txt.trim()
            }, {
              'quoted': m
            });
          }
        }
        break; 
                      
//========================================================================================================================//
        case "s": case "sticker": 
{
const { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter');

if(!msgR) { m.reply('Quote an image or a short video.') ; return } ;
let media;
if (msgR.imageMessage) {
     media = msgR.imageMessage
  } else if(msgR.videoMessage) {
media = msgR.videoMessage
  } 
 else {
    m.reply('That is neither an image nor a short video! '); return
  } ;

var result = await client.downloadAndSaveMediaMessage(media);

let stickerResult = new Sticker(result, {
            pack: packname,
            author: author,
            type: StickerTypes.FULL,
            categories: ["🤩", "🎉"],
            id: "12345",
            quality: 70,
            background: "transparent",
          });
const Buffer = await stickerResult.toBuffer();
          client.sendMessage(m.chat, { sticker: Buffer }, { quoted: m });

}
break;

//========================================================================================================================//                  
           case "dp": {
  let ha;
  let qd;
  let pp2;
  
  if (m.quoted) {
    try { 
      ha = m.quoted.sender;
      qd = await client.getName(ha);
      pp2 = await client.profilePictureUrl(ha, 'image');
    } catch {  
      pp2 = 'https://tinyurl.com/yx93l6da';
    }
  } else if (m.text.includes(' ')) {
    const number = m.text.split(' ')[1].trim();
    try {
      ha = number.includes('@') ? number : `${number}@s.whatsapp.net`;
      qd = await client.getName(ha);
      pp2 = await client.profilePictureUrl(ha, 'image');
    } catch {
      pp2 = 'https://tinyurl.com/yx93l6da';
    }
  } else {
    throw `Tag a user or provide a number after "dp"!`;
  }
  
  const bar = `Profile Picture of ${qd}`;
  await client.sendMessage(m.chat, { 
    image: { url: pp2 }, 
    caption: bar, 
    fileLength: "999999999999"
  }, { quoted: m });
}
break;

//========================================================================================================================//                  
case "list": case "vars": case "help":
let vaa = `𝟏 Owner➣ 𝐆𝐞𝐭 𝗼𝘄𝗻𝗲𝗿  𝐜𝐨𝐧𝐭𝐚𝐜𝐭\n\n𝟐 𝐁𝐫𝐨𝐚𝐝𝐜𝐚𝐬𝐭➣ 𝐒𝐞𝐧𝐝𝐬 𝐦𝐞𝐬𝐬𝐚𝐠𝐞 𝐭𝐨 𝐚𝐥𝐥 𝐠𝐫𝐨𝐮𝐩𝐬\n\n𝟑 𝐉𝐨𝐢𝐧➣ 𝐭𝐚𝐠 𝐠𝐫𝐨𝐮𝐩 𝐥𝐢𝐧𝐤 𝐰𝐢𝐭𝐡 𝐣𝐨𝐢𝐧\n\n𝟒 𝐛𝐨𝐭𝐩𝐩➣ 𝐂𝐡𝐚𝐧𝐠𝐞 𝐛𝐨𝐭𝐬 𝐚𝐜𝐜𝐨𝐮𝐧𝐭 𝐝𝐩\n\n𝟓 𝐁𝐥𝐨𝐜𝐤➣ 𝐁𝐥𝐨𝐜𝐤 𝐭𝐡𝐞𝐦 𝐟𝐚𝐤𝐞 𝐟𝐫𝐢𝐞𝐧𝐝𝐬\n\n𝟔 𝐊𝐢𝐥𝐥➣ 𝐊𝐢𝐥𝐥𝐬 𝐠𝐫𝐨𝐮𝐩 𝐢𝐧 𝐬𝐞𝐜𝐨𝐧𝐝𝐬\n\n𝟕 𝐔𝐧𝐛𝐥𝐨𝐜𝐤➣ 𝐆𝐢𝐯𝐞 𝐭𝐡𝐞𝐦 𝐟𝐚𝐤𝐞 𝐟𝐫𝐢𝐞𝐧𝐝𝐬 𝐚 𝐬𝐞𝐜𝐨𝐧𝐝 𝐜𝐡𝐚𝐧𝐜𝐞\n\n𝟖 𝐒𝐞𝐭𝐯𝐚𝐫➣ 𝐒𝐞𝐭 𝐯𝐚𝐫𝐬 𝐢𝐧 𝐡𝐞𝐫𝐨𝐤𝐮\n\n𝟗 𝐒𝐭𝐢𝐜𝐤𝐞𝐫➣ 𝐂𝐨𝐧𝐯𝐞𝐫𝐭𝐬 𝐚 𝐩𝐡𝐨𝐭𝐨 𝐨𝐫 𝐚 𝐬𝐡𝐨𝐫𝐭 𝐯𝐢𝐝𝐞𝐨 𝐭𝐨 𝐚 𝐬𝐭𝐢𝐜𝐤𝐞𝐫\n\n𝟏𝟎 𝐓𝐨𝐢𝐦𝐠➣ 𝐂𝐨𝐧𝐯𝐞𝐫𝐭𝐬 𝐚 𝐬𝐭𝐢𝐜𝐤𝐞𝐫 𝐭𝐨 𝐚 𝐩𝐡𝐨𝐭𝐨\n\n𝟏𝟏 𝐏𝐥𝐚𝐲➣ 𝐆𝐞𝐭 𝐲𝐨𝐮𝐫 𝐟𝐚𝐯𝐨𝐫𝐢𝐭𝐞 𝐬𝐨𝐧𝐠\n\n𝟏𝟐 𝐖𝐡𝐚𝐭𝐬𝐨𝐧𝐠➣ 𝐠𝐞𝐭 𝐭𝐡𝐞 𝐭𝐢𝐭𝐥𝐞 𝐨𝐟 𝐭𝐡𝐞 𝐬𝐨𝐧𝐠\n\n𝟏𝟑 𝐘𝐭𝐬 ➣ 𝐆𝐞𝐭 𝐘𝐨𝐮𝐓𝐮𝐛𝐞 𝐯𝐢𝐝𝐞𝐨𝐬\n\n𝟏𝟒 𝐌𝐨𝐯𝐢𝐞➣ 𝐆𝐞𝐭 𝐲𝐨𝐮𝐫 𝐟𝐚𝐯𝐨𝐫𝐢𝐭𝐞 𝐦𝐨𝐯𝐢𝐞 𝐝𝐞𝐭𝐚𝐢𝐥𝐬\n\n𝟏𝟓 𝐌𝐢𝐱➣ 𝐂𝐨𝐦𝐛𝐢𝐧𝐞𝐬 +𝟐𝐞𝐦𝐨𝐣𝐢𝐬\n\n𝟏𝟔 𝐀𝐢-𝐢𝐦𝐠➣ 𝐆𝐞𝐭 𝐚𝐧 𝐀𝐢 𝐩𝐡𝐨𝐭𝐨\n\n𝟏𝟕 𝐆𝐩𝐭 ➣ 𝐇𝐞𝐫𝐞 𝐭𝐨 𝐚𝐧𝐬𝐰𝐞𝐫 𝐲𝐨𝐮𝐫 𝐪𝐮𝐞𝐬𝐭𝐢𝐨𝐧𝐬\n\n𝟏𝟖 𝐃𝐩➣ 𝐆𝐞𝐭𝐬 𝐚 𝐩𝐞𝐫𝐬𝐨𝐧 𝐝𝐩\n\n𝟏𝟗 𝐒𝐩𝐞𝐞𝐝 ➣ 𝐂𝐡𝐞𝐜𝐤𝐬 𝐛𝐨𝐭𝐬 𝐬𝐩𝐞𝐞𝐝\n\n𝟐𝟎 𝐀𝐥𝐢𝐯𝐞➣ 𝐂𝐡𝐞𝐜𝐤 𝐰𝐡𝐞𝐭𝐡𝐞𝐫 𝐭𝐡𝐞 𝐛𝐨𝐭 𝐢𝐬 𝐬𝐭𝐢𝐥𝐥 𝐤𝐢𝐜𝐤𝐢𝐧𝐠\n\n𝟐𝟏 𝐑𝐮𝐧𝐭𝐢𝐦𝐞➣ 𝐖𝐡𝐞𝐧 𝐝𝐢𝐝 𝐛𝐨𝐭 𝐬𝐭𝐚𝐫𝐭𝐞𝐝 𝐨𝐩𝐞𝐫𝐚𝐭𝐢𝐧𝐠\n\n𝟐𝟐 𝐒𝐜𝐫𝐢𝐩𝐭➣ 𝐆𝐞𝐭 𝐛𝐨𝐭 𝐬𝐜𝐫𝐢𝐩𝐭\n\n𝟐𝟑 𝐎𝐰𝐧𝐞𝐫  ➣ 𝐆𝐞𝐭 𝐨𝐰𝐧𝐞𝐫(𝐬) 𝐜𝐨𝐧𝐭𝐚𝐜𝐭\n\n𝟐𝟒 𝐕𝐚𝐫𝐬 ➣ 𝐒𝐞𝐞 𝐚𝐥𝐥 𝐯𝐚𝐫𝐢𝐚𝐛𝐥𝐞𝐬\n\n𝟐𝟓 𝐏𝐫𝐨𝐦𝐨𝐭𝐞➣ 𝐆𝐢𝐯𝐞𝐬 𝐨𝐧𝐞 𝐚𝐝𝐦𝐢𝐧 𝐫𝐨𝐥𝐞\n\n𝟐𝟔 𝐃𝐞𝐦𝐨𝐭𝐞➣ 𝐃𝐞𝐦𝐨𝐭𝐞𝐬 𝐟𝐫𝐨𝐦 𝐠𝐫𝐨𝐮𝐩 𝐚𝐝𝐦𝐢𝐧 𝐭𝐨 𝐚 𝐦𝐞𝐦𝐛𝐞𝐫\n\n𝟐𝟕 𝐃𝐞𝐥𝐞𝐭𝐞➣ 𝐃𝐞𝐥𝐞𝐭𝐞 𝐚 𝐦𝐞𝐬𝐬𝐚𝐠𝐞\n\n𝟐𝟖 𝐑𝐞𝐦𝐨𝐯𝐞/𝐤𝐢𝐜𝐤➣ 𝐊𝐢𝐜𝐤 𝐭𝐡𝐚𝐭 𝐭𝐞𝐫𝐫𝐨𝐫𝐢𝐬𝐭 𝐟𝐫𝐨𝐦 𝐚 𝐠𝐫𝐨𝐮𝐩\n\n𝟐𝟗 𝐅𝐨𝐫𝐞𝐢𝐠𝐧𝐞𝐫𝐬➣ 𝐆𝐞𝐭 𝐟𝐨𝐫𝐞𝐢𝐠𝐧 𝐧𝐮𝐦𝐛𝐞𝐫𝐬\n\n𝟑𝟎 𝐂𝐥𝐨𝐬𝐞➣ 𝐓𝐢𝐦𝐞 𝐟𝐨𝐫 𝐠𝐫𝐨𝐮𝐩 𝐦𝐞𝐦𝐛𝐞𝐫𝐬 𝐭𝐨 𝐭𝐚𝐤𝐞 𝐚 𝐛𝐫𝐞𝐚𝐤 𝐨𝐧𝐥𝐲 𝐚𝐝𝐦𝐢𝐧𝐬 𝐜𝐚𝐧 𝐜𝐡𝐚𝐭\n\n𝟑𝟏 𝐎𝐩𝐞𝐧 ➣ 𝐄𝐯𝐞𝐫𝐲𝐨𝐧𝐞 𝐜𝐚𝐧 𝐜𝐡𝐚𝐭 𝐢𝐧 𝐚 𝐠𝐫𝐨𝐮𝐩\n\n𝟑𝟐 𝐈𝐜𝐨𝐧➣ 𝐂𝐡𝐚𝐧𝐠𝐞 𝐠𝐫𝐨𝐮𝐩 𝐢𝐜𝐨𝐧\n\n𝟑𝟑 𝐒𝐮𝐛𝐣𝐞𝐜𝐭➣ 𝐂𝐡𝐚𝐧𝐠𝐞 𝐠𝐫𝐨𝐮𝐩 𝐬𝐮𝐛𝐣𝐞𝐜𝐭\n\n𝟑𝟒 𝐃𝐞𝐬𝐜➣ 𝐆𝐞𝐭 𝐠𝐫𝐨𝐮𝐩 𝐝𝐞𝐬𝐜𝐫𝐢𝐩𝐭𝐢𝐨𝐧\n\n𝟑𝟓 𝐋𝐞𝐚𝐯𝐞➣ 𝐓𝐡𝐞 𝐠𝐫𝐨𝐮𝐩 𝐢𝐬 𝐛𝐨𝐫𝐢𝐧𝐠 ,𝐭𝐢𝐦𝐞 𝐟𝐨𝐫 𝐛𝐨𝐭 𝐭𝐨 𝐥𝐞𝐚𝐯𝐞\n\n𝟑𝟔 𝐓𝐚𝐠𝐚𝐥𝐥 ➣ 𝐓𝐚𝐠 𝐞𝐯𝐞𝐫𝐲𝐨𝐧𝐞 𝐢𝐧 𝐚 𝐠𝐫𝐨𝐮𝐩 𝐜𝐡𝐚𝐭\n\n𝟑𝟕 𝐇𝐢𝐝𝐞𝐭𝐚𝐠➣ 𝐀𝐭𝐭𝐞𝐧𝐭𝐢𝐨𝐧! 𝐀𝐭𝐭𝐞𝐧𝐭𝐢𝐨𝐧! 𝐬𝐨𝐦𝐞𝐨𝐧𝐞 𝐡𝐚𝐬 𝐬𝐨𝐦𝐞𝐭𝐡𝐢𝐧𝐠 𝐭𝐨 𝐬𝐚𝐲\n\n𝟑𝟖 𝐑𝐞𝐯𝐨𝐤𝐞 ➣ 𝐑𝐞𝐬𝐞𝐭 𝐠𝐫𝐨𝐮𝐩 𝐥𝐢𝐧𝐤`
reply(vaa)
break;

//========================================================================================================================//                  
case 'vv':
case 'viewonce': {
    try {
        // 1. Check if the message is a view-once message
        let q = m.quoted ? m.quoted : m;
        let type = Object.keys(q.message || {})[0];
        
        if (!q.message[type].viewOnce) {
            return m.reply("Please reply to a view-once message.");
        }

        // 2. Extract the actual media content
        let mediaContent = q.message[type].message;
        let mediaType = Object.keys(mediaContent)[0];
        
        // 3. Download the media using the standard Baileys method
        const stream = await downloadContentFromMessage(
            mediaContent[mediaType],
            mediaType.replace('Message', '')
        );
        
        let buffer = Buffer.from([]);
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk]);
        }

        // 4. Send the media back to the user
        if (/image/.test(mediaType)) {
            await client.sendMessage(m.chat, { image: buffer, caption: "Success" }, { quoted: m });
        } else if (/video/.test(mediaType)) {
            await client.sendMessage(m.chat, { video: buffer, caption: "Success" }, { quoted: m });
        }
    } catch (err) {
        logError('VV', err);
        m.reply("Failed to download View Once media.");
    }
    break;
}

//========================================================================================================================//                  
            case "alaa": 
case "wiih": 
case "waah": 
case "ehee": 
case "vv2": 
case "mmmh": {
    try {
        if (!m.quoted) return m.reply("Please reply to a media or view-once message.");

        // 1. Correctly extract the message content
        // We use normalizeMessageContent to handle viewOnce/ephemeral wrappers automatically
        const { normalizeMessageContent } = require('@whiskeysockets/baileys');
        const quotedMsg = normalizeMessageContent(m.quoted.message);
        
        // 2. Identify the media type
        const type = Object.keys(quotedMsg)[0];
        const media = quotedMsg[type];

        if (!media || !(/image|video|audio|sticker|document/.test(type))) {
            return m.reply("The replied message does not contain supported media.");
        }

        // 3. Download the media stream
        // This is the native way your library handles downloads
        const stream = await downloadContentFromMessage(
            media,
            type.replace('Message', '')
        );

        // 4. Convert stream to Buffer
        let buffer = Buffer.from([]);
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk]);
        }

        const caption = media.caption || "No Caption";
        const finalCaption = `✨ *KING M is alive!* ✨\n\n${caption}`;

        // 5. Send to your own ID (private) as requested
        if (/image/.test(type)) {
            await client.sendMessage(client.user.id, { image: buffer, caption: finalCaption }, { quoted: m });
        } else if (/video/.test(type)) {
            await client.sendMessage(client.user.id, { video: buffer, caption: finalCaption }, { quoted: m });
        } else {
            // For audio/stickers/docs
            await client.sendMessage(client.user.id, { [type.replace('Message', '')]: buffer }, { quoted: m });
        }

    } catch (err) {
        // Use the safe logError fix we discussed to prevent crashes
        if (typeof logError === 'function') {
            logError('VV2', err);
        } else {
            console.error(err);
        }
        m.reply("Failed to process media. Ensure the media hasn't expired.");
    }
}
break;

//========================================================================================================================//                  
    case 'take': {
const { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter');

if(!msgR) { m.reply('Quote an image, a short video or a sticker to change watermark.') ; return } ;

let media;
if (msgR.imageMessage) {
     media = msgR.imageMessage
  } else if(msgR.videoMessage) {
media = msgR.videoMessage
  } 
  else if (msgR.stickerMessage) {
    media = msgR.stickerMessage ;
  } else {
    m.reply('This is neither a sticker, image nor a video...'); return
  } ;

var result = await client.downloadAndSaveMediaMessage(media);

let stickerResult = new Sticker(result, {
            pack: pushname,
            author: pushname,
            type: StickerTypes.FULL,
            categories: ["🤩", "🎉"],
            id: "12345",
            quality: 70,
            background: "transparent",
          });
const Buffer = await stickerResult.toBuffer();
          client.sendMessage(m.chat, { sticker: Buffer }, { quoted: m });

}
break;

//========================================================================================================================//      
case 'ytsearch':
    case 'yts': {
        if (!text) {
            reply('Provide a search term!\E.g: Alan walker alone')
            return;
        }
        const term = text;
        const {
            videos
        } = await yts(term);
        if (!videos || videos.length <= 0) {
            reply(`No Matching videos found for : *${term}*!!`)
            return;
        }
        const length = videos.length < 10 ? videos.length : 10;
        let tex = `YouTube Search\n🔍 Query ~> ${term}\n\n`;
        for (let i = 0; i < length; i++) {
            tex += `Link ~> ${videos[i].url}\nChannel ~> ${videos[i].author.name}\nTitle ~> ${videos[i].title}\n\n`;
        }
        reply(tex)
        return;
    }
    break;

//========================================================================================================================//                  
case "ytmp3": case "yta": {
const ytSearch = require("yt-search");
const fetch = require('node-fetch');
try {

if (!text) return m.reply("𝗣𝗿𝗼𝘃𝗶𝗱𝗲 𝗮 𝘃𝗮𝗹𝗶𝗱 𝗬𝗼𝘂𝘁𝘂𝗯𝗲 𝗹𝗶𝗻𝗸!")

        let urls = text.match(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch\?v=|v\/|embed\/|shorts\/|playlist\?list=)?)([a-zA-Z0-9_-]{11})/gi);
        if (!urls) return m.reply('𝗧𝗵𝗶𝘀 𝗶𝘀 𝗻𝗼𝘁 𝗮 𝗬𝗼𝘂𝘁𝘂𝗯𝗲 𝗟𝗶𝗻𝗸');
        let urlIndex = parseInt(text) - 1;
        if (urlIndex < 0 || urlIndex >= urls.length)
                return m.reply('𝗜𝗻𝘃𝗮𝗹𝗶𝗱 𝗟𝗶𝗻𝗸.');

        let search = await yts(text);
    let link = search.all[0].url;

    const apis = [
      `https://apiskeith.vercel.app/download/ytmp3?url=${link}`,
      `https://apis.davidcyriltech.my.id/youtube/mp3?url=${link}`,
      `https://api.ryzendesu.vip/api/downloader/ytmp3?url=${link}`,
      `https://api.dreaded.site/api/ytdl/audio?url=${link}`
       ];

    for (const api of apis) {
      try {
        let data = await fetchJson(api);

        // Checking if the API response is successful
        if (data.status === 200 || data.success) {
          let videoUrl = data.result?.downloadUrl || data.url;
          let outputFileName = `${search.all[0].title.replace(/[^a-zA-Z0-9 ]/g, "")}.mp3`;
          let outputPath = path.join(__dirname, outputFileName);

          const response = await axios({
            url: videoUrl,
            method: "GET",
            responseType: "stream"
          });

          if (response.status !== 200) {
            m.reply("sorry but the API endpoint didn't respond correctly. Try again later.");
            continue;
          }
                ffmpeg(response.data)
            .toFormat("mp3")
            .save(outputPath)
            .on("end", async () => {
              await client.sendMessage(
                m.chat,
                {
                  document: { url: outputPath },
                  mimetype: "audio/mp3",
                  caption: "𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳𝙴𝙳  𝙱𝚈 KING M",
                  fileName: outputFileName,
                },
                { quoted: m }
              );
              fs.unlinkSync(outputPath);
            })
            .on("error", (err) => {
              m.reply("Download failed\n" + err.message);
            });

          return;
        }
      } catch (e) {
        // Continue to the next API if one fails
        continue;
      }
   }
    m.reply("An error occurred. All APIs might be down or unable to process the request.");
  } catch (error) {
    m.reply("Download failed\n" + error.message);
  }
 }
  break;

//========================================================================================================================//                  
case 'ytmp4':
case "ytv": {
        try {

if (!text) return m.reply("𝗣𝗿𝗼𝘃𝗶𝗱𝗲 𝗮 𝘃𝗮𝗹𝗶𝗱 𝗬𝗼𝘂𝗧𝘂𝗯𝗲 𝗹𝗶𝗻𝗸!")

        let urls = text.match(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch\?v=|v\/|embed\/|shorts\/|playlist\?list=)?)([a-zA-Z0-9_-]{11})/gi);
        if (!urls) return m.reply('𝗧𝗵𝗶𝘀 𝗶𝘀 𝗻𝗼𝘁 𝗮 𝗬𝗼𝘂𝗧𝘂𝗯𝗲 𝗹𝗶𝗻𝗸');
        let urlIndex = parseInt(text) - 1;
        if (urlIndex < 0 || urlIndex >= urls.length)
                return m.reply('𝗜𝗻𝘃𝗮𝗹𝗶𝗱 𝗹𝗶𝗻𝗸.');

        let search = await yts(text);
    if (!search.all.length) {
      return reply(client, m, "No results found for your query.");
    }
    let link = search.all[0].url; 

    const apiUrl = `https://apiskeith.vercel.app/download/dlmp3?url=${link}`;

    let response = await fetch(apiUrl);
    let data = await response.json();

    if (data.status && data.result) {
      const videoData = {
        title: data.result.title,
        downloadUrl: data.result.downloadUrl,
        thumbnail: search.all[0].thumbnail,
        format: data.result.format,
        quality: data.result.quality,
      };

      await client.sendMessage(
        m.chat,
        {
          video: { url: videoData.downloadUrl },
          mimetype: "video/mp4",
          caption: "𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳𝙴𝙳  𝙱𝚈 𝙿𝙴𝙰𝙲𝙴 𝙷𝚄𝙱",
        },
        { quoted: m }
      );

      return;
    } else {
      
      return reply("Unable to fetch the video. Please try again later.");
    }
  } catch (error) {
 
    return reply(`An error occurred: ${error.message}`);
  }
};
  break;

//========================================================================================================================//                  
   case "ping":
case "speed": {
    const start = performance.now();

    // Send initial message
    let { key } = await client.sendMessage(m.chat, { text: "King Speed" });

    const end = performance.now();
    const Rspeed = end - start;
    const formattedSpeed = formatSpeed(Rspeed);

    // Edit so speed is next to text
    await client.sendMessage(m.chat, { text: `🔶Pong Speed ${formattedSpeed}`, edit: key });
}
break;

//========================================================================================================================//                  
  case "uptime": { 
                 m.reply (`${runtime(process.uptime())}`) 
 } 
 break;

//========================================================================================================================//                  
        case 'runtime':
                let peace = `  ${runtime(process.uptime())}`
                client.sendMessage(m.chat, {
                    text: peace,
                    contextInfo: {
                        externalAdReply: {
                            showAdAttribution: true,
                            title: 'KING M',
                            body: 'https://github.com/sesco001/KING-MD',
                            thumbnailUrl: '',
                            sourceUrl: 'https://github.com/sesco001/KING-MD',
                            mediaType: 1,
                            renderLargerThumbnail: true
                        }
                    }
                }, {
                    quoted: m
                })
                break;

//========================================================================================================================//                  
  case "apk":
      case "app":{
          if (!text) return reply("Where is the app name?");
        let kyuu = await fetchJson (`https://bk9.fun/search/apk?q=${text}`);
        let tylor = await fetchJson (`https://bk9.fun/download/apk?id=${kyuu.BK9[0].id}`);
         await client.sendMessage(
              m.chat,
              {
                document: { url: tylor.BK9.dllink },
                fileName: tylor.BK9.name,
                mimetype: "application/vnd.android.package-archive",
                contextInfo: {
        externalAdReply: {
          title: `KING M`,
          body: `${tylor.BK9.name}`,
          thumbnailUrl: `${tylor.BK9.icon}`,
          sourceUrl: `${tylor.BK9.dllink}`,
          mediaType: 2,
          showAdAttribution: true,
          renderLargerThumbnail: false
        }
      }
    }, { quoted: m });
          }
      break;

//========================================================================================================================//                  
          case "mix": {
const { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter');

const axios = require("axios");
if (!text) return m.reply("No emojis provided ? ")

  const emojis = text.split('+');

  if (emojis.length !== 2) {
    m.reply("Specify the emojis and separate with '+'");
    return;
  }

  const emoji1 = emojis[0].trim();
  const emoji2 = emojis[1].trim();

  try {
    const axios = require('axios');
    const response = await axios.get(`https://levanter.onrender.com/emix?q=${emoji1}${emoji2}`);

    if (response.data.status === true) {
    
      let stickerMess = new Sticker(response.data.result, {
        pack: botname,
        type: StickerTypes.CROPPED,
        categories: ["🤩", "🎉"],
        id: "12345",
        quality: 70,
        background: "transparent",
      });
      const stickerBuffer2 = await stickerMess.toBuffer();
      client.sendMessage(m.chat, { sticker: stickerBuffer2 }, { quoted: m });

    } else {
      m.reply("Unable to create emoji mix.");
    }
  } catch (error) {
    m.reply("An error occurred while creating the emoji mix." + error );
  }
      }
          break;

//========================================================================================================================//                  
          case "lyrics": {
                      const fetch = require('node-fetch');
 const apiUrl = `https://api.dreaded.site/api/lyrics?title=${encodeURIComponent(text)}`;

    try {
        if (!text) return m.reply("Provide a song name!");

        const data = await fetchJson(apiUrl);

        if (!data.success || !data.result || !data.result.lyrics) {
            return m.reply(`Sorry, I couldn't find any lyrics for "${text}".`);
        }

        const { title, artist, link, thumb, lyrics } = data.result;

        const imageUrl = thumb || "https://i.imgur.com/Cgte666.jpeg";

        const imageBuffer = await fetch(imageUrl)
            .then(res => res.buffer())
            .catch(err => {
                console.error('Error fetching image:', err);
                return null;
            });

        if (!imageBuffer) {
            return m.reply("An error occurred while fetching the image.");
        }

        const caption = `**Title**: ${title}\n**Artist**: ${artist}\n\n${lyrics}`;

        await client.sendMessage(
            m.chat,
            {
                image: imageBuffer,
                caption: caption
            },
            { quoted: m }
        );
    } catch (error) {
        console.error(error);
        m.reply(`An error occurred while fetching the lyrics for "${text}".`);
    }
      }
        break;

//========================================================================================================================//                  
        case "toimg": case "photo": { 
    if (!quoted) throw 'Tag a static video with the command!'; 
    if (!/webp/.test(mime)) throw `Tag a sticker with ${prefix + command}`; 
  
    let media = await client.downloadAndSaveMediaMessage(quoted); 
    let mokaya = await getRandom('.png'); 
    exec(`ffmpeg -i ${media} ${mokaya}`, (err) => { 
   fs.unlinkSync(media); 
   if (err) throw err 
   let buffer = fs.readFileSync(mokaya); 
   client.sendMessage(m.chat, { image: buffer, caption: `ᴄᴏɴᴠᴇʀᴛᴇᴅ ʙʏ ᴘᴇᴀᴄᴇ ʜᴜʙ`}, { quoted: m }) 
   fs.unlinkSync(mokaya); 
    }); 
    } 
     break;

//========================================================================================================================//                  
   case "movie": 
             if (!text) return reply(`Provide a series or movie name.`);  
              let fids = await axios.get(`http://www.omdbapi.com/?apikey=742b2d09&t=${text}&plot=full`);  
              let imdbt = "";  
              console.log(fids.data)  
              imdbt += "⚍⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚍\n" + " ``` IMDB MOVIE SEARCH```\n" + "⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎\n";  
              imdbt += "🎬Title      : " + fids.data.Title + "\n";  
              imdbt += "📅Year       : " + fids.data.Year + "\n";  
              imdbt += "⭐Rated      : " + fids.data.Rated + "\n";  
              imdbt += "📆Released   : " + fids.data.Released + "\n";  
              imdbt += "⏳Runtime    : " + fids.data.Runtime + "\n";  
              imdbt += "🌀Genre      : " + fids.data.Genre + "\n";  
              imdbt += "👨🏻‍💻Director   : " + fids.data.Director + "\n";  
              imdbt += "✍Writer     : " + fids.data.Writer + "\n";  
              imdbt += "👨Actors     : " + fids.data.Actors + "\n";  
              imdbt += "📃Plot       : " + fids.data.Plot + "\n";  
              imdbt += "🌐Language   : " + fids.data.Language + "\n";  
              imdbt += "🌍Country    : " + fids.data.Country + "\n";  
              imdbt += "🎖️Awards     : " + fids.data.Awards + "\n";  
              imdbt += "📦BoxOffice  : " + fids.data.BoxOffice + "\n";  
              imdbt += "🏙️Production : " + fids.data.Production + "\n";  
              imdbt += "🌟imdbRating : " + fids.data.imdbRating + "\n";  
              imdbt += "❎imdbVotes  : " + fids.data.imdbVotes + "";  
             client.sendMessage(from, {  
                  image: {  
                      url: fids.data.Poster,  
                  },  
                  caption: imdbt,  
              },  
                 { quoted: m }); 
  
                       break;
                      
//========================================================================================================================//                                   
  case "linkgroup": case "link": { 
                 if (!m.isGroup) throw group; 
                 if (!isBotAdmin) throw botAdmin; 
                 let response = await client.groupInviteCode(m.chat); 
                 client.sendText(m.chat, `https://chat.whatsapp.com/${response}\n\nGroup link for  ${groupMetadata.subject}`, m, { detectLink: true }); 
             } 
          break;
       
//========================================================================================================================//
          case 'botpp': { 
    if (!Owner) throw NotOwner; 
    if (!quoted) throw `Tag an image you want to be the bot's profile picture with ${prefix + command}`; 
    if (!/image/.test(mime)) throw `Tag an image you want to be the bot's profile picture with ${prefix + command}`; 
    if (/webp/.test(mime)) throw `Tag an image you want to be the bot's profile picture with ${prefix + command}`; 
    let media = await client.downloadAndSaveMediaMessage(quoted);
                
                    await client.updateProfilePicture(botNumber, { url: media }).catch((err) => fs.unlinkSync(media)); 
    reply `Bot's profile picture has been successfully updated✅️`; 
          }
    break;

//========================================================================================================================//                  
          case 'broadcast': { 
         if (!Owner) throw NotOwner; 
         if (!text) { 
             reply("Provide a message to cats!") 
             return; 
         } 
         let getGroups = await client.groupFetchAllParticipating() 
         let groups = Object.entries(getGroups) 
             .slice(0) 
             .map(entry => entry[1]) 
         let res = groups.map(v => v.id) 
         reply(` Broadcasting in ${res.length} Group Chat, in ${res.length * 1.5} seconds`) 
         for (let i of res) { 
             let txt = `MAKA 𝗕𝗥𝗢𝗔𝗗𝗖𝗔𝗦𝗧\n\n🀄 Message: ${text}\n\nAuthor: ${pushname}` 
             await client.sendMessage(i, { 
                 image: { 
                     url: menulink
                 }, 
                 caption: `${txt}` 
             }) 
         } 
         reply(`Broadcasted to ${res.length} Groups.`) 
     } 
 break;

//========================================================================================================================//                  
 case "gemini": {
    try {
        if (!text) return m.reply("This is Peace, an AI using Gemini APIs to process text, provide yr query");
    
        const { default: Gemini } = await import('gemini-ai');

        const gemini = new Gemini("AIzaSyDJUtskTG-MvQdlT4tNE319zBqLMFei8nQ");
        const chat = gemini.createChat();

        const res = await chat.ask(text);

        await m.reply(res);
    } catch (e) {
        m.reply("I am unable to generate responses\n\n" + e);
    }
 }
 break;

//========================================================================================================================//                  
        case "setvar": 
 if (!Owner) throw NotOwner;  
 if(!text.split('=')[1]) return reply('Incorrect Usage:\nProvide the key and value correctly\nExample: setvar AUTOVIEW_STATUS=TRUE')  
 const herok = new Heroku({  
            token: herokuapi,  
          });  
          let baseURI = "/apps/" + appname;  
 await herok.patch(baseURI + "/config-vars", {  
            body: {  
                    [text.split('=')[0]]: text.split('=')[1],  
            },  
 });  
          await reply(`✅ The variable ${text.split('=')[0]} = ${text.split('=')[1]} has been set Successfuly.\nWait 20s for changes to effect!`);  
  
 break;
                      
//========================================================================================================================//    
case "dlt":
case "dil": {
    if (!m.quoted) throw "No message quoted for deletion";

    const { id: quotedId, sender: quotedSender, isBaileys } = m.quoted;
    if (isBaileys && quotedSender.split('@')[0] === client.user.id.split('@')[0]) {
        throw "I cannot delete my own message.";
    }

    // Delete quoted message
    await client.sendMessage(m.chat, {
        delete: {
            remoteJid: m.chat,
            fromMe: false,
            id: quotedId,
            participant: quotedSender
        }
    });

    // Delete the command message itself
    await client.sendMessage(m.chat, {
        delete: {
            remoteJid: m.chat,
            fromMe: true,
            id: m.key.id,
            participant: m.key.participant || m.sender
        }
    });
}
break;
 
//========================================================================================================================//
case "block": {
    if (!Owner) throw NotOwner;
    if (!m.quoted && !m.mentionedJid[0] && !text) throw "*🔖 Please tag someone or enter a phone number!*";
    
    let users = m.mentionedJid[0] 
        ? m.mentionedJid[0] 
        : m.quoted 
            ? m.quoted.sender 
            : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    
    if (users == "254752818245@s.whatsapp.net") return m.reply("*😠 I cannot block my Owner!*");
    if (users == client.decodeJid(client.user.id)) return m.reply("*🤦 I cannot block myself!*");
    
    await client.updateBlockStatus(users, 'block');
    m.reply("*✅ Blocked successfully!*");
}
break;

//========================================================================================================================//                  
 case "unblock": {
    if (!Owner) throw NotOwner;
    if (!m.quoted && !m.mentionedJid[0] && !text) throw "*🔖 Please tag someone or enter a phone number!*";
    
    let users = m.mentionedJid[0] 
        ? m.mentionedJid[0] 
        : m.quoted 
            ? m.quoted.sender 
            : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    
    await client.updateBlockStatus(users, 'unblock');
    m.reply("*✅ Unblocked successfully!*");
}
break;

case "blocklist": {
    if (!Owner) throw NotOwner;
    
    const blockedContacts = await client.fetchBlocklist();
    
    if (!blockedContacts || blockedContacts.length === 0) {
        return m.reply("*📭 The block list is currently empty!*");
    }

    let blockedList = "*📋 Blocked Contacts List:*\n\n";
    blockedContacts.forEach((contact, index) => {
        const number = contact.split('@')[0];
        blockedList += `*${index + 1}.* ${number}\n`;
    });

    blockedList += `\n*✅ Total: ${blockedContacts.length} contact(s)*`;
    
    m.reply(blockedList);
}
break;
//========================================================================================================================//                  
          case 'join': { 
                 if (!Owner) throw NotOwner
                 if (!text) return reply("provide a valid group link") 
                 let result = args[0].split('https://chat.whatsapp.com/')[1] 
                 await client.groupAcceptInvite(result).then((res) =>  reply(jsonformat(res))).catch((err) =>reply(`Link has problem.`)) 
  
             }  
               break;

//========================================================================================================================//                  
 case "enc": case "encrypte": {
        const Obf = require("javascript-obfuscator");

    // Check if the quoted message has text
    if (m.quoted && m.quoted.text) {
        const forq = m.quoted.text;

        // Obfuscate the JavaScript code
        const obfuscationResult = Obf.obfuscate(forq, {
            compact: true,
            controlFlowFlattening: true,
            controlFlowFlatteningThreshold: 1,
            numbersToExpressions: true,
            simplify: true,
            stringArrayShuffle: true,
            splitStrings: true,
            stringArrayThreshold: 1
        });

        console.log("Successfully encrypted the code✅️");
        m.reply(obfuscationResult.getObfuscatedCode());
    } else {
        m.reply("Quote/Tag a valid JavaScript code to encrypt!");
    }
}
        break;

//========================================================================================================================//                  

//========================================================================================================================//                  
              case 'gcprofile': {
 function convertTimestamp(timestamp) {
  const d = new Date(timestamp * 1000);
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return {
    date: d.getDate(),
    month: new Intl.DateTimeFormat('en-US', { month: 'long' }).format(d),
    year: d.getFullYear(),
    day: daysOfWeek[d.getUTCDay()],
    time: `${d.getUTCHours()}:${d.getUTCMinutes()}:${d.getUTCSeconds()}`
  }
}

if (!m.isGroup) return m.reply("This command is meant for groups");

let info = await client.groupMetadata(m.chat);
let ts = await convertTimestamp(info.creation);

try {
        pp = await client.profilePictureUrl(chat, 'image');
      } catch {
        pp = 'https://files.catbox.moe/duv8ac.jpg';
      }

await client.sendMessage(m.chat, { image: { url: pp }, 
          caption: `_Name_ : *${info.subject}*\n\n_ID_ : *${info.id}*\n\n_Group owner_ : ${'@'+info.owner.split('@')[0]} || 'No Creator'\n\n_Group created_ : *${ts.day}, ${ts.date} ${ts.month} ${ts.year}, ${ts.time}*\n\n_Participants_ : *${info.size}*\n_Members_ : *${info.participants.filter((p) => p.admin == null).length}*\n\n_Admins_ : *${Number(info.participants.length - info.participants.filter((p) => p.admin == null).length)}*\n\n_Who can send message_ : *${info.announce == true ? 'Admins' : 'Everyone'}*\n\n_Who can edit group info_ : *${info.restrict == true ? 'Admins' : 'Everyone'}*\n\n_Who can add participants_ : *${info.memberAddMode == true ? 'Everyone' : 'Admins'}*`
        }, {quoted: m })
}
         break;

//========================================================================================================================//                  
   case 'tovideo': case 'mp4': case 'tovid': {
                        
                if (!quoted) return reply('Reply to Sticker')
                if (!/webp/.test(mime)) return reply(`reply sticker with caption *${prefix + command}*`)
                
        let media = await client.downloadAndSaveMediaMessage(quoted)
                let webpToMp4 = await webp2mp4File(media)
                await client.sendMessage(m.chat, { video: { url: webpToMp4.result, caption: 'Convert Webp To Video' } }, { quoted: m })
                await fs.unlinkSync(media)
            }
            break;
//========================================================================================================================//
case "addsudo":
  if (!isOwner) return reply("Only bot owner can add sudo owners.");
  if (!args[0]) return reply("Please provide a number.");
  const numberToAdd = args[0].replace(/[^0-9]/g, "");
  if (numberToAdd === ownerNumber || numberToAdd === "254752818245") {
    return reply("This user is already an owner.");
  }
  await addSudoOwner(numberToAdd);
  reply(`✅ ${args[0]} added as sudo owner.`);
  break;

case "remsudo":
  if (!isOwner) return reply("Only bot owner can remove sudo owners.");
  if (!args[0]) return reply("Please provide a number.");
  const numberToRemove = args[0].replace(/[^0-9]/g, "");
  if (numberToRemove === ownerNumber || numberToRemove === "254752818245") {
    return reply("Cannot remove main owners.");
  }
  await removeSudoOwner(numberToRemove);
  reply(`🗑️ ${args[0]} removed from sudo owners.`);
  break;

case "listsudo":
  {
    // Allow both owner and sudo users to see the list
    if (!isPrivileged) return reply("Only privileged users can see sudo list.");
    
    const sudos = await getSudoOwners();
    if (sudos.length === 0) return reply("No sudo owners set.");
    let text = "👑 *Sudo Owners:*\n";
    sudos.forEach((num, i) => text += `\n${i + 1}. ${num}`);
    reply(text);
  }
  break;
//========================================================================================================================//        
        default: {
          if (cmd && budy.toLowerCase() != undefined) {
            if (m.chat.endsWith("broadcast")) return;
            if (m.isBaileys) return;
            if (!budy.toLowerCase()) return;
            logError(`${prefix}${command}`);
          }
        }
      }
    }
  } catch (err) {
    m.reply(util.format(err));
  }
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  logInfo(`File updated: ${__filename}`);
  delete require.cache[file];
  require(file);
});


 
  
