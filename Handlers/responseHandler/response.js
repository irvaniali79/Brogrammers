function successjson(req,res,result){
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result));
}


module.exports = {successjson};
