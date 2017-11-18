(function () {
  'use strict';

  angular
    .module('core')
    .factory('SignOutService', SignOutService);

  SignOutService.$inject = ['$resource'];

  function SignOutService($resource) {
    var User = $resource('/api/auth/signout', {
      get: {
        method: 'GET'
      }
    });
    return User;

  }
}());
