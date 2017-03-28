var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = models.User;
var crypto = require('crypto');


module.exports = function () {
    passport.use(new LocalStrategy(
        function (username, password, done) {
            User.findOne({
                where: { username : username }
            }).then(function (user) {
                if (!user) {
                    return done(null, false, {
                        message : "Unknown User"
                    });
                }
                var ecpas = crypto.pbkdf2Sync(password, user.salt, 10000, 64).toString('base64');
                if (ecpas !== user.password) {
                    return done(null, false, {
                        message : "Invalid Password"
                    });
                }
                return done(null, user.get({ plain: true }));
            });
        }));
};
