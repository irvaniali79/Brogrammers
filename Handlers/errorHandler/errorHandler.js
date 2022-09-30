const {eventEmitter} = require('../..');
const config = require('../../config');


eventEmitter.on(config.errorHandler.eventName,(req,res,e)=>{
    const Errors = {
        '404':()=>{
            res.writeHead(e.status, { "Content-Type": e.type });
            res.end(res.response);
        },
        'pipe':()=>{
            res.response.pipe(res);
        },
        'default':()=>{
            res.writeHead(res.status, { "Content-Type": res.type });
            res.end(res.response);
        }

    }    
    if(!(e.type in Errors)){
        Errors['default']();
    }
    Errors[e.type]();
    return;
})
