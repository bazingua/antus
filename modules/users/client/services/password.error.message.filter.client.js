(function () {
  'use strict';

  angular.module('users.services').filter('passwordErrorMessageFilter', function () {
    return function (items, search) {
      var result = [];
      angular.forEach(items, function (value, key) {
        switch (value) {
          case 'The password must be at least 10 characters long.':
            result.push('Le mot de passe doit contenir au moins 10 caractères.');
            break;
          case 'The password must contain at least one uppercase letter.':
            result.push('le mot de passe doit contenir au moins une lettre en majuscule.');
            break;
          case 'The password must contain at least one number.':
            result.push('Le mot de passse doit contenir au moins un chiffre.');
            break;
          case 'The password must contain at least one special character.':
            result.push('Le mot de passe doit contenir au moins un caractère spécial.');
            break;
        }
      });
      return result;
    }
  });

}());
