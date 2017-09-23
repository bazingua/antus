'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Offre = mongoose.model('Offre'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Offre
 */
exports.create = function(req, res) {
  var offre = new Offre(req.body);
  offre.user = req.user;

  offre.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(offre);
    }
  });
};

/**
 * Show the current Offre
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var offre = req.offre ? req.offre.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  offre.isCurrentUserOwner = req.user && offre.user && offre.user._id.toString() === req.user._id.toString();

  res.jsonp(offre);
};

/**
 * Update a Offre
 */
exports.update = function(req, res) {
  var offre = req.offre;

  offre = _.extend(offre, req.body);

  offre.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(offre);
    }
  });
};

/**
 * Delete an Offre
 */
exports.delete = function(req, res) {
  var offre = req.offre;

  offre.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(offre);
    }
  });
};

/**
 * List of Offres
 */
exports.list = function(req, res) {
  Offre.find().sort('-created').populate('user', 'displayName').exec(function(err, offres) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(offres);
    }
  });
};

/**
 * Offre middleware
 */
exports.offreByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Offre is invalid'
    });
  }

  Offre.findById(id).populate('user', 'displayName').exec(function (err, offre) {
    if (err) {
      return next(err);
    } else if (!offre) {
      return res.status(404).send({
        message: 'No Offre with that identifier has been found'
      });
    }
    req.offre = offre;
    next();
  });
};
