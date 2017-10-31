(function () {
  'use strict';

  angular
    .module('demandes')
    .controller('DemandesController', DemandesController);

  DemandesController.$inject = ['$scope', 'DemandesModel', 'demande', 'Authentication', 'DemandesService'];

  function DemandesController($scope,DemandesModel, demande, Authentication, DemandesService) {
    var vm = this;
    console.log('Before', demande);
    vm.demande = new DemandesModel(demande);
    console.log('After', vm.demande);
    vm.authentication = Authentication;
  }
}());
