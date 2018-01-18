(function () {
  'use strict';

  // Offres controller
  angular
    .module('offres')
    .controller('OffresDeposerController', OffresDeposerController);

  OffresDeposerController.$inject = ['$scope', '$state', '$stateParams', '$window', 'Authentication', 'OffresModel', 'DemandesService','Notification'];

  function OffresDeposerController ($scope, $state, $stateParams, $window, Authentication, OffresModel, DemandesService, Notification) {
    var vm = this;
    vm.authentication = Authentication;
    vm.offre = new OffresModel();
    vm.offre.demandeId = $stateParams.demandeId;
    vm.error = null;

    // Save Offre
    vm.deposerOffre = function (isValid) {
      isValid = true;
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.offreForm');
        return false;
      }

      DemandesService.deposerOffre(vm.offre.demandeId, vm.offre)
      .then(successCallback)
      .catch(errorCallback);

      function successCallback(res) {
        console.log('res', res);
        $state.go('userHome.banque');
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Offre enregisté avec success' });
      }

      function errorCallback(error) {
        console.log('error', error);
        vm.error = error.data.message;
      }
    }
  }
}());
