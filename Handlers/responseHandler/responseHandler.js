const {eventEmitter} = require('../..');
const config = require('../../config');
const {successjson} = require('./response');


eventEmitter.on(config.responseHandler.eventName,(req,res,result)=>{
    const responses = {
        'image/svg':()=>{
            res.writeHead(200, { "Content-Type": "image/svg" });
            res.end(JSON.stringify(result));
        },
        'pipe':()=>{
            req.pipe(result);
        }
    }    
    if(res.type!="default"){
        responses[res.type]();
        return;
    }
    successjson(req,res,result);
})

