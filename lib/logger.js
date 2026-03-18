const chalk = require('chalk');
const { botname } = require('../set');

const cyan = chalk.cyan;
const white = chalk.white;
const green = chalk.green;
const yellow = chalk.yellow;
const red = chalk.red;
const gray = chalk.gray;

const getLogPrefix = () => {
    const now = new Date().toISOString();
    return gray(`${now} app[web.1]: `);
};

const header = () => getLogPrefix() + cyan(`━━━━━━━━ 〘 ${botname} 〙━━━━━━━━`);
const footer = () => getLogPrefix() + cyan(`☆ 《 ${botname} 》☆`);

function log(content) {
    const prefix = getLogPrefix();
    if (typeof content === 'object') {
        if (content.sender && content.message) {
            console.log(`${prefix}${cyan('[MSG]')} ${white(content.sender)}: ${yellow(content.message)}`);
        } else {
            console.log(`${prefix}${white(JSON.stringify(content, null, 2))}`);
        }
    } else {
        console.log(`${prefix}${white(content)}`);
    }
}

function logBotResponse({ time, sender, type, message }) {
    console.log(header());
    console.log(getLogPrefix() + cyan('  ▸▸ ') + white('Sent Time: ') + green(time || 'N/A'));
    console.log(getLogPrefix() + cyan('  ▸▸ ') + white('Sender: ') + green(sender || 'N/A'));
    console.log(getLogPrefix() + cyan('  ▸▸ ') + white('Type: ') + green(type || 'N/A'));
    console.log(getLogPrefix() + cyan('  ▸▸ ') + white('Message: ') + yellow(message || 'N/A'));
    console.log(footer());
}

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

function logWarn(msg) {
    console.log(getLogPrefix() + yellow(`[WARN] `) + white(msg));
}

function logSuccess(msg) {
    console.log(getLogPrefix() + green(`[SUCCESS] `) + white(msg));
}

module.exports = { 
    log, 
    logBotResponse, 
    logMessage: logBotResponse, // Alias to fix peace.js calls
    logSpeed, 
    logError, 
    logInfo, 
    logWarn, 
    logSuccess, 
    header, 
    footer 
};
