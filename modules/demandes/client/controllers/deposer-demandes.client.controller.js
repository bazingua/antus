(function () {
  'use strict';

  angular
    .module('demandes')
    .controller('DeposerDemandesController', DeposerDemandesController);

  DeposerDemandesController.$inject = ['$scope', 'DemandesService', 'typeDemande', 'banques', 'DemandesModel'];

  function DeposerDemandesController($scope, DemandesService, typeDemande, banques, DemandesModel) {
    // typeDemande = arbre
    var vm = this;

    vm.typeDemande = typeDemande;
    $scope.typeDemande = typeDemande;
    $scope.demande = new DemandesModel();
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
        title: 'Definition des Revenus'
      },
      {
        templateUrl: 'modules/demandes/client/views/form-create-demande/autre-revenu-demande.client.view.html',
        title: 'Autres  Revenus '
      },
      {
        templateUrl: 'modules/demandes/client/views/form-create-demande/creditencours-demande.client.view.html',
        title: 'Quels sont Vos Crédits Encours'
      },
      {
        templateUrl: 'modules/demandes/client/views/form-create-demande/situationProfessionel-demande.client.view.html',
        title: 'Situation Professionnelle'
      },
      {
        templateUrl: 'modules/demandes/client/views/form-create-demande/montantProjet-demande.client.view.html',
        title: 'Montant de votre  Pret'
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
    $scope.banques = banques;

    $scope.endTreeSelect = function () {
      vm.viewTreePanel = false;
      vm.viewFormPanel = true;
    };

    $scope.saveDemande = function () {
      console.log('save now', $scope.demande);
    };
  }
}());
