const {app} = require('../../');
const userController = require('./controllers/user.controller');
const middlewares = require('../../middlewares');

app.router.group('users',()=>{
    
    app.router.addRoute('/login',userController.login,'POST').middleware([middlewares.fetchFromParams]);
    app.router.addRoute('/signup',userController.signup,'POST').middleware([middlewares.fetchFromParams]);


})