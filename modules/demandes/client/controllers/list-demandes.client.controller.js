(function () {
  'use strict';

  angular
    .module('demandes')
    .controller('DemandesListController', DemandesListController);

  DemandesListController.$inject = ['DemandesService', 'TypeService'];

  function DemandesListController(DemandesService, TypeService) {
    var vm = this;

    vm.demandes = DemandesService.query();

    vm.typeDemande = TypeService.get().$promise;
  }
}());
