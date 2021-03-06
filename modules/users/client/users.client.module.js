(function (app) {
  'use strict';

  app.registerModule('users', ['core']);
  app.registerModule('users.admin');
  app.registerModule('users.admin.routes', ['ui.router', 'core.routes', 'users.admin.services']);
  app.registerModule('users.admin.services');
  app.registerModule('users.routes', ['ui.router', 'core.routes']);
  app.registerModule('users.services');
  app.registerModule('users.model');
}(ApplicationConfiguration));