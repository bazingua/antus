'use strict';

var path = require('path');
module.exports = function (app) {
  // Root routing
  var core = require('../controllers/core.server.controller');

  // Define error pages
  app.route('/server-error').get(core.renderServerError);

  // swagger routes
  app.use('/api/docs/swagger', require('express').static(require('path').resolve('./node_modules/swagger-ui/dist')));
  app.use('/api/docs/swagger', require('express').static(require('path').resolve('./public')));

  app.route('/api/typedemande').get(function(req, res, next) {
    if (req.query.type && req.query.type === 'pro')
      return res.json(require(path.resolve('./config/entities/arbePro')));
    else
      return res.json(require(path.resolve('./config/entities/arbe')));
  });

  // Return a 404 for all undefined api, module or lib routes
  app.route('/:url(api|modules|lib)/*').get(core.renderNotFound);

  // Define application route
  app.route('/*').get(core.renderIndex);
};
