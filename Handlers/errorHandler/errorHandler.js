
function errorHandler(req,res,e){
    const Errors = {
        '404':()=>{
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({
                message:"Page not found"
            }));
        },
        '401':()=>{
            res.writeHead(401, { "Content-Type": "application/json" });
            res.end(JSON.stringify({
                message:"Unauthorize request"
            }));
        },
        '429':()=>{
            res.writeHead(429, { "Content-Type": "application/json" });
            res.end(JSON.stringify({
                message:"Too many request"
            }));
        },
        '500':()=>{
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({
                message:"Internal server error"
            }));
        },
        'default':()=>{
            res.writeHead(500, { "Content-Type": "application/json" });
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
