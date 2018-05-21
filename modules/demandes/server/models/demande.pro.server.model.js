'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Demande Pro Schema
 */
var DemandeProSchema = new Schema({
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
  exerciceComptable: {
    type: String
  },
  resultstExploitationPositif: {
    type: String
  },
  fondProprePositif: {
    type: Number
  },
  dureeRemboursement: {
    type: String
  },
  fondCommerce: {
    type: Number
  },
  adresse: {
    type: Object
  },
  chiffreAffaire: {
    type: Number
  },
  banqueContacter: {
    type: Object
  },
  infoSociete: {
    type: Object
  },
  coordonneesEmprunteur: {
    type: Object
  },
  coordonneesCoEmprunteur: {
    type: Object
  },
  infoDirigeant: {
    type: Object
  },
  projet: {
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
  __v: {
    type: Number,
    default: 0
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

mongoose.model('DemandePro', DemandeProSchema);
