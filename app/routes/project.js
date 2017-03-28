var project = require('../../app/controllers/project'),
    express = require('express'),
    queryBuilder = require('../../app/middleware/queryBuilder');
module.exports = function(app) {

    var Project = express.Router();

    Project.route('/').
    get(queryBuilder.queryBuilder, project.get)
        .post(project.create);

    Project.route('/:projectId')
        .get(project.read)
        //.put(project.update)
        .patch(project.patch)
        .delete(project.delete);

    Project.param('projectId', project.getById);

    app.use('/api/project', Project);
};