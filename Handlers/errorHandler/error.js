function notFound(req,res,e){
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify(e.message));
}



module.exports = {notFound};
