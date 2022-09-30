
function errorHandler(req,res,e){
    res.writeHead(500, { "Content-Type": "application/json" });

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
};
module.exports = errorHandler;
