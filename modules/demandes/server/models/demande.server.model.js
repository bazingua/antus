'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Demande Schema
 */
var DemandeSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  id: {
    type: String
  },
  type: {
    type: String
  },
  societe: {
    type: Object
  },
  projet: {
    type: Object
  },
  patrimoine: {
    type: Object
  },
  financement: {
    type: Object
  },
  client: {
    type: Object
  },
  apport: {
    type: Object
  },
  updated: {
    type: Date,
    default: Date.now
  },
  active: {
    type: Boolean,
    default: true
  },
  etat: {
    type: Number,
    default: 1
  },
  numeroDemande: {
    type: Number,
    default: 0
  },
  offres: {
    type: [Schema.Types.Mixed],
    default: []
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Demande', DemandeSchema);
