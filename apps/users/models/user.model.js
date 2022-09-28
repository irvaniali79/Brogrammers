const {Model} = require('brogrammers');
const {app} = require('../../../');

class userModel extends Model{
    constructor(){
        super(app['db'],'users',[
            '"user"',
            'password'
        ]);
    }

}
module.exports = userModel;