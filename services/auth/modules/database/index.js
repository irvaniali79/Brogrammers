const DB = require('./database');
const RedisDriver = require('./redis');

module.exports = {
    DB,
    Redis:RedisDriver
}