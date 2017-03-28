process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//var sequelize = require('./config/sequelize.js');
var express = require('./config/express.js');

var passport = require('./config/passport.js');

//var db = sequelize();
var app = express();
var passport = passport();

//Listening on port 3002
app.listen(3002);
module.exports = app;
