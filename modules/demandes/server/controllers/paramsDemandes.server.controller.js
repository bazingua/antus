'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  _ = require('lodash'),
  ParamDemande = mongoose.model('ParamDemande'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * SET Numero Demande middleware
 */
exports.setNumeroDemande = function (req, res, next) {
  var paramDemandeToSave;
  var numDmd = 0;
  ParamDemande.find().populate().exec(function (err, paramDd) {
    if (err || !paramDd) {
      return next();
    }
    if (paramDd.length < 1 || !paramDd[0]) {
      numDmd = new Date().getFullYear() + '' + 1;
      numDmd = parseInt(numDmd, 10);
      paramDemandeToSave = new ParamDemande({ counter: 1, numeroDemande: numDmd });
    } else {
      paramDemandeToSave = new ParamDemande(paramDd[0]);
      paramDemandeToSave.counter ++;
      numDmd = new Date().getFullYear() + '' + paramDemandeToSave.counter;
      numDmd = parseInt(numDmd, 10);
      paramDemandeToSave.numeroDemande = numDmd;
    }
    paramDemandeToSave.save(function (err) {
      if (err) {
        return res.status(422).send({
          message: errorHandler.getErrorMessage(err)
        });
      }
      req.body.numeroDemande = paramDemandeToSave.numeroDemande;
      return next();
    });
  });
};
