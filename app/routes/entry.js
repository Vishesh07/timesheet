var entry = require('../../app/controllers/entry'),
express = require('express'),
queryBuilder = require('../../app/middleware/queryBuilder');
module.exports = function (app) {

	var Entry = express.Router();

	Entry.route('/')
        .get(queryBuilder.queryBuilder, entry.get)
        .post(entry.create);

	Entry.route('/:entryId')
    .get(entry.read)
    //.put(entry.update)
    .patch(entry.patch)
    .delete(entry.delete);

    Entry.param('entryId', entry.getById);

    app.use('/api/entry', Entry);
};
