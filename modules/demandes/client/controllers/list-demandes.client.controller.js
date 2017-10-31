(function () {
  'use strict';

  angular
    .module('demandes')
    .controller('DemandesListController', DemandesListController);

  DemandesListController.$inject = ['$scope', 'DemandesService', 'typeDemande'];

  function DemandesListController($scope, DemandesService, typeDemande) {
    // typeDemande = arbre
    var vm = this;

    vm.demandes = DemandesService.query();
    console.log(vm.demandes);
  }
}());
