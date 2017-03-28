var config = require('./config.js'),
    mongoose = require('mongoose');
    //autoIncrement = require('mongoose-auto-increment');

module.exports = function () {

    var db = mongoose.connect(config.db);
    //autoIncrement.initialize(db);


    // When successfully connected
    mongoose.connection.on('connected', function () {
        console.log('Mongoose default connection open to ' + config.db);
    });



    // If the connection throws an error
    mongoose.connection.on('error', function (err) {
        console.log('Mongoose default connection error: ' + err);
    });

    // When the connection is disconnected
    mongoose.connection.on('disconnected', function () {
        console.log('Mongoose default connection disconnected');
    });

    // If the Node process ends, close the Mongoose connection
    process.on('SIGINT', function () {
        mongoose.connection.close(function () {
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    });



    require('../app/models/entry');
    require('../app/models/project');
    require('../app/models/user');

    return db;
};
