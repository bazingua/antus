(function () {
  'use strict';

  angular
    .module('users')
    .controller('PasswordController', PasswordController);

  PasswordController.$inject = ['$scope', '$stateParams', 'UsersService', '$location', 'Authentication', 'PasswordValidator', 'Notification'];

  function PasswordController($scope, $stateParams, UsersService, $location, Authentication, PasswordValidator, Notification) {
    var vm = this;

    vm.resetUserPassword = resetUserPassword;
    vm.askForPasswordReset = askForPasswordReset;
    vm.authentication = Authentication;
    vm.getPopoverMsg = PasswordValidator.getPopoverMsg;

    // If user is signed in then redirect back home
    if (vm.authentication.user) {
      $location.path('/');
    }

    // Submit forgotten password account id
    function askForPasswordReset(isValid) {

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.forgotPasswordForm');

        return false;
      }

      UsersService.requestPasswordReset(vm.credentials)
        .then(onRequestPasswordResetSuccess)
        .catch(onRequestPasswordResetError);
    }

    // Change user password
    function resetUserPassword(isValid) {

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.resetPasswordForm');

        return false;
      }

      UsersService.resetPassword($stateParams.token, vm.passwordDetails)
        .then(onResetPasswordSuccess)
        .catch(onResetPasswordError);
    }

    // Password Reset Callbacks

    vm.sendedMail = false;
    function onRequestPasswordResetSuccess(response) {
      // Show user success message and clear form
      vm.credentials = null;
      vm.sendedMail = true; 
      Notification.success({ message: ' L\'email de réinitialisation de votre mot de passe est envoyé avec succes !', title: '<i class="glyphicon glyphicon-ok"></i> Réinitialisation de votre mot de passe!' });
    }

    function onRequestPasswordResetError(response) {
      // Show user error message and clear form
      vm.credentials = null;
      Notification.error({ message: 'Veuillez enter un email valide ' , title: '<i class="glyphicon glyphicon-remove"></i> Erreur lors de la réinitialisation de votre mot de passse', delay: 4000 });
    }

    function onResetPasswordSuccess(response) {
      // If successful show success message and clear form
      vm.passwordDetails = null;

      // Attach user profile
      Authentication.user = response;
      Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Réinitialisation du mot de passe avec succes!' });
      // And redirect to the index page
      $location.path('/password/reset/success');
    }

    function onResetPasswordError(response) {
      Notification.error({ message: response.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Réinitialisation du mot de passe', delay: 4000 });
    }

  }
}());
