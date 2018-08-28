  (function () {
    'use strict';

    angular
    .module('users')
    .controller('ClientHomeController', ClientHomeController);

    ClientHomeController.$inject = ['$scope', '$state', '$stateParams', 'DemandesModel', '$timeout', 'demandes', 'Authentication', 'DemandesService', 'Utils'];

    function ClientHomeController($scope, $state, $stateParams, DemandesModel, $timeout, demandes, Authentication, DemandesService, Utils) {
      var vm = this;
      if (!Authentication && !demandes.length)
        $state.go('authentication.signin', { reload: true });
      vm.authentication = Authentication.user ? Authentication : { user: demandes.length ? demandes[0].client : {} };
      vm.demandes = angular.copy(demandes);
      vm.feedBackMessage = true;
      $timeout(function() {
        vm.feedBackMessage = false;
      }, 100000);
      vm.utils = Utils;
    }
  }());
