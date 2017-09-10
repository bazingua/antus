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
  title: {
    type: String,
    default: '',
    trim: true
  },
  content: {
    type: String,
    default: '',
    trim: true
  },
  id: {
    type: Number,
    default: 0
  },
  client: {
    type: Schema.ObjectId,
    ref: 'User',
    required: 'User is required'
  }
});

mongoose.model('Demande', DemandeSchema);
