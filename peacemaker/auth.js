const fs = require('fs');
const session = process.env.SESSION || '';

async function authenticationn() {
  const credPath = './session/creds.json';
  try {
    if (!session || session === 'YOUR_SESSION_ID_HERE' || session === '') {
      if (!fs.existsSync(credPath)) {
        console.log('No SESSION set. Bot will show QR code for pairing.');
      } else {
        console.log('Using existing session credentials.');
      }
      return;
    }

    let decoded;
    try {
      decoded = atob(session);
    } catch (e) {
      console.log('Session is invalid (bad base64). Using existing creds if available.');
      return;
    }

    // Always write the session from env var so updates to the secret take effect
    fs.mkdirSync('./session', { recursive: true });
    fs.writeFileSync(credPath, decoded, 'utf8');
    console.log('Session loaded from SECRET.');
  } catch (err) {
    console.log('Session error: ' + err.message);
  }
}

module.exports = authenticationn;
