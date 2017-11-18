(function () {
  'use strict';

  angular
    .module('core')
    .controller('HeaderController', HeaderController);

  HeaderController.$inject = ['$scope', '$rootScope', '$state', 'Authentication', 'menuService', 'UserRoleService', 'SignOutService'];

  function HeaderController($scope, $rootScope,$state, Authentication, menuService, UserRoleService, SignOutService) {
    var vm = this;
    vm.accountMenu = menuService.getMenu('account').items[0];
    vm.authentication = Authentication;
    vm.isCollapsed = false;
    vm.menu = menuService.getMenu('topbar');

    $scope.$on('$stateChangeSuccess', stateChangeSuccess);

    function stateChangeSuccess() {
      // Collapsing the menu after navigation
      vm.isCollapsed = false;
    }
    vm.isAdmin = UserRoleService.checkAdminRules();
    // console.log(vm.isAdmin);
    $scope.signoutCurrentUser = function () {
      SignOutService.get().$promise.then(function() {
        $state.go('home');
        location.reload();
        //Notification.success({ message: '<i class="glyphicon glyphicon-remove"></i> ' +), delay: 6000 });
      }, function () {
        Notification.error({ message: '<i class="glyphicon glyphicon-remove"></i> ' + 'Une erreur est survenue', delay: 6000 });
      });
    };
    
  }
}());
