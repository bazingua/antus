(function () {
  'use strict';

  angular
    .module('demandes')
    .controller('DemandesController', DemandesController);

  DemandesController.$inject = ['$scope', 'demandeResolve', 'Authentication', 'DemandesService'];

  function DemandesController($scope, demande, Authentication, DemandesService) {
    var vm = this;

    vm.demande = demande;
    vm.authentication = Authentication;

  }
}());
