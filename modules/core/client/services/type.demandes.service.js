(function() {
  'use strict';
  angular
    .module('core.services')
    .factory('TypeService', TypeService);

  TypeService.$inject = ['$resource'];
  function TypeService($resource) {
    return $resource('/api/typedemande');
  }
}());

