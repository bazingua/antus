(function () {
  'use strict';

  // Offres controller
  angular
    .module('offres')
    .controller('OffresController', OffresController);

  OffresController.$inject = ['$scope', 'DemandesService','$state', '$window', 'Authentication', 'offreResolve','Utils','demandeResolve','Notification'];

  function OffresController ($scope, DemandesService,$state, $window, Authentication, offreResolve,Utils,demandeResolve,Notification) {
    var vm = this;

    vm.authentication = Authentication;
    $scope.offre = offreResolve;
    $scope.demande = demandeResolve;
   // vm.utilsServ = Utils;
    $scope.utilsServ = Utils;
    console.log('++++', $scope.offre);
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    $scope.TransfererOffre = function () {
      DemandesService.transfererOffre($scope.demande.id,$scope.offre.id)
      .then(successCallback)
      .catch(errorCallback);
    }
    $scope.ChoisirOffre = function () {
      DemandesService.transfererOffre($scope.demande.id,$scope.offre.id)
      .then(successCallback)
      .catch(errorCallback);
    }
    function successCallback(res) {
      Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Offre transferer avec succes' });
         
    }
    function errorCallback(error) {
      $scope.error = error.data;
    }

    // Remove existing Offre
    function remove() {
      /* if ($window.confirm('Are you sure you want to delete?')) {
        vm.offre.$remove($state.go('offres.list'));
      }
      */
    }

    // Save Offre
    function save(isValid) {
      /* if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.offreForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.offre._id) {
        vm.offre.$update(successCallback, errorCallback);
      } else {
        vm.offre.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('offres.view', {
          offreId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
      */
    }
  }
}());
