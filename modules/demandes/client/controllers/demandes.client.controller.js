(function () {
  'use strict';

  angular
    .module('demandes')
    .controller('DemandesController', DemandesController);

  DemandesController.$inject = ['$scope', 'DemandesModel', 'demande', 'Authentication', 'DemandesService','Utils', '$uibModal'];

  function DemandesController($scope,DemandesModel, demande, Authentication, DemandesService,Utils, $uibModal) {
    var vm = this;
    console.log('°°°°°°°°°°°°°°°', demande);
    vm.demande = new DemandesModel(demande);
    vm.authentication = Authentication;
    vm.utilsServ = Utils;
    vm.stateOffre = false;
    $scope.showViewOffre = function (offre) {
      $uibModal.open({
        templateUrl: '/modules/offres/client/views/view-offre.client.view.html',
        controller: 'OffresController',
        size: 'lg',
        resolve: {
          offreResolve: function () {
            return offre;
          }
        }
      });
    };
  }
}());
