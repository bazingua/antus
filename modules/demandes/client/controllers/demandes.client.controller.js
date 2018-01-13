(function () {
  'use strict';

  angular
    .module('demandes')
    .controller('DemandesController', DemandesController);

  DemandesController.$inject = ['$scope', 'DemandesModel', 'demande', 'Authentication', 'DemandesService'];

  function DemandesController($scope,DemandesModel, demande, Authentication, DemandesService) {
    var vm = this;
    console.log('°°°°°°°°°°°°°°°', demande);
    vm.demande = new DemandesModel(demande);
    vm.authentication = Authentication;
  }
}());
