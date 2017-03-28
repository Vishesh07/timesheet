var passport = require('passport');
var mongoose = require('mongoose');
module.exports = function() {
    var User = mongoose.model("User");

    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

};
