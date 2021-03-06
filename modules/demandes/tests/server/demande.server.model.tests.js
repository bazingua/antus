'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Demande = mongoose.model('Demande');

/**
 * Globals
 */
var user,
  demande;

/**
 * Unit tests
 */
describe('Demande Model Unit Tests:', function () {

  beforeEach(function (done) {
    user = new User({
      prenom: 'Full',
      nom: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3',
      provider: 'local'
    });

    user.save()
      .then(function () {
        demande = new Demande({
          title: 'Demande Title',
          content: 'Demande Content',
          user: user
        });

        done();
      })
      .catch(done);
  });

  describe('Method Save', function () {
    it('should be able to save without problems', function (done) {
      this.timeout(10000);
      demande.save(function (err) {
        should.not.exist(err);
        return done();
      });
    });

    it('should be able to show an error when try to save without title', function (done) {
      demande.title = '';

      demande.save(function (err) {
        should.exist(err);
        return done();
      });
    });
  });

  afterEach(function (done) {
    Demande.remove().exec()
      .then(User.remove().exec())
      .then(done())
      .catch(done);
  });
});
