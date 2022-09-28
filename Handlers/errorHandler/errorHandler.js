const {eventEmitter} = require('../..');
const config = require('../../config');
const {notFound} = require('./error');

eventEmitter.on(config.errorHandler.eventName,(req,res,e)=>{
    notFound(req,res,e);
})