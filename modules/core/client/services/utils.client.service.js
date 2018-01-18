(function () {
  'use strict';

  angular
    .module('core')
    .factory('Utils', Utils);

  Utils.$inject = ['Authentication'];

  function Utils(Authentication) {
    var service = {
      isBank: isBank,
      isAdmin: isAdmin,
      isClient: isClient,
      isBankCanAddOffer: isBankCanAddOffer
    };

    return service;

    function isBank() {
      return (_.indexOf(Authentication.user.roles, 'banque') > -1);
    }

    function isAdmin() {
      return (_.indexOf(Authentication.user.roles, 'admin') > -1);
    }

    function isClient() {
      return (_.indexOf(Authentication.user.roles, 'user') > -1);
    }
    function isBankCanAddOffer(demande) {
      if (!demande.offres.length)
        return true;
      else {
        _.filter(demande.offres, function(item) { return item.banque.email === Authentication.user.email; });
      }
    }
  }
}());
