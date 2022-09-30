const crypto = require('crypto');
const {DB,Redis} = require('./modules/');
const config = require('./config');
const Cookie = require('brogrammers_cookie');

class Auth{
    #db;
    
    #hashWithPrivateKey(password){
        const privateKey = "this is secret key actually";
        const newPassword = password+ privateKey;
        const hash  = crypto.createHash('sha256');
        return hash.update(newPassword).digest('base64');
    };
    constructor(Model,signup,login,databaseDriver){

        this.Model = Model;
        
        this.signupQuery = signup;
        this.loginQuery = login;

        this.#db = new DB(databaseDriver?databaseDriver:new Redis(config.Redis))

    };

    async checkLogin(cookie,arbitraryCookie){

        const signCookie = Cookie.getSign(cookie); 
        try {
            const sourceCookie =  arbitraryCookie? arbitraryCookie:await this.#db.get(signCookie);
        } catch (error) {
            error.code = "auth-database"
            throw error;
        }
       

        if (sourceCookie && (Cookie.getSign(sourceCookie)==signCookie)){
            return true;
        }
        return false;

    }

    async #makeCookie(data){

        const time = Date.now();
        try {

            const cookie = Cookie.createCookie({
                ...data,
                time
            },config.cookie.hostname,24*60*60*1000);

            const sign = Cookie.getSign(cookie);
            const token = Cookie.getToken(cookie);

            await this.#db.set(sign,token);

        } catch (error) {
            error.code = "auth-database-cookie"
            throw error;
        }
        return cookie;

    }
    async login(credential){
        try {
            const detectedUser = await this.loginQuery(this.Model,credential,this.#hashWithPrivateKey);
        } catch (error) {
            error.code = "login-credential";
            error.message = "user or password is wrong"
            throw error;
        }
        if(detectedUser){
            const cookie = await this.#makeCookie(detectedUser);
            return {
                user:{
                    ...detectedUser[0]
                },
                cookie
            }
        }

    }
    async signup(credential){
        const registerdUser = await this.signupQuery(this.Model,credential,this.#hashWithPrivateKey);
        const cookie = await this.#makeCookie(credential);
        return {
            user:{
                ...credential
            },
            cookie
        }
    }   
    resetPassword(){

    }
}

module.exports = Auth;