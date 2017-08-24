(function (app) {
  'use strict';

  app.registerModule('demandes', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('demandes.services', ['ngResource']);
  app.registerModule('demandes.model');
  app.registerModule('demandes.routes');
  app.registerModule('demandes.directives');
}(ApplicationConfiguration));
