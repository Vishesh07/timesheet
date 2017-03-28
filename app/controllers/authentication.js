//login - register - forgetpassword - reset password  - set token - verify token - authenticate
//we are going to generate token

var mongoose = require('mongoose'),
    Users = mongoose.model('User'),
    config = require('../../config/config');

var error = require('../handler/error');
var authController = function () { };

authController.prototype.login = function (req, res, next){
    var user = req.user;
    res.redirect ('/');
    //next();
}

module.exports = new authController();
