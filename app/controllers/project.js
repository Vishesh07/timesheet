var mongoose = require('mongoose');
var Project = mongoose.model('Project');
// var User = mongoose.model('User');
var error = require('../handler/error');
var boom = require('boom');
var _ = require('underscore');
var projectController = function() {};

//create new project
projectController.prototype.create = function(req, res) {
    var project = new Project(req.body);
    project.createdBy = req.user;

    project.save(function(err) {
        if (err) {
            return error.sendMongooseErrorMessage(err, res);
        } else {
            return res.json(project);
        }
    });
}
projectController.prototype.read = function(req, res) {
    return res.json({
        success: true,
        data: req.project
    });
}
projectController.prototype.patch = function(req, res) {
    var project = req.project;
    _.forEach(req.body, function(val, key) {
        project[key] = val;
    });
    project.save(function(err) {
        if (err) {
            return error.sendMongooseErrorMessage(err, res);
        }
        return res.json({
            success: true,
            data: project,
            message: "Project  updated successfully."
        });
    });
}
projectController.prototype.delete = function(req, res) {
    req.project.remove(function(err) {
        if (err) {
            return error.sendMongooseErrorMessage(err, res);
        }
        return res.json({
            success: true,
            message: "project deleted successfully.",
            data: req.project
        });
    });
}

projectController.prototype.get = function(req, res) {
    Project
        .find(req.options.where)
        .$where(req.options.search)
        .select(req.options.select)
        .sort(req.options.sort)
        .skip(req.options.pageskip)
        .limit(req.options.pagesize)
        .populate(req.options.populate)
        .exec(function(err, list) {
            if (err) {
                return error.sendMongooseErrorMessage(err, res);
            }
            return res.json(list);
        });
}

projectController.prototype.getById = function(req, res, next, id) {
    Project.findById(id)
        .exec(function(err, project) {
            if (err) {
                return error.sendMongooseErrorMessage(err, res);
            }
            if (!project) {
                return res.boom.notFound();
            }
            req.project = project;
            next();

        });
}
module.exports = new projectController();
