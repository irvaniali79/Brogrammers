const formidable = require('formidable');

function fetchFileFromFormData(req,res,next){

    const form = formidable({ multiples: true });
    return new Promise(()=>{

      const test = form.parse(req, (err, fields, files) => {
        if (err) {
          res.writeHead(err.httpCode || 400, { 'Content-Type': 'text/plain' });
          res.end(String(err));
          return;
        }
       
        req.fields = fields;
        req.files = files;
        next();
      })
         
    })
      

     
      };
    
     
  



module.exports = fetchFileFromFormData;
