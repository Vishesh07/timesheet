process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var mongoose = require('./config/mongoose.js');
var express = require('./config/express.js');
var passport = require('./config/passport.js'),
 config = require('./config/config.js');

var db = mongoose();
var app = express(db);
var Passport = passport();

app.listen(config.port);
console.log("App Listning on port "+ config.port);
module.exports = app;
