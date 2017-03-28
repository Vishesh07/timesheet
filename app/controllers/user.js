var mongoose = require('mongoose');
var User = mongoose.model('User');
var error = require('../handler/error');
var boom = require('boom');
var _ = require('underscore');
var userController = function () {};
//create new user
userController.prototype.create = function (req, res){
    var user = new User(req.body);
    user.createdBy = req.user;
    user.save(function (err) {
        if (err) {
            return  error.sendMongooseErrorMessage(err, res);
        }
        else {
            return  res.json(user);
        }
    });
}
userController.prototype.createadmin = function (req, res) {
        User.register(new User({
        firstname : "Super",
        lastname : "Admin",
        username : "superadmin@yopmail.com",
        mobile: "8460680863",
        address:"4alok bunglows near"
    }), "Admin@123", function (err, user) {
        if (err) {
          return res.json(err);
        }
        return res.json(user);
    });
  }
userController.prototype.get = function (req, res) {
    User
    .find(req.options.where)
    .$where(req.options.search)
    .select(req.options.select)
    .sort(req.options.sort)
    .skip(req.options.pageskip)
    .limit(req.options.pagesize)
    .populate(req.options.populate)
    .exec(function (err, list) {
        if (err) {
            return error.sendMongooseErrorMessage(err, res);
        }
        return res.json(list);
    });
}
userController.prototype.patch = function (req, res) {
    var user = req.user;

    _.forEach(req.body, function (val, key) {
        user[key] = val;
    });
        user.save(function (err) {
                    if (err) {
                        return error.sendMongooseErrorMessage(err, res);
                    }
                    return res.json({
                        success : true, data : user, message : "User Inserted successfully."
                    });
                  });
    }
userController.prototype.read = function (req, res){
         return res.json({
             success : true, data : req.user
         });
     }
userController.prototype.getById = function (req, res, next,id){
         User.findById(id)
         .populate('createdBy')
         .populate('modifiedBy')
         .exec(function (err, user) {
             if (err) {
                 return error.sendMongooseErrorMessage(err, res);
             }
             if (!user) {
                 return res.boom.notFound();
             }
             req.user  = user;
             next();

         });
     }
userController.prototype.delete = function(req, res) {
         req.user.remove(function(err) {
             if (err) {
                 return error.sendMongooseErrorMessage(err, res);
             }
             return res.json({
                 success: true,
                 message: "User deleted successfully.",
                 data: req.user
             });
         });
     }
userController.prototype.logout = function(req, res) {
       req.logout();
       res.redirect('/');
     }
module.exports = new userController();
