const {app, eventEmitter, config} = require('..');

eventEmitter.on(config.server.eventName,(req,res)=>{
    app.services.logger.message(`${req.headers.host}-${req.url}-${config.server.eventName}`,error.message,'event');
})

eventEmitter.on('error-catch',(req,res,error)=>{
    app.services.logger.message(error.message,error.stack,'error');
})

