(function (app) {
  'use strict';

  app.registerModule('members', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('members.admin', ['core.admin']);
  app.registerModule('members.admin.routes', ['core.admin.routes']);
  app.registerModule('members.services');
  app.registerModule('members.routes', ['ui.router', 'core.routes', 'members.services']);
}(ApplicationConfiguration));
