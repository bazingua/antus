(function () {
  'use strict';

  angular
    .module('demandes')
    .controller('DeposerDemandesController', DeposerDemandesController);

  DeposerDemandesController.$inject = ['$scope', 'DemandesService', 'typeDemande'];

  function DeposerDemandesController($scope, DemandesService, typeDemande) {
    // typeDemande = arbre
    var vm = this;

    vm.demandes = DemandesService.query();
    // databinding
    vm.typeDemande = typeDemande;
    $scope.typeDemande = typeDemande;
    vm.viewTreePanel = true;
    vm.viewFormPanel = false;
    $scope.banques = [
      {
        'libelle': 'BICIS',
        'logo': '/modules/core/client/img/bank/bicis.jpg',
        'checked': false
      },
      {
        'libelle': 'ECOBANK',
        'logo': '/modules/core/client/img/bank/eco.jpg',
        'checked': false
      },
      {
        'libelle': 'CBAO',
        'logo': '/modules/core/client/img/bank/cbao.jpg',
        'checked': false
      },
      {
        'libelle': 'BIS',
        'logo': '/modules/core/client/img/bank/bis.png',
        'checked': false
      },
      {
        'libelle': 'BGFI',
        'logo': '/modules/core/client/img/bank/bgfi.jpg',
        'checked': false
      },
      {
        'libelle': 'BHS',
        'logo': '/modules/core/client/img/bank/bhs.jpg',
        'checked': false
      },
      {
        'libelle': 'Banque Atlantique',
        'logo': '/modules/core/client/img/bank/ba.jpg',
        'checked': false
      },
      {
        'libelle': 'SGBS',
        'logo': '/modules/core/client/img/bank/sgbs.png',
        'checked': false
      }

    ];

    $scope.endTreeSelect = function () {
      vm.viewTreePanel = false;
      vm.viewFormPanel = true;
    };
  }
}());
