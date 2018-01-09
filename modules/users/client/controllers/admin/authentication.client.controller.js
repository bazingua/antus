(function () {
  'use strict';

  angular
    .module('users')
    .controller('AdminAuthenticationController', AdminAuthenticationController);

  AdminAuthenticationController.$inject = ['$scope', '$rootScope', '$state', '$timeout', 'SignOutService', 'UsersService', '$location', '$window', 'Authentication', 'PasswordValidator', 'Notification'];

  function AdminAuthenticationController($scope, $rootScope, $state, $timeout, SignOutService, UsersService, $location, $window, Authentication, PasswordValidator, Notification) {
    var vm = this;

    vm.authentication = Authentication;
    vm.getPopoverMsg = PasswordValidator.getPopoverMsg;
    vm.signup = signup;
    vm.signin = signin;
    vm.callOauthProvider = callOauthProvider;
    vm.usernameRegex = /^(?=[\w.-]+$)(?!.*[._-]{2})(?!\.)(?!.*\.$).{3,34}$/;

    // Get an eventual error defined in the URL query string:
    if ($location.search().err) {
      Notification.error({ message: $location.search().err });
    }

    // If user is signed in then redirect back home
    if (vm.authentication.user) {
      $location.path('/');
    }

    function signup(isValid) {

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.userForm');

        return false;
      }
      vm.credentials.roles = [];
      vm.credentials.roles.push('admin');
      UsersService.userSignup(vm.credentials)
        .then(onUserSignupSuccess)
        .catch(onUserSignupError);
    }

    function signin(isValid) {

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.userForm');

        return false;
      }

      UsersService.userSignin(vm.credentials)
        .then(onUserSigninSuccess)
        .catch(onUserSigninError);
    }

    // OAuth provider request
    function callOauthProvider(url) {
      if ($state.previous && $state.previous.href) {
        url += '?redirect_to=' + encodeURIComponent($state.previous.href);
      }

      // Effectively call OAuth authentication route:
      $window.location.href = url;
    }

    // Authentication Callbacks

    var signoutCurrentUser = function () {
      SignOutService.get().$promise.then(function() {
        $state.go('home');
        $timeout(function() {
        location.reload();
        }, 500);
      }, function () {
        Notification.error({ message: '<i class="glyphicon glyphicon-remove"></i> ' + 'Une erreur est survenue', delay: 6000 });
      });
    };

    function onUserSignupSuccess(response) {
      // If successful we assign the response to the global user model
      vm.authentication.user = response;
      Notification.success({title: response.title,  message: '<i class="glyphicon glyphicon-ok"></i> ' + response.message }, 15000);
      // And redirect to the previous or home page
      //document.getElementById("deconexion").click();
      signoutCurrentUser();
      // $state.go('home');
    }

    function onUserSignupError(response) {
      Notification.error({ message: response.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Signup Error!', delay: 6000 });
    }

    function onUserSigninSuccess(response) {
      // If successful we assign the response to the global user model
      vm.authentication.user = response;
      Notification.info({ message: 'Bienvenue ' + response.prenom });
      console.log(response.roles);
      // And redirect to the previous or home page
      if (_.indexOf(response.roles, 'user') > -1) {
        $rootScope.espaceUser = 'Espace Client';
        $state.go('userHome.client');
      } else if (_.indexOf(response.roles, 'admin') > -1) {
        $rootScope.espaceUser = 'Espace Administrateur';
        $state.go('homeadmin');
      } else if (_.indexOf(response.roles, 'banque') > -1) {
        $rootScope.espaceUser = 'Espace Banque';
        $state.go('userHome.banque');
      } else {
        $state.go($state.previous.state.name || 'home', $state.previous.params);
      }
    }

    function onUserSigninError(response) {
      Notification.error({ message: response.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Signin Error!', delay: 6000 });
    }
  }
}());
