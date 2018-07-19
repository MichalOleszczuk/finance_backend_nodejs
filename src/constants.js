const path = require('path');

const EXPRESS_PORT = 3000;
const EXPRESS_HOST = '127.0.0.1';
const LOGS_PATH = path.resolve(__dirname, '../logs');

module.exports = Object.freeze({
    EXPRESS_PORT: EXPRESS_PORT,
    EXPRESS_HOST: EXPRESS_HOST,
    LOGS_PATH: LOGS_PATH
});