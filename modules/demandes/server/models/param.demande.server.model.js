'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * ParamDemande Schema
 */
var ParamDemandeSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  counter: {
    type: Number
  },
  numeroDemande: {
    type: Number
  }
});

mongoose.model('ParamDemande', ParamDemandeSchema);
