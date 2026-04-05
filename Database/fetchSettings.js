// ✅ CORRECT PATH (Since both files are in the Database folder)
const { getSettings } = require('./config'); 

// ── 30-second in-memory settings cache ──────────────────────────────────────
// Prevents hammering PostgreSQL with a DB query on every single WhatsApp message.
let _cache = null;
let _cacheTime = 0;
const CACHE_TTL = 30000; // 30 seconds

async function fetchSettings() {
  const now = Date.now();
  if (_cache && (now - _cacheTime) < CACHE_TTL) {
    return _cache;
  }

  const data = await getSettings();

  _cache = {
    wapresence: data.wapresence,
    autoread: data.autoread,
    mode: data.mode,
    prefix: data.prefix,
    autolike: data.autolike,
    autoview: data.autoview,
    antilink: data.antilink,
    antilinkall: data.antilinkall,
    antidelete: data.antidelete,
    antitag: data.antitag,
    antiforeign: data.antiforeign,
    antibot: data.antibot,
    welcomegoodbye: data.welcomegoodbye,
    autobio: data.autobio,
    autobioText: data.autobioText,
    badword: data.badword,
    gptdm: data.gptdm, 
    anticall: data.anticall, 
    antiedit: data.antiedit,
    antistatus: data.antistatus,
    antistatuslink: data.antistatuslink,
    menuTitle: data.menuTitle,
    antisticker: data.antisticker,
    antigroupmention: data.antigroupmention,
    autolike_emojis: data.autolike_emojis,
    autoreact: data.autoreact
  };
  _cacheTime = now;
  return _cache;
}

// Call this after any setting is changed so next read gets fresh data
fetchSettings.invalidate = function () {
  _cache = null;
  _cacheTime = 0;
};

module.exports = fetchSettings;
