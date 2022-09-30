const {brogrammers} = require('brogrammers');
const config = require('./config');
const Services = require('./services/');
const { LoggerFacade } = require('brogrammers_logger');
const EE = require('eventemitter3')
const eventEmitter = new EE();
const responseHandler = require('./Handlers/responseHandler/responseHandler');
const errorHandler = require('./Handlers/errorHandler/errorHandler');
const app = new brogrammers(eventEmitter,undefined,config,responseHandler,errorHandler);



app.use('logger',new LoggerFacade({driver:"file",filePath:config.root+'/log.txt'}));

module.exports = {
    eventEmitter,
    app,
    config
}


const userModel = require('./apps/users/models/user.model');
app.use('auth',new Services.Auth(userModel,
async (model,credential,hash)=>{
    model = new model();
    const result =  await model.insert([
        // credential.email,
        // credential.phone,
        credential.user,
        hash(credential.password)
    ]);
    return result;
},
async (model,credential,hash)=>{
    model = new model();
    const result = await model.select(['*']).where('"user"=? AND "password"=?',[
        credential.user,
        hash(credential.password)
    ]).execute();

    if(!result.length){
        throw new Error();
    }
    return result;
}));


app.serve();




