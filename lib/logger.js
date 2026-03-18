const chalk = require('chalk');
const { botname } = require('../set');

const cyan = chalk.cyan;
const white = chalk.white;
const green = chalk.green;
const yellow = chalk.yellow;
const red = chalk.red;
const gray = chalk.gray;

/**
 * Clean Heroku-style timestamp prefix.
 */
const getLogPrefix = () => {
    const now = new Date().toISOString();
    return gray(`${now} app[web.1]: `);
};

const header = () => getLogPrefix() + cyan(`━━━━━━━━ 〘 ${botname} 〙━━━━━━━━`);
const footer = () => getLogPrefix() + cyan(`☆ 《 ${botname} 》☆`);

/**
 * UNIVERSAL LOG: Use this for anything (Incoming user msgs, system logs, etc.)
 */
function log(content) {
    const prefix = getLogPrefix();
    if (typeof content === 'object') {
        // If it's a message object with properties, format it nicely
        if (content.sender && content.message) {
            console.log(`${prefix}${cyan('[MSG]')} ${white(content.sender)}: ${yellow(content.message)}`);
        } else {
            // If it's just a random object/error, stringify it
            console.log(`${prefix}${white(JSON.stringify(content, null, 2))}`);
        }
    } else {
        // If it's just a string, print it plain
        console.log(`${prefix}${white(content)}`);
    }
}

/**
 * BOT LOG: Keep this for the fancy formatted Bot responses
 */
function logBotResponse({ time, sender, type, message }) {
    console.log(header());
    console.log(getLogPrefix() + cyan('  ▸▸ ') + white('Sent Time: ') + green(time || 'N/A'));
    console.log(getLogPrefix() + cyan('  ▸▸ ') + white('Sender: ') + green(sender || 'N/A'));
    console.log(getLogPrefix() + cyan('  ▸▸ ') + white('Type: ') + green(type || 'N/A'));
    console.log(getLogPrefix() + cyan('  ▸▸ ') + white('Message: ') + yellow(message || 'N/A'));
    console.log(footer());
}

// --- Other utility logs ---
function logSpeed(ms) {
    console.log(getLogPrefix() + cyan(`[SPEED] `) + white(`Bot response speed: `) + green(`${ms}ms`));
}

function logError(command, err) {
    const errMsg = err?.message || err || "Unknown Error";
    console.log(getLogPrefix() + red(`[ERROR] `) + white(`Command: `) + yellow(command) + red(` | ${errMsg}`));
}

function logInfo(msg) {
    console.log(getLogPrefix() + cyan(`[INFO] `) + white(msg));
}

function logSuccess(msg) {
    console.log(getLogPrefix() + green(`[SUCCESS] `) + white(msg));
}

module.exports = { 
    log, 
    logBotResponse, 
    logSpeed, 
    logError, 
    logInfo, 
    logSuccess, 
    header, 
    footer 
};
