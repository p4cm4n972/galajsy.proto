'use strict';

/**
 * Module dependencies
 */
var membersPolicy = require('../policies/members.server.policy'),
  members = require('../controllers/members.server.controller');

module.exports = function (app) {
  // Members Routes
  app.route('/api/members').all(membersPolicy.isAllowed)
    .get(members.list);

  app.route('/api/members/:memberId').all(membersPolicy.isAllowed)
    .get(members.read);

  // Finish by binding the Member middleware
  app.param('memberId', members.memberByID);
};
