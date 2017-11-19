(function () {
  'use strict';

  angular
    .module('demandes')
    .controller('DemandesListController', DemandesListController);

  DemandesListController.$inject = ['$rootScope', '$scope', 'DemandesService', 'demandes'];

  function DemandesListController($rootScope, $scope, DemandesService, demandes) {
    var vm = this;
    vm.demandes = demandes;
    console.log('deamndes', vm.demandes);
  }
}());
