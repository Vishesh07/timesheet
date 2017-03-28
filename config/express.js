var config = require('./config.js');
var http = require('http');
//var socketio = require('socket.io');
var express = require('express');
var morgan = require('morgan');
var compress = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var passport = require('passport');
var boom = require('express-boom');
var flash = require('connect-flash');
//var models = require("../app/models/index");


module.exports = function(db){
    var app = express();
    var server = http.createServer(app);

    app.use(function (req, res, next) {

        var allowedOrigins = ['http://localhost:3002', config.frontUrl, 'http://127.0.0.1:3002','http://192.168.1.68:3002'];
        var origin = req.headers.origin;

        console.log("allowedOrigins", allowedOrigins);
        console.log("origin", origin);
        if (allowedOrigins.indexOf(origin) > -1) {
            res.setHeader('Access-Control-Allow-Origin', "*");
        }
        //res.header("Access-Control-Allow-Origin", config.frontUrl + ',');
        res.header("Access-Control-Allow-Credentials", "true");
        res.header("Access-Control-Allow-Methods", "GET, POST,HEAD, OPTIONS, PUT, DELETE, PATCH");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, If-Modified-Since, Cache-Control, Pragma");
        res.header("Cache-Control", "no-cache, no-store, must-revalidate");
        //res.header("Cache-Control", "max-age=1800");
        res.header("Expires", 0);
        next();
    });

    app.use(morgan('dev'));
       if (process.env.NODE_ENV === 'development') {
           app.use(morgan('dev'));
       } else {
           app.use(compress());
       }

       app.use(bodyParser.urlencoded({
           extended : true
       }));

       app.use(bodyParser.json());
       app.use(methodOverride());

       

    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret
    }));

    app.set('views', './app/views');
    app.set('view engine', 'ejs');

    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(boom());

    //require('../app/helper/uploadFile')(app);
    require('../app/routes/entry.js')(app);
    require('../app/routes/index.js')(app);
    require('../app/routes/project.js')(app);
    require('../app/routes/user.js')(app);
    require('../app/routes/authentication.js')(app);

    app.use(express.static('./public'));
    app.use(express.static('./uploads'));
    return app;

}
