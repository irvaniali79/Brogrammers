function fetchQueryStringFromURL(req, res, next) {
  try {

    let q = req.url.split("?"), result = {};
    if (q.length >= 2) {
      q[1].split("&").forEach((item) => {
        try {
          result[item.split("=")[0]] = item.split("=")[1];
        } catch (e) {
          result[item.split("=")[0]] = "";
        }
      });
    }
    req.querystring = result;
    return req
  } catch (e) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "oops! Something went wrong!",
        addtionalInfo: e.message,
      })
    );
  }
}

module.exports = fetchQueryStringFromURL;
