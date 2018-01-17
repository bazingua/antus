(function () {
  'use strict';

  // Offres controller
  angular
    .module('offres')
    .controller('OffresController', OffresController);

  OffresController.$inject = ['$scope', '$state', '$window', 'Authentication', 'offreResolve'];

  function OffresController ($scope, $state, $window, Authentication, offreResolve) {
    var vm = this;

    vm.authentication = Authentication;
    $scope.offre = offreResolve;
    console.log('++++', $scope.offre);
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

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
