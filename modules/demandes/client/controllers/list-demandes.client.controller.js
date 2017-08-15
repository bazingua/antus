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
    vm.steps = [
      {
        template: '<div class="well">More docs available on Github</div>',
        title: 'Get the source'
      },
      {
        template: '<div class="well">More docs available on Github</div>',
        title: 'Add it to your app'
      },
      {
        template: '<div class="well">More docs available on Github</div>',
        title: 'Create your multi step forms / wizzards'
      },
      {
        template: '<div class="well">More docs available on Github</div>',
        title: 'Read the docs'
      }
    ];

  }
}());
