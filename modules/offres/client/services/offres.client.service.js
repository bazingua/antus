// Offres service used to communicate Offres REST endpoints
(function () {
  'use strict';

  angular
    .module('offres')
    .factory('OffresService', OffresService);

  OffresService.$inject = ['$resource'];

  function OffresService($resource) {
    return $resource('api/offres/:offreId', {
      offreId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
