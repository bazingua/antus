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

    $scope.endNavigateTree = function(type) {
      vm.viewTreePanel = false;
      vm.viewFormPanel = true;
    };
    $scope.choicedNode;
    $scope.endTreeSelect = function(type) {
      $scope.choicedNode = type;
      $scope.endNavigateTree(type);
    };
  }
}());
