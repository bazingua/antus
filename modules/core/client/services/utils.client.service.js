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
      isClientPro: isClientPro,
      isBankCanAddOffer: isBankCanAddOffer,
      statusDemendes: function () {
        /*
        Une demande dispose des états suivants :
          >DEPOSEE = SOUMISE(la demande est déposée par un client) => VALUE(etat)= 1
          >VALIDEE (la demande est validée par un administrateur ) => VALUE(etat) = 5
          >REJETEE (la demande est rejetée par un administrateur) => VALUE(etat) = 0
          >ACCEPTEE (Il existe au moins une banque qui a déposé une offre pour la demande)  => VALUE(etat) = 10
          >ARCHIVEE (la demande est archivée par un administrateur, sa cycle de vie se termine   )  => VALUE(etat) = -5
          */
        return [
          { code: 1, value: 'SOUMISE', libelle: 'Soumises' },
          { code: 5, value: 'VALIDEE', libelle: 'Validées' },
          { code: 0, value: 'REJETEE', libelle: 'Rejetées' },
          { code: 10, value: 'ACCEPTEE', libelle: 'Acceptées' },
          { code: -5, value: 'ARCHIVETED', libelle: 'Archivées' }
        ];
      },
      typeDemande: function () {
        /*
        Une demande sont des types suivantes :
          >Particulier
          >Profesionnnel
        */
        return [
          { value: 'PART.', libelle: 'Particulier' },
          { value: 'PRO.', libelle: 'Professionnel' }
        ];
      }
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
    function isClientPro() {
      return (_.indexOf(Authentication.user.roles, 'pro') > -1);
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
