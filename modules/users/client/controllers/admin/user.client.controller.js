(function () {
  'use strict';

  angular
    .module('users.admin')
    .controller('AdminController', AdminController);

  AdminController.$inject = ['$rootScope','$scope', '$state', '$window', 'Authentication', 'userResolve', 'Notification', 'demandes', 'UsersService'];

  function AdminController($rootScope, $scope, $state, $window, Authentication, user, Notification, demandes, UsersService) {
    var vm = this;
    vm.authentication = Authentication;
    vm.user = user;
    vm.remove = remove;
    vm.update = update;
    vm.demandes = demandes;
    vm.isContextUserSelf = isContextUserSelf;

    function remove(user) {
      if ($window.confirm('Are you sure you want to delete this user?')) {
        if (user) {
          user.$remove();

          vm.users.splice(vm.users.indexOf(user), 1);
          Notification.success('User deleted successfully!');
        } else {
          vm.user.$remove(function () {
            $state.go('admin.users');
            Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> User deleted successfully!' });
          });
        }
      }
    }

    function update(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.userForm');

        return false;
      }

      var user = vm.user;

      user.$update(function () {
        $state.go('admin.user', {
          userId: user._id
        });
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> User saved successfully!' });
      }, function (errorResponse) {
        Notification.error({ message: errorResponse.data.message, title: '<i class="glyphicon glyphicon-remove"></i> User update error!' });
      });
    }

    function isContextUserSelf() {
      return vm.user.username === vm.authentication.user.username;
    }

    vm.createuser = function (isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.userForm');
        return false;
      }
      vm.credentials.nom = vm.credentials.prenom;
      vm.credentials.roles = [];
      vm.credentials.roles.push('banque');
      UsersService.createUser(vm.credentials)
        .then(onCreateBankSuccess)
        .catch(onCreateBankError);
    }

    function onCreateBankSuccess(response) {
      vm.authentication.user = response;
      Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Le compte est crée avec succes!' });
      $state.go('admin.user.banques');
    }

    function onCreateBankError(response) {
      Notification.error({ message: response.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Une erreur est survenue lors de la creation du compte!', delay: 6000 });
    }
  }
}());
