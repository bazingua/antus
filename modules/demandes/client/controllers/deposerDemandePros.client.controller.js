(function() {
  'use strict';
  angular
    .module('demandes')
    .controller('DeposerDemandesProController', DeposerDemandesProController);

  DeposerDemandesProController.$inject = ['$scope', '$state', 'DemandesService', 'typeDemande', 'banques', 'DemandesFinancementProModel', '$filter', 'Authentication', 'UsersService', 'Notification'];
  function DeposerDemandesProController($scope, $state, DemandesService, typeDemande, banques, DemandesFinancementProModel, $filter, Authentication, UsersService, Notification) {
    var vm = this;
    vm.viewTreePanel = true;
    vm.viewFormPanel = false;
    vm.typeDemande = typeDemande;
    $scope.typeDemande = vm.typeDemande;
    $scope.demandepro = new DemandesFinancementProModel();
    vm.steps = [
      {
        templateUrl: 'modules/demandes/client/views/demande-Financeent-Pro/fond-commerce.client.view.html',
        title: 'Définissons le montant du prêt'
      },
      {
        templateUrl: 'modules/demandes/client/views/demande-Financeent-Pro/accord-financement.client.view.html',
        title: 'Avez-vous déjà contacté des établissements financiers ?'
      },
      {
        templateUrl: 'modules/demandes/client/views/demande-Financeent-Pro/bank-demandepro.client.view.html',
        title: 'Établissement bancaire avec lequel vous avez obtenu votre accord'
      },
      {
        templateUrl: 'modules/demandes/client/views/demande-Financeent-Pro/bankConsultepro-demande.client.view.html',
        title: 'Avez vous déja consulté des banques'
      },
      {
        templateUrl: 'modules/demandes/client/views/demande-Financeent-Pro/demandePro-societe.client.view.html',
        title: 'Quel est le nom de votre entreprise ?'
      },
      {
        templateUrl: 'modules/demandes/client/views/demande-Financeent-Pro/adresse-projet.view.client.html',
        title: 'Quel est le nom de votre entreprise ?'
      },
      {
        templateUrl: 'modules/demandes/client/views/demande-Financeent-Pro/detail-demandepro.client.view.html',
        title: 'Récapitulatif de votre demande'
      }
    ];
    $scope.endNavigateTree = function(type) {
      vm.viewTreePanel = false;
      vm.viewFormPanel = true;
    };
    $scope.choicedNode;
    $scope.endTreeSelect = function(type) {
      $scope.choicedNode = type;
      $scope.endNavigateTree(type);
    };
    $scope.calculMontantPret = function() {
      $scope.demandepro.montantSouhaite = $scope.demandepro.montantProjet - $scope.demandepro.montantApport;
    };
/**
     * @name  choiceBanquePrincipale
     * @description : cette methode permet de choisir la banque principale
     * @param banque
     */
    $scope.choiceBanquePrincipale = function(banque) {
      $scope.demande.banque = banque.libelle;
    };

    /**
     * @name  choiceBanqueConsulte
     * @description : cette methode permet de choisir un item dans la liste des banques consultées si la banque est deja selectionnée elle est alor supprimé de la lste
     * @param banque
     */
    $scope.choiceBanqueConsulte = function(banque) {
      var banqueIn = $filter('filter')($scope.demande.banqueContacter, banque.libelle);
      banque.checked = !banque.checked;
      if (banqueIn.length < 1)
        $scope.demande.banqueContacter.push(banque.libelle);
      else {
        $scope.demande.banqueContacter = $filter('filter')($scope.demande.banqueContacter, '!' + banque.libelle);
      }
    };


    /**
     * saveDemande
     * la methode qui permet de sauvegarder une demande
     */
    $scope.saveDemande = function() {
      var demandeToSave = angular.copy($scope.demandepro);
      demandeToSave.projet.type = $scope.choicedNode;
      if ($scope.user) {
        UsersService.getMe()
        .then(function (response) {
          demandeToSave.client = response;
          DemandesService.savePro(demandeToSave)
            .then(function (data) {
              $state.go('userHome.client', { reload: true });
              Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Demande enregistrée avec succes' });
            })
            .catch(function (err) {
              Notification.error({ message: 'Le sauvegarde de la demande a échoué ', title: 'Une erreur est survenue' });
            });
        }).catch(function (error) {
          Notification.error({ message: 'Impossible de retrouver vos informations... ', title: 'Une erreur est survenue' });
        });
      } else {
        $scope.demandeToSave.client.roles = [];
        $scope.demandeToSave.client.roles.push('pro');
        UsersService.userSignup($scope.demandeToSave.client)
        .then(function (response) {
          demandeToSave.client = response;
          DemandesService.savePro(demandeToSave)
            .then(function (data) {
              Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Demande enregistrée avec succes' });
              $state.go('userHome.client', { created: response.email });
            })
            .catch(function (err) {
              Notification.error({ message: 'Le sauvegarde de la demande a échoué ', title: 'Une erreur est survenue' });
            });
        }).catch(function (error) {
          Notification.error({ message: error.data.message, title: 'Une erreur est survenue' });
        });
      }
    };
  }
}());
