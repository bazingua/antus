(function () {
  'use strict';

  // Offres controller
  angular
    .module('offres')
    .controller('OffresController', OffresController);

  OffresController.$inject = ['$scope', 'DemandesService','$state', '$window', 'Authentication', 'offreResolve','Utils','demandeResolve','Notification','$stateParams','$uibModalInstance'];

  function OffresController ($scope, DemandesService,$state, $window, Authentication, offreResolve,Utils,demandeResolve,Notification,$stateParams,$uibModalInstance) {
    var vm = this;

    vm.authentication = Authentication;
    $scope.offre = offreResolve;
    $scope.demande = demandeResolve;
   // vm.utilsServ = Utils;
    $scope.utilsServ = Utils;
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
      DemandesService.ChoisirOffre($scope.demande.id,$scope.offre.id)
      .then(successCallback)
      .catch(errorCallback);
    }
    $scope.dismiss = function () {
      $uibModalInstance.dismiss();
    }
    function successCallback(res) {
      Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Opération reussie avec succes' });
      $uibModalInstance.dismiss();
      $state.transitionTo($state.current, $stateParams, {
        reload: true,
        inherit: false,
        notify: true
      });
         
    }
    function errorCallback(error) {
      Notification.error({ message: '<i class="glyphicon glyphicon-minus-sign"></i>  Opération non reussie ' });
      
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
