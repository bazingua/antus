  (function () {
  'use strict';

  angular
    .module('users')
    .controller('UserController', UserController);

    UserController.$inject = ['$scope', '$uibModalInstance', '$timeout',  'Authentication', 'DemandesService', 'userResolve'];

  function UserController($scope, $uibModalInstance, $timeout, Authentication, DemandesService, userResolve) {
    var vm = this;
    vm.authentication = Authentication;
    $scope.user = userResolve;
    $scope.user.civilite = $scope.user.civilite ? $scope.user.civilite.replace(/\b\w/g, l => l.toUpperCase()) : $scope.user.civilite;
    $scope.closeModale = function () {
      $uibModalInstance.dismiss();
    }
  }
}());
