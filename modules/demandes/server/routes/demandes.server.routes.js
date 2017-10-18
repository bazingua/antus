'use strict';

/**
 * Module dependencies
 */
var demandesPolicy = require('../policies/demandes.server.policy'),
  demandes = require('../controllers/demandes.server.controller');

module.exports = function (app) {
  // Demandes collection routes
  app.route('/api/demandes').all(demandesPolicy.isAllowed)
    .get(demandes.list)
    .post(demandes.create);

  // Single demande routes
  app.route('/api/demandes/:demandeId').all(demandesPolicy.isAllowed)
    .get(demandes.read)
    .put(demandes.update)
    .delete(demandes.delete);

  // Single demande routes
  app.route('/api/logicdelete/:demandeId/:state').all(demandesPolicy.isAllowed)
  .put(demandes.logiqueDelete);

  // Finish by binding the demande middleware
  app.param('demandeId', demandes.demandeByID);
  app.param('state', demandes.state);
};
