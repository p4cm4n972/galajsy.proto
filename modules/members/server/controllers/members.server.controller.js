'use strict';

/**
 * Module dependencies.
 */
var nodemailer = require('nodemailer');
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
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var member = req.member ? req.member.toJSON() : {};
  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  member.isCurrentUserOwner = req.user && member.user && member.user._id.toString() === req.user._id.toString();

  res.jsonp(member);
};
/**
 * Add favorite friends + Email notification
 */
exports.favorite = function (req, res) {
 
  Member.requestFriend(req.user._id, req.member._id, function(err, done) {
    console.log('done: ' + JSON.stringify(done));
    if (err) {
      console.log('error add friend');
    } else {
      console.log('friend add OK');
      let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'manuel.adele@gmail.com',
          pass: 'Jean_3:16'
        }
      });
      var to = (req.member.providerData.email) || (req.member.email);
      var from = (req.user.email) || (req.user.providerData.email);
      let mailOptions = {
        from: from,
        to: to,
        subject: 'Be my friend | galaJSy 🤖 ',
        html: '<h1 style="border: solid green 2px; text-align:center"><i>Vous avez reçu une demande de: ' + (req.user.username) + '</i></h1><img src=' + req.member.profileImageURL || req.member.providerData.profileImageURL + ' width=150px>'
      };
      transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
          return console.log(err);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
        res.redirect('/');
      });
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
      console.log(members);
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
