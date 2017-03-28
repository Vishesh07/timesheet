var mongoose = require('mongoose');
var Entry = mongoose.model('Entry');
var User = mongoose.model('User');
var error = require('../handler/error');
var boom = require('boom');
var _ = require('underscore');
var entryController = function() {};

//create new entry
entryController.prototype.create = function(req, res) {
    var entry = new Entry(req.body);

    entry.save(function(err) {
        if (err) {
            return error.sendMongooseErrorMessage(err, res);
        } else {
            return res.json(entry);
        }
    });
}
entryController.prototype.delete = function(req, res) {
    req.entry.remove(function(err) {
        if (err) {
            return error.sendMongooseErrorMessage(err, res);
        }
        return res.json({
            success: true,
            message: "entry deleted successfully.",
            data: req.entry
        });
    });
}
entryController.prototype.read = function(req, res) {
    return res.json({
        success: true,
        data: req.entry
    });
}
entryController.prototype.get = function(req, res) {
    Entry
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
entryController.prototype.patch = function(req, res) {
    var entry = req.entry;

    _.forEach(req.body, function(val, key) {
        entry[key] = val;
    });
    entry.save(function(err) {
        if (err) {
            return error.sendMongooseErrorMessage(err, res);
        }
        return res.json({
            success: true,
            data: entry,
            message: "Entry  updated successfully."
        });
    });
}
entryController.prototype.getById = function(req, res, next, id) {
    Entry.findById(id)
        .populate('project')
        .exec(function(err, entry) {
            if (err) {
                return error.sendMongooseErrorMessage(err, res);
            }
            if (!entry) {
                return res.boom.notFound();
            }
            req.entry = entry;
            next();

        });
}
module.exports = new entryController();
