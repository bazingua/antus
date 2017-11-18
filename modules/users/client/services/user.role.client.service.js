(function () {
  'use strict';

  angular
    .module('core')
    .factory('UserRoleService', UserRoleService);

  UserRoleService.$inject = ['Authentication'];
  function UserRoleService(Authentication) {
    var service = {
      checkAdminRules: checkAdminRules,
      formaterDate: formaterDate
    };
    return service;

    /**
     * verifie si le user est un admin ou pas 
     */
    function checkAdminRules() {
      var isAdmin = false;
      if (Authentication && Authentication.user && _.indexOf(Authentication.user.roles, 'admin') > -1) {
        isAdmin = true;
      }
      return isAdmin;
    };
       /**
     * formaterDate
     * @description retrourne une date au format dd/MM/YYYY 
     * @param (String) Date au format dd/MM/YYYY
     * @return {Object} Object
     */
    function formaterDate(date) {
      if (!date) {
        return '';
      }
      var pattern = /(\d{2})\/(\d{2})\/(\d{4})/;
      var dt = new Date(date.replace(pattern, '$3-$2-$1'));
      return dt;
    };
  }
}());
