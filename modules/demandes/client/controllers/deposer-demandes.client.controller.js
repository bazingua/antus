(function () {
  'use strict';

  angular
    .module('demandes')
    .controller('DeposerDemandesController', DeposerDemandesController);

  DeposerDemandesController.$inject = ['$scope', 'DemandesService', 'typeDemande'];

  function DeposerDemandesController($scope, DemandesService, typeDemande) {
    // typeDemande = arbre
    var vm = this;

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
