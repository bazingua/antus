(function () {
  'use strict';

  angular
    .module('demandes')
    .controller('DemandesListController', DemandesListController);

  DemandesListController.$inject = ['DemandesService', 'typeDemande'];

  function DemandesListController(DemandesService, typeDemande) {
    var vm = this;

    vm.demandes = DemandesService.query();

    vm.typeDemande = typeDemande;
    vm.currentNode = typeDemande;
  }
}());
