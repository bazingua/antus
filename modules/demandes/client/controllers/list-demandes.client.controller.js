(function () {
  'use strict';

  angular
    .module('demandes')
    .controller('DemandesListController', DemandesListController);

  DemandesListController.$inject = ['DemandesService', 'typeDemande'];

  function DemandesListController(DemandesService, typeDemande) {
    // typeDemande = arbre
    var vm = this;

    vm.demandes = DemandesService.query();
 // databinding
    vm.typeDemande = typeDemande;
    vm.currentNode = typeDemande;
  }
}());
