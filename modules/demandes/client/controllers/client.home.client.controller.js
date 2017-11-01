  (function () {
  'use strict';

  angular
    .module('users')
    .controller('ClientHomeController', ClientHomeController);

    ClientHomeController.$inject = ['$scope', 'DemandesModel', '$timeout', 'demande', 'Authentication', 'DemandesService'];

  function ClientHomeController($scope, DemandesModel, $timeout, demande, Authentication, DemandesService) {
    var vm = this;
    vm.authentication = Authentication;
    vm.demande = angular.copy(demande);
    vm.feedBackMessage = true;
    $timeout(function() {
      vm.feedBackMessage = false;
    }, 100000);
  }
}());
