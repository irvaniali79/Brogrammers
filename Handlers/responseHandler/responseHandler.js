

function responseHandler(req,res){
    const responses = {
        'image/svg':()=>{
            res.writeHead(res.status, { "Content-Type": res.type });
            res.end(res.response);
        },
        'pipe':()=>{
            res.response.pipe(res);
        },
        'default':()=>{
            res.writeHead(res.status, { "Content-Type": "application/json" });
            res.end(res.response);
        }

    }    
    if(!(res.type in responses)){
        responses['default']();
    }
    responses[res.type]();
    return;
}

module.exports = responseHandler;

