'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Offre = mongoose.model('Offre'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  offre;

/**
 * Offre routes tests
 */
describe('Offre CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Offre
    user.save(function () {
      offre = {
        name: 'Offre name'
      };

      done();
    });
  });

  it('should be able to save a Offre if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Offre
        agent.post('/api/offres')
          .send(offre)
          .expect(200)
          .end(function (offreSaveErr, offreSaveRes) {
            // Handle Offre save error
            if (offreSaveErr) {
              return done(offreSaveErr);
            }

            // Get a list of Offres
            agent.get('/api/offres')
              .end(function (offresGetErr, offresGetRes) {
                // Handle Offres save error
                if (offresGetErr) {
                  return done(offresGetErr);
                }

                // Get Offres list
                var offres = offresGetRes.body;

                // Set assertions
                (offres[0].user._id).should.equal(userId);
                (offres[0].name).should.match('Offre name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Offre if not logged in', function (done) {
    agent.post('/api/offres')
      .send(offre)
      .expect(403)
      .end(function (offreSaveErr, offreSaveRes) {
        // Call the assertion callback
        done(offreSaveErr);
      });
  });

  it('should not be able to save an Offre if no name is provided', function (done) {
    // Invalidate name field
    offre.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Offre
        agent.post('/api/offres')
          .send(offre)
          .expect(400)
          .end(function (offreSaveErr, offreSaveRes) {
            // Set message assertion
            (offreSaveRes.body.message).should.match('Please fill Offre name');

            // Handle Offre save error
            done(offreSaveErr);
          });
      });
  });

  it('should be able to update an Offre if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Offre
        agent.post('/api/offres')
          .send(offre)
          .expect(200)
          .end(function (offreSaveErr, offreSaveRes) {
            // Handle Offre save error
            if (offreSaveErr) {
              return done(offreSaveErr);
            }

            // Update Offre name
            offre.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Offre
            agent.put('/api/offres/' + offreSaveRes.body._id)
              .send(offre)
              .expect(200)
              .end(function (offreUpdateErr, offreUpdateRes) {
                // Handle Offre update error
                if (offreUpdateErr) {
                  return done(offreUpdateErr);
                }

                // Set assertions
                (offreUpdateRes.body._id).should.equal(offreSaveRes.body._id);
                (offreUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Offres if not signed in', function (done) {
    // Create new Offre model instance
    var offreObj = new Offre(offre);

    // Save the offre
    offreObj.save(function () {
      // Request Offres
      request(app).get('/api/offres')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Offre if not signed in', function (done) {
    // Create new Offre model instance
    var offreObj = new Offre(offre);

    // Save the Offre
    offreObj.save(function () {
      request(app).get('/api/offres/' + offreObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', offre.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Offre with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/offres/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Offre is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Offre which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Offre
    request(app).get('/api/offres/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Offre with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Offre if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Offre
        agent.post('/api/offres')
          .send(offre)
          .expect(200)
          .end(function (offreSaveErr, offreSaveRes) {
            // Handle Offre save error
            if (offreSaveErr) {
              return done(offreSaveErr);
            }

            // Delete an existing Offre
            agent.delete('/api/offres/' + offreSaveRes.body._id)
              .send(offre)
              .expect(200)
              .end(function (offreDeleteErr, offreDeleteRes) {
                // Handle offre error error
                if (offreDeleteErr) {
                  return done(offreDeleteErr);
                }

                // Set assertions
                (offreDeleteRes.body._id).should.equal(offreSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Offre if not signed in', function (done) {
    // Set Offre user
    offre.user = user;

    // Create new Offre model instance
    var offreObj = new Offre(offre);

    // Save the Offre
    offreObj.save(function () {
      // Try deleting Offre
      request(app).delete('/api/offres/' + offreObj._id)
        .expect(403)
        .end(function (offreDeleteErr, offreDeleteRes) {
          // Set message assertion
          (offreDeleteRes.body.message).should.match('User is not authorized');

          // Handle Offre error error
          done(offreDeleteErr);
        });

    });
  });

  it('should be able to get a single Offre that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Offre
          agent.post('/api/offres')
            .send(offre)
            .expect(200)
            .end(function (offreSaveErr, offreSaveRes) {
              // Handle Offre save error
              if (offreSaveErr) {
                return done(offreSaveErr);
              }

              // Set assertions on new Offre
              (offreSaveRes.body.name).should.equal(offre.name);
              should.exist(offreSaveRes.body.user);
              should.equal(offreSaveRes.body.user._id, orphanId);

              // force the Offre to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Offre
                    agent.get('/api/offres/' + offreSaveRes.body._id)
                      .expect(200)
                      .end(function (offreInfoErr, offreInfoRes) {
                        // Handle Offre error
                        if (offreInfoErr) {
                          return done(offreInfoErr);
                        }

                        // Set assertions
                        (offreInfoRes.body._id).should.equal(offreSaveRes.body._id);
                        (offreInfoRes.body.name).should.equal(offre.name);
                        should.equal(offreInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Offre.remove().exec(done);
    });
  });
});
