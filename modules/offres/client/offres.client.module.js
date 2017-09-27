(function (app) {
  'use strict';

  app.registerModule('offres');
  app.registerModule('offres.services', ['ngResource']);
  app.registerModule('offres.model');
  app.registerModule('offres.routes');
  app.registerModule('offres.directives');

}(ApplicationConfiguration));
