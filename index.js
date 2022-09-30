const {brogrammers} = require('brogrammers');
const config = require('./config');
const Services = require('./services/');

const EE = require('eventemitter3')
const eventEmitter = new EE();
const app = new brogrammers(eventEmitter,undefined,config);

module.exports = {
    eventEmitter,
    app,
    config
}

const responseHandler = require('./Handlers/responseHandler/responseHandler');
const errorHandler = require('./Handlers/errorHandler/errorHandler');

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
    return result;
}));

app.serve();




