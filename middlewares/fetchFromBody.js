
async function fetchFromBody(req,res,next){


    let body = '';
    req.on('data',(chunk)=>{
      body += chunk;
    });
    req.on('end',()=>{
      
      req.body =  JSON.parse(body);
      return req;

    });

    
}



module.exports = fetchFromBody;
