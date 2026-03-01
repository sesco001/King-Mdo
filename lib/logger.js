const chalk = require('chalk');
const { botname } = require('../set');

const cyan = chalk.cyan;
const white = chalk.white;
const green = chalk.green;
const yellow = chalk.yellow;
const red = chalk.red;
const gray = chalk.gray;

const header = () => cyan(`━━━━━━━━ 〘 ${botname} 〙━━━━━━━━`);
const footer = () => cyan(`☆ 《 ${botname} 》☆`);

function logMessage({ time, sender, type, message }) {
    console.log(header());
    console.log(cyan('  ▸▸') + white('Sent Time: ') + green(time));
    console.log(cyan('  ▸▸') + white('Sender: ') + green(sender));
    console.log(cyan('  ▸▸') + white('Type: ') + green(type));
    console.log(cyan('  ▸▸') + white('Message: ') + yellow(message));
    console.log(footer());
}

function logSpeed(ms) {
    console.log(cyan(`[SPEED] `) + white(`Bot response speed: `) + green(`${ms}ms`));
}

function logError(command, err) {
    console.log(red(`[ERROR] `) + white(`Command: `) + yellow(command) + (err ? red(` | ${err}`) : ''));
}

function logInfo(msg) {
    console.log(cyan(`[${botname}] `) + white(msg));
}

function logSuccess(msg) {
    console.log(green(`[${botname}] `) + white(msg));
}

function logWarn(msg) {
    console.log(yellow(`[${botname}] `) + white(msg));
}

function logConnection(msg) {
    console.log(header());
    console.log(green(`  ${msg}`));
    console.log(footer());
}

module.exports = { logMessage, logSpeed, logError, logInfo, logSuccess, logWarn, logConnection, header, footer };
