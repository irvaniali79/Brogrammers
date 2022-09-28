const {app} = require('../../../');

async function signup(req,res,queryParams){
    const {params} = req;

    const result = await app.services['auth'].signup({
        user:params.user,
        password:params.password,
        confirmation:params.confirmation
    });
    
    res.setHeader('Set-Cookie',result.cookie);
    return result.user;

}

async function login(req,res,queryParams){
    const {params} = req;

    const result = await app.services['auth'].login({
        user:params.user,
        password:params.password,
    });
    return result.user;


}



module.exports = {
    login,
    signup
}