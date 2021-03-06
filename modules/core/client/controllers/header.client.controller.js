(function () {
  'use strict';

  angular
    .module('core')
    .controller('HeaderController', HeaderController);

  HeaderController.$inject = ['$scope', '$timeout', '$rootScope', '$state', 'Authentication', 'menuService', 'UserRoleService', 'SignOutService','Utils'];

  function HeaderController($scope, $timeout, $rootScope,$state, Authentication, menuService, UserRoleService, SignOutService,Utils) {
    var vm = this;
    vm.accountMenu = menuService.getMenu('account').items[0];
    vm.authentication = Authentication;
    vm.isCollapsed = false;
    vm.menu = menuService.getMenu('topbar');
    vm.utils = Utils;
    if (vm.authentication.user) {
      if (_.indexOf( vm.authentication.user.roles, 'user') > -1) {
        $rootScope.espaceUser = 'Espace Client';
      } else if (_.indexOf( vm.authentication.user.roles, 'banque') > -1) {
        $rootScope.espaceUser = 'Espace Banque';
      }  else if (_.indexOf( vm.authentication.user.roles, 'pro') > -1) {
        $rootScope.espaceUser = 'Espace Client';
      } else {
        $rootScope.espaceUser = 'Espace Administrateur';
      }
    }
    
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
        $timeout(function() {
        location.reload();
        }, 500);
      }, function () {
        Notification.error({ message: '<i class="glyphicon glyphicon-remove"></i> ' + 'Une erreur est survenue', delay: 6000 });
      });
    };
    $scope.goToSpace = function () {
      if (vm.authentication.user) {
        if (_.indexOf(vm.authentication.user.roles, 'user') > -1) {
          $state.go('userHome.client');
        } else if (_.indexOf(vm.authentication.user.roles, 'banque') > -1) {
          $state.go('userHome.banque');
        } else if (_.indexOf(vm.authentication.user.roles, 'pro') > -1) {
          $state.go('userHome.client');
        }else {
          $state.go('homeadmin');
        }
      }
    };
  }
}());
