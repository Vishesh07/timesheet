var user = require('../../app/controllers/user'),
express = require('express');
queryBuilder = require('../../app/middleware/queryBuilder');
module.exports = function(app) {

    var User = express.Router();

    User.route('/')
        .get(queryBuilder.queryBuilder, user.get)
        .post(user.create);

    User.route('/:userId')
        .get(user.read)
        //.put(entry.update)
        .patch(user.patch)
        .delete(user.delete);

    User.route('/auth/logout')
        .get(user.logout);

    User.route('/init/createadmin')
          .get(user.createadmin);
          
    User.param('userId', user.getById);
    app.use('/api/user', User);
};
