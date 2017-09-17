(function() {
    'use strict';

    angular
        .module('demandes')
        .controller('DeposerDemandesController', DeposerDemandesController);

    DeposerDemandesController.$inject = ['$scope', 'DemandesService', 'typeDemande', 'banques', 'DemandesModel', '$filter'];

    function DeposerDemandesController($scope, DemandesService, typeDemande, banques, DemandesModel, $filter) {
        // typeDemande = arbre
        var vm = this;

        vm.typeDemande = typeDemande;
        $scope.typeDemande = typeDemande;
        $scope.demande = new DemandesModel();
        vm.viewTreePanel = true;
        vm.viewFormPanel = false;
        $scope.current = 0;
        // $scope.node = $scope.typeDemande;
        vm.steps = [{
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
        $scope.choicedNode;
        $scope.endTreeSelect = function(type) {
            $scope.choicedNode = type;
            vm.viewTreePanel = false;
            vm.viewFormPanel = true;
        };
        $scope.endNavigateTree = function(type) {
            vm.viewTreePanel = false;
            vm.viewFormPanel = true;
        };



        $scope.saveDemande = function() {
            var demandeToSave = angular.copy($scope.demande);
            console.log('save now', $scope.demande);
            /*DemandesService.save(demandeToSave)
                .then(onSaveSuccess)
                .catch(onSaveError);
                */
        };

        /**
         * onSaveSuccess description
         * @param  {Object} response
         * @return {Object} Notification
         */
        function onSaveSuccess(response) {
            // $state.go('demandes.view', { demandeId: response.id }, { reload: true });
        }

        /**TODO 1
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
            if (banqueIn.length < 1)
                $scope.demande.financement.banqueContacter.push(banque.libelle);
            else {
                $scope.demande.financement.banqueContacter = $filter('filter')($scope.demande.financement.banqueContacter, '!' + banque.libelle);
            }
        };
    }
}());