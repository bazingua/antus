  (function () {
  'use strict';

  angular
    .module('users')
    .controller('ClientHomeController', ClientHomeController);

    ClientHomeController.$inject = ['$scope', 'DemandesModel', '$timeout', 'demandes', 'Authentication', 'DemandesService'];

  function ClientHomeController($scope, DemandesModel, $timeout, demandes, Authentication, DemandesService) {
    var vm = this;
    vm.authentication = Authentication;    
    vm.demandes = angular.copy(demandes);
    console.log(vm.demandes);
    vm.feedBackMessage = true;
    $timeout(function() {
      vm.feedBackMessage = false;
    }, 100000);
  }
}());
