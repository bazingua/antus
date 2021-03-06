'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Demandes Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin', 'banque'],
    allows: [{
      resources: '/api/demandes',
      permissions: '*'
    }, {
      resources: '/api/demandes/:demandeId',
      permissions: '*'
    }]
  },
  {
    roles: ['user', 'banque', 'pro'],
    allows: [{
      resources: '/api/demandes',
      permissions: '*'
    }, {
      resources: '/api/demandes/:demandeId',
      permissions: '*'
    }]
  },
  {
    roles: ['banque'],
    allows: [{
      resources: '/api/demandes/:demandeId/offre/deposer',
      permissions: '*'
    }]
  },
  {
    roles: ['admin'],
    allows: [{
      resources: '/api/demandes/:demandeId/valider',
      permissions: '*'
    },
    {
      resources: '/api/demandes/:demandeId/offre/:offreId/transferer',
      permissions: '*'
    },
    {
      resources: '/api/demandes/:demandeId/rejeter',
      permissions: '*'
    },
    {
      resources: '/api/demandes/:demandeId/cloturer',
      permissions: '*'
    }
  ]
  },
  {
    roles: ['user', 'admin', 'pro'],
    allows: [{
      resources: '/api/logicdelete/:demandeId/:state',
      permissions: '*'
    }]
  },
  {
    roles: ['admin', 'pro'],
    allows: [{
      resources: '/api/demandespro',
      permissions: '*'
    }]
  },
  {
    roles: ['user', 'pro'],
    allows: [{
      resources: '/api/demandes/:demandeId/offre/:offreId/choisir',
      permissions: '*'
    }]
  }
]);
};

/**
 * Check If Demandes Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];
  // If an demande is being processed and the current user created it then allow any manipulation
  if (req.demande && req.user && req.demande.user && req.demande.user.id === req.user.id) {
    return next();
  }

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred
      return res.status(500).send('Unexpected authorization error');
    } else {
      if (isAllowed) {
        // Access granted! Invoke next middleware
        return next();
      } else {
        return res.status(403).json({
          message: 'User is not authorized'
        });
      }
    }
  });
};
