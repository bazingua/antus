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
 // databinding
    vm.typeDemande = typeDemande;
    $scope.typeDemande = typeDemande;
    vm.viewTreePanel = true;
    vm.viewFormPanel = false;
    vm.steps = [
      {
        templateUrl: 'modules/demandes/client/views/form-create-demande/montant-projet.client.view.html',
        title: 'Définir le montant et caractère de votre projet'
      },
      {
        templateUrl: 'modules/demandes/client/views/form-create-demande/email-demande.client.view.html',
        title: 'Renseignez votre adresse email'
      },
      {
        templateUrl: 'modules/demandes/client/views/form-create-demande/patrimoine-demande.client.view.html',
        title: 'Définition du Patrimoine Immoblier'
      },
      {
        templateUrl: 'modules/demandes/client/views/form-create-demande/revenu-demande.client.veiw.html',
        title: 'D R D'
      },
      {
        templateUrl: 'modules/demandes/client/views/form-create-demande/autre-revenu-demande.client.view.html',
        title: 'A R '
      },
      {
        templateUrl: 'modules/demandes/client/views/form-create-demande/creditencours-demande.client.view.html',
        title: 'C E Cours'
      },
      {
        templateUrl: 'modules/demandes/client/views/form-create-demande/situationProfessionel-demande.client.view.html',
        title: 'S P'
      },
      {
        templateUrl: 'modules/demandes/client/views/form-create-demande/montantProjet-demande.client.view.html',
        title: 'M P'
      },
      {
        templateUrl: 'modules/demandes/client/views/form-create-demande/bank-demande.client.view.html',
        title: 'Banque Principal'
      },
      {
        templateUrl: 'modules/demandes/client/views/form-create-demande/bankConsulte-demande.client.view.html',
        title: 'Avez vous déja consulté des banques'
      },
      {
        templateUrl: 'modules/demandes/client/views/form-create-demande/coordonnee-demande.client.view.html',
        title: 'Coordonnee Demande'
      }
    ];

    $scope.endTreeSelect = function () {
      vm.viewTreePanel = false;
      vm.viewFormPanel = true;
    }
  }
}());
