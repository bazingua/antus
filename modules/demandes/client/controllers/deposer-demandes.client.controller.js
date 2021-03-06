(function() {
  'use strict';

  angular
    .module('demandes')
    .controller('DeposerDemandesController', DeposerDemandesController);

  DeposerDemandesController.$inject = ['$scope', '$state', 'DemandesService', 'typeDemande', 'banques', 'DemandesModel', '$filter', 'Authentication', 'UsersService', 'Notification'];
  function DeposerDemandesController($scope, $state, DemandesService, typeDemande, banques, DemandesModel, $filter, Authentication, UsersService, Notification) {
    // typeDemande = arbre
    var vm = this;

    vm.typeDemande = typeDemande;
    $scope.typeDemande = typeDemande;
    $scope.demande = new DemandesModel();
    vm.viewTreePanel = true;
    vm.viewFormPanel = false;
    $scope.current = 0;
    $scope.user = Authentication.user;
    // $scope.node = $scope.typeDemande;
    vm.steps = [
      {
        templateUrl: 'modules/demandes/client/views/form-create-demande/montant-projet.client.view.html',
        title: 'Définir le montant et caractère de votre projet'
      },
      {
        templateUrl: 'modules/demandes/client/views/form-create-demande/patrimoine-demande.client.view.html',
        title: 'Définition du patrimoine immoblier'
      },
      {
        templateUrl: 'modules/demandes/client/views/form-create-demande/revenu-demande.client.veiw.html',
        title: 'Definition des revenus'
      },
      {
        templateUrl: 'modules/demandes/client/views/form-create-demande/autre-revenu-demande.client.view.html',
        title: 'Autres revenus '
      },
      {
        templateUrl: 'modules/demandes/client/views/form-create-demande/creditencours-demande.client.view.html',
        title: 'Vos crédits encours'
      },
      {
        templateUrl: 'modules/demandes/client/views/form-create-demande/situationProfessionel-demande.client.view.html',
        title: 'Situation professionnelle'
      },
      {
        templateUrl: 'modules/demandes/client/views/form-create-demande/montantProjet-demande.client.view.html',
        title: 'Montant de votre  prêt'
      },
      {
        templateUrl: 'modules/demandes/client/views/form-create-demande/bank-demande.client.view.html',
        title: 'Banque principale'
      },
      {
        templateUrl: 'modules/demandes/client/views/form-create-demande/bankConsulte-demande.client.view.html',
        title: 'Avez vous déja consulté des banques'
      },
      {
        templateUrl: 'modules/demandes/client/views/form-create-demande/email-demande.client.view.html',
        title: 'Création de votre compte client'
      },
      {
        templateUrl: 'modules/demandes/client/views/form-create-demande/coordonnee-demande.client.view.html',
        title: 'Vos coordonnées'
      },
      {
        templateUrl: 'modules/demandes/client/views/form-create-demande/detail-demande.client.view.html',
        title: 'Récapitulatif de votre demande'
      }
    ];
    $scope.banques = banques;
    $scope.choicedNode;

    $scope.endNavigateTree = function(type) {
      vm.viewTreePanel = false;
      vm.viewFormPanel = true;
    };
    $scope.endTreeSelect = function(type) {
      $scope.choicedNode = type;
      $scope.endNavigateTree(type);
    };
    $scope.calcuulTauxNotaire = function() {
      $scope.demande.projet.fraisNotaire = ($scope.demande.projet.montantProjet * 7) / 100;
    };

    /**
     * saveDemande
     * la methode qui permet de sauvegarder une demande
     */
    $scope.saveDemande = function() {
      var demandeToSave = angular.copy($scope.demande);
      demandeToSave.projet.type = $scope.choicedNode;
      if ($scope.user) {
        UsersService.getMe()
        .then(function (response) {
          demandeToSave.client = response;
          DemandesService.save(demandeToSave)
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
        UsersService.userSignup($scope.demande.client)
        .then(function (response) {
          demandeToSave.client = response;
          DemandesService.save(demandeToSave)
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

    /**
     * onSaveSuccess description
     * @param  {Object} response
     * @return {Object} Notification
     */
    function onSaveSuccess(response) {
        // $state.go('demandes.view', { demandeId: response.id }, { reload: true });
    }

    /** TODO 1
     * gerer les differents retour de l'API et les personnalisées avec un message dans l'ecrant
     */

    /**
     * on Save Error
     * @param  {Object} err
     * @return {Object} Notification
     */
    function onSaveError(err) {
      console.log('une erreur est survenue à gerer ici');
    }


    /**
     * @name  choiceBanquePrincipale
     * @description : cette methode permet de choisir la banque principale
     * @param banque
     */
    $scope.choiceBanquePrincipale = function(banque) {
      $scope.demande.financement.banque = banque.libelle;
    };

    /**
     * @name  choiceBanqueConsulte
     * @description : cette methode permet de choisir un item dans la liste des banques consultées si la banque est deja selectionnée elle est alor supprimé de la lste
     * @param banque
     */
    $scope.choiceBanqueConsulte = function(banque) {
      var banqueIn = $filter('filter')($scope.demande.financement.banqueContacter, banque.libelle);
      banque.checked = !banque.checked;
      if (banqueIn && banqueIn.length < 1)
        $scope.demande.financement.banqueContacter.push(banque.libelle);
      else {
        $scope.demande.financement.banqueContacter = $filter('filter')($scope.demande.financement.banqueContacter, '!' + banque.libelle);
      }
    };
  }
}());
