'use strict';

/**
 * Module dependencies
 */
var offresPolicy = require('../policies/offres.server.policy'),
  offres = require('../controllers/offres.server.controller');

module.exports = function(app) {
  // Offres Routes
  app.route('/api/offres').all(offresPolicy.isAllowed)
    .get(offres.list)
    .post(offres.create);

  app.route('/api/offres/:offreId').all(offresPolicy.isAllowed)
    .get(offres.read)
    .put(offres.update)
    .delete(offres.delete);

  // Finish by binding the Offre middleware
  app.param('offreId', offres.offreByID);
};
