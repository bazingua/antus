  (function () {
  'use strict';

  angular
    .module('users')
    .controller('BanqueHomeController', BanqueHomeController);

    BanqueHomeController.$inject = ['$scope', 'demandes', 'Authentication', 'DemandesService'];

  function BanqueHomeController($scope, demandes, Authentication, DemandesService) {
    var vm = this;
    vm.authentication = Authentication;    
    vm.demandes = angular.copy(demandes);
  }
}());
