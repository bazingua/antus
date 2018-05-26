(function() {
  'use strict';
  angular
    .module('demandes')
    .controller('DeposerDemandesProController', DeposerDemandesProController);

  DeposerDemandesProController.$inject = ['$scope', '$state', 'DemandesService', 'typeDemande', 'banques', 'DemandesModel', '$filter', 'Authentication', 'UsersService', 'Notification'];
  function DeposerDemandesProController($scope, $state, DemandesService, typeDemande, banques, DemandesModel, $filter, Authentication, UsersService, Notification) {
    var vm = this;
    vm.viewTreePanel = true;
    vm.viewFormPanel = false;
    vm.typeDemande = typeDemande;
    $scope.typeDemande = vm.typeDemande;
    console.log('vm.typeDemande', vm.typeDemande);
  }
}());
