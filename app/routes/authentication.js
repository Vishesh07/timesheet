var authentication = require('../../app/controllers/authentication');
    //authorization = require('../../app/controllers/authorization');
var user = require('../../app/controllers/user');
var passport = require('passport');
var express = require('express');

module.exports = function (app) {

    var apiRoutes = express.Router();

    //local login
    apiRoutes.post('/authenticate',
        passport.authenticate('local'),
        authentication.login
    );
    app.use('/', apiRoutes);
};
