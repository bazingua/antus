'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Offre Schema
 */
var OffreSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Offre name',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Offre', OffreSchema);
