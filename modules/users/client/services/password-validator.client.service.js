(function () {
  'use strict';

  // PasswordValidator service used for testing the password strength
  angular
    .module('users.services')
    .factory('PasswordValidator', PasswordValidator);

  PasswordValidator.$inject = ['$window'];

  function PasswordValidator($window) {
    var owaspPasswordStrengthTest = $window.owaspPasswordStrengthTest;

    var service = {
      getResult: getResult,
      getPopoverMsg: getPopoverMsg
    };

    return service;

    function getResult(password) {
      var result = owaspPasswordStrengthTest.test(password);
      return result;
    }

    function getPopoverMsg() {
      var popoverMsg = 'Veuillez saisir  un mot de passe comportant 10 caractères ou plus, des chiffres, des minuscules, des majuscules et des caractères spéciaux ' + owaspPasswordStrengthTest.configs.minLength + ' ou plus de caractères, chiffres, minuscules, majuscules, majuscules et caractères spéciaux.';

      return popoverMsg;
    }
  }

}());
