'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  _ = require('lodash'),
  Demande = mongoose.model('Demande'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));
  // etat offre
  var OFFRE_STATE_DEPOSE = 1;
  var OFFRE_STATE_TRANFERE = 5;
  // etat demande
  var DEMANDE_STATE_DEPOSE = 1;
  var DEMANDE_STATE_VALIDE = 5;
  var DEMANDE_STATE_REJETE = 0;
  var DEMANDE_STATE_ACCEPTE = 10;
/**
 * Create an demande
 */
exports.create = function (req, res) {
  var demande = new Demande(req.body);
  demande.user = req.user;
  demande.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(demande);
    }
  });
};

/**
 * Show the current demande
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var demande = req.demande ? req.demande.toJSON() : {};

  // Add a custom field to the Demande, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Demande model.
  demande.isCurrentUserOwner = !!(req.user && demande.user && demande.user._id.toString() === req.user._id.toString());
  demande.id = demande._id;
  res.json(demande);
};

/**
 * Update an demande
 */
exports.update = function (req, res) {
  var demande = req.demande;
  demande.id = '' + req.demande._id;
  demande.projet = req.body.projet;
  demande.patrimoine = req.body.patrimoine;
  demande.financement = req.body.financement;
  demande.apport = req.body.apport;
  demande.updated = new Date();
  demande.__v = req.demande.__v + 1;
  demande.etat = req.demande.etat;

  demande.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(demande);
    }
  });
};

/**
 * deposerOffre an demande
 */
exports.deposerOffre = function (req, res) {
  var demande = req.demande;
  demande.updated = new Date();
  req.body.id = demande.offres.length + 1;
  req.body.etat = OFFRE_STATE_DEPOSE;
  req.body.banque = req.user;
  req.body.created = new Date();
  demande.offres.push(req.body);
  demande.etat = DEMANDE_STATE_ACCEPTE;
  demande.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(demande);
    }
  });
};



/**
 * valider demande 
 */
exports.validerDemande = function (req, res) {
  var demande = req.demande;
  demande.updated = new Date();
  demande.etat = DEMANDE_STATE_VALIDE;
  demande.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(demande);
    }
  });
};


/**
 * deposerOffre an demande
 */
exports.transfererOffre = function (req, res) {
  var demande = req.demande;
  demande.updated = new Date();
  var offres = demande.offres.slice();
  var index = _.findIndex(offres, { 'id': parseInt(req.params.offreId, 10), 'etat': OFFRE_STATE_DEPOSE });
  if (!offres[index])
    return res.status(422).send({
      code: '500.3',
      message: "Cette offre n'est pas valide",
      details: "L'offre avec cet id n'est pas dans la liste des offre de la demande"
    });
      
  offres[index].etat = OFFRE_STATE_TRANFERE;
  demande.offres = offres;
  demande.markModified('offres');
  demande.save(function (err, data) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(demande);
    }
  });
};


/**
 * Update an demande
 */
exports.logiqueDelete = function (req, res) {
  var demande = req.demande;
  demande.updated = new Date();
  demande.active = req.active;

  demande.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(demande);
    }
  });
};


/**
 * Delete an demande
 */
exports.delete = function (req, res) {
  var demande = req.demande;

  demande.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(demande);
    }
  });
};

/**
 * List of Demandes
 */
exports.list = function (req, res) {
  req.query.active = true;
  if (req.query.user && req.query.user !== '*')
    req.query.user = { '_id': req.query.user };
  else
    delete req.query.user;
  Demande.find(req.query).sort('-created').populate('user', 'displayName').exec(function (err, demandes) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(demandes);
    }
  });
};

/**
 * Demande middleware
 */
exports.demandeByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Demande is invalid'
    });
  }

  Demande.findById(id).populate('user', 'displayName').exec(function (err, demande) {
    if (err) {
      return next(err);
    } else if (!demande) {
      return res.status(404).send({
        message: 'No demande with that identifier has been found'
      });
    }
    req.demande = demande;
    next();
  });
};


/**
 * Demande middleware
 */
exports.state = function (req, res, next, state) { req.active = state; next();};
  