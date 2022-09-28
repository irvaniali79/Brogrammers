const {eventEmitter} = require('../..');
const config = require('../../config');
const {successjson} = require('./response');

eventEmitter.on(config.responseHandler.eventName,(req,res,result)=>{
    successjson(req,res,result);
})

