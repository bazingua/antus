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
var OFFRE_STATE_CHOISIT = 10;
  // etat demande
var DEMANDE_STATE_DEPOSER = 1;
var DEMANDE_STATE_VALIDER = 5;
var DEMANDE_STATE_REJETER = 0;
var DEMANDE_STATE_ACCEPTER = 10;
var DEMANDE_STATE_ARCHIVER = -5;
/**
 * Create an demande
 */
exports.create = function (req, res) {
  var demande = new Demande(req.body);
  demande.user = req.user;
  delete demande.client.password;
  delete demande.client.confirmPwd;
  demande.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      return res.json(demande);
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
  return res.json(demande);
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
  demande.offres = req.body.offres;
  demande.societe = req.body.societe;
  demande.updated = new Date();
  demande.__v = req.demande.__v + 1;
  demande.etat = req.demande.etat;

  demande.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      return res.json(demande);
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
 // demande.etat = DEMANDE_STATE_ACCEPTER;
  demande.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      return res.json(demande);
    }
  });
};


/**
 * Rejeter une demande
 */
exports.rejeterDemande = function (req, res) {
  var demande = req.demande;
  demande.updated = new Date();
  demande.etat = DEMANDE_STATE_REJETER;
  demande.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      return res.json(demande);
    }
  });
};


/**
 * Archiver une demande
 */
exports.cloturerDemande = function (req, res) {
  var demande = req.demande;
  demande.updated = new Date();
  demande.etat = DEMANDE_STATE_ARCHIVER;
  demande.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      return res.json(demande);
    }
  });
};


/**
 * valider demande
 */
exports.validerDemande = function (req, res) {
  var demande = req.demande;
  demande.updated = new Date();
  demande.etat = DEMANDE_STATE_VALIDER;
  demande.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      return res.json(demande);
    }
  });
};


/**
 * Transferer une offre
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
      details: "L'offre avec cet identifiant n'est pas dans la liste des offres de la demande"
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
      return res.json(demande);
    }
  });
};


/**
 * Choisir une offre
 * changer l'etat d'une offre qui est en tranferer pour le mettre à chsoiit
 */
exports.choisirOffre = function (req, res) {
  var demande = req.demande;
  demande.updated = new Date();
  var offres = demande.offres.slice();
  var index = _.findIndex(offres, { 'id': parseInt(req.params.offreId, 10), 'etat': OFFRE_STATE_TRANFERE });
  if (!offres[index])
    return res.status(422).send({
      code: '500.3',
      message: "Cette offre n'est pas valide",
      details: "L'offre avec cet identifiant n'est pas dans la liste des offres à choisir "
    });

  offres[index].etat = OFFRE_STATE_CHOISIT;
  demande.offres = offres;
  demande.markModified('offres');
  demande.save(function (err, data) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      return res.json(demande);
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
      return res.json(demande);
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
      return res.json(demande);
    }
  });
};

/**
 * List of Demandes
 */
exports.list = function (req, res) {
  req.query.active = true;
  if (req.query.user && req.query.user !== '*')
    req.query['client.email'] = req.query.user;
  delete req.query.user;

  if (parseInt(req.query.etat, 10))
    req.query.etat = parseInt(req.query.etat, 10);
  else
    delete req.query.etat;

  Demande.find(req.query).sort('-created').populate('user', 'displayName').exec(function (err, demandes) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      return res.json(demandes);
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
