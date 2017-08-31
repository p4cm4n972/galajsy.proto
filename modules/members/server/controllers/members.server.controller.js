'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  fs = require('fs'),
  util = require('util'),
  mongoose = require('mongoose'),
  Member = mongoose.model('User'),
  friends = require("mongoose-friends"),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');
/**
 * Show the current Member
 */
/*exports.read = function (req, res) {
  // convert mongoose document to JSON
  var member = req.member ? req.member.toJSON() : {};
  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  member.isCurrentUserOwner = req.user && member.user && member.user._id.toString() === req.user._id.toString();

  console.log(member);
  res.jsonp(member);
};*/

exports.favorite = function (req, res) {
  fs.writeFile('addFriend.txt', util.inspect(req), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
  fs.writeFile('addFriendUser.txt', util.inspect(req.user), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
  fs.writeFile('addFriendMember.txt', util.inspect(req.member), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
  Member.requestFriend(req.user._id, req.member._id, function(err, done) {
    if (err) {
      console.log('error add friend');
    } else {
      console.log('friend add OK');
      res.send({message: "Invitation sended!"});
    }
  });
};
/**
 * List of Members
 */
exports.list = function (req, res) {
  Member.find().sort('-created').populate('user', 'displayName').exec(function (err, members) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(members);
    }
  });
};

/**
 * Member middleware
 */
exports.memberByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Member is invalid'
    });
  }

  Member.findById(id).populate('user', 'displayName').exec(function (err, member) {
    if (err) {
      return next(err);
    } else if (!member) {
      return res.status(404).send({
        message: 'No Member with that identifier has been found'
      });
    }
    req.member = member;
    next();
  });
};
