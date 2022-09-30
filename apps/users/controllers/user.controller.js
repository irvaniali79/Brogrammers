const {app} = require('../../../');

async function signup(req,res,queryParams){
    const {params} = req;
    try {
        const result = await app.services['auth'].signup({
            user:params.user,
            password:params.password,
            confirmation:params.confirmation
        });
        res.setHeader('Set-Cookie',result.cookie);
        res.response(JSON.stringify(result.user));
    } catch (error) {
        error.code = 500;
        throw error;
    }
    
    
  
}

async function login(req,res,queryParams){
    const {params} = req;
    try {
        const result = await app.services['auth'].login({
            user:params.user,
            password:params.password,
        });
        res.response(JSON.stringify(result.user));
    
    
    } catch (error) {
        error.code = 500;
        throw error;
    }
  
}



module.exports = {
    login,
    signup
}