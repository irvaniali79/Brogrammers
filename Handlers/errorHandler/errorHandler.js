const {eventEmitter} = require('../..');
const config = require('../../config');


eventEmitter.on(config.errorHandler.eventName,(req,res,e)=>{
    res.writeHead(e.code, { "Content-Type": "application/json" });

    const Errors = {
        404:()=>{
            res.end(JSON.stringify(e.message));
        },
        'default':()=>{
            res.end(JSON.stringify(e.message));
        }

    }    
    if(!(e.code in Errors)){
        Errors['default']();
        return;
    }
    Errors[e.code]();
})
