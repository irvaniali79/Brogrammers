const Redis = require('redis');

class RedisDriver {
    constructor(config){
        const redis = Redis.createClient(config.Client);
        redis.connect();
        redis.select(config.selectDB)
        return redis;
    }
}
module.exports = RedisDriver;