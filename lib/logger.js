const chalk = require('chalk');
const { botname } = require('../set');

const cyan = chalk.cyan;
const white = chalk.white;
const green = chalk.green;
const yellow = chalk.yellow;
const red = chalk.red;
const gray = chalk.gray;

// Helper to get the Heroku-style prefix for every line
const getLogPrefix = () => {
    const now = new Date().toISOString();
    return gray(`${now} app[web.1]: `);
};

const header = () => getLogPrefix() + cyan(`━━━━━━━━ 〘 ${botname} 〙━━━━━━━━`);
const footer = () => getLogPrefix() + cyan(`☆ 《 ${botname} 》☆`);

function logMessage({ time, sender, type, message }) {
    console.log(header());
    console.log(getLogPrefix() + cyan('  ▸▸') + white('Sent Time: ') + green(time));
    console.log(getLogPrefix() + cyan('  ▸▸') + white('Sender: ') + green(sender));
    console.log(getLogPrefix() + cyan('  ▸▸') + white('Type: ') + green(type));
    console.log(getLogPrefix() + cyan('  ▸▸') + white('Message: ') + yellow(message));
    console.log(footer());
}

function logSpeed(ms) {
    console.log(getLogPrefix() + cyan(`[SPEED] `) + white(`Bot response speed: `) + green(`${ms}ms`));
}

function logError(command, err) {
    console.log(getLogPrefix() + red(`[ERROR] `) + white(`Command: `) + yellow(command) + (err ? red(` | ${err}`) : ''));
}

function logInfo(msg) {
    console.log(getLogPrefix() + cyan(`[${botname}] `) + white(msg));
}

function logSuccess(msg) {
    console.log(getLogPrefix() + green(`[${botname}] `) + white(msg));
}

function logWarn(msg) {
    console.log(getLogPrefix() + yellow(`[${botname}] `) + white(msg));
}

function logConnection(msg) {
    console.log(header());
    console.log(getLogPrefix() + green(`  ${msg}`));
    console.log(footer());
}

module.exports = { logMessage, logSpeed, logError, logInfo, logSuccess, logWarn, logConnection, header, footer };
