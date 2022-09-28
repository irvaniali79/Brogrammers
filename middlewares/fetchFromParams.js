const qs = require('querystring');

function fetchParamsFromBody(req,res,next){
    
    let body = '';
    req.on('data',(chunk)=>{
      body += chunk;
    });
    req.on('end',()=>{
      const params = {...qs.parse(body)};
      req.params = params;
      next();
    });


}



module.exports = fetchParamsFromBody;
