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

    checkLogin(cookie,arbitraryCookie){

        const signCookie = Cookie.getSign(cookie); 
        const sourceCookie = arbitraryCookie?
            arbitraryCookie:
            this.#db.get(signCookie);

        if (sourceCookie && (Cookie.getSign(sourceCookie)==signCookie)){
            return true;
        }
        return false;

    }

    async #makeCookie(data){

        const time = Date.now();
        const cookie = Cookie.createCookie({
            ...data,
            time
        },config.cookie.hostname,24*60*60*1000);

        const sign = Cookie.getSign(cookie);
        const token = Cookie.getToken(cookie);

        await this.#db.set(sign,token);
        return cookie;

    }
    async login(credential){

        const detectedUser = await this.loginQuery(this.Model,credential,this.#hashWithPrivateKey);
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