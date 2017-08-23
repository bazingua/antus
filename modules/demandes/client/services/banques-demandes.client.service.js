(function () {
  'use strict';

  angular.module('demandes.services')
  .factory('BanqueDemandeService', function ($resource) {
    return $resource('/modules/demandes/client/config/ressources/banques.json', { }, {
      getData: { method: 'GET', isArray: true }
    });
  });

}());
