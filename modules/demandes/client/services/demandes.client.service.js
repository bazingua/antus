(function () {
  'use strict';

  angular
    .module('demandes.services')
    .factory('DemandesService', DemandesService);

  DemandesService.$inject = ['$resource', '$log'];

  function DemandesService($resource, $log) {
    var Demande = $resource('/api/demandes/:demandeId', {
      demandeId: '@_id'
    }, {

      get: { method: 'GET' },
      findDemande: { method: 'GET', url: '/api/demandes?user=:user', isArray: true },
      remove: { method: 'PUT', url: '/api/logicdelete/:demandeId/:state' },
      deposerOffre: { method: 'PUT', url: '/api/demandes/:demandeId/offre/deposer' },
      transfererOffre: { method: 'PUT', url: '/api/demandes/:demandeId/offre/:offreId/transferer' },
      update: { method: 'PUT' }
    });

    angular.extend(Demande, {
      /**
       *transfererOffre
        Cette fonction permet transferer une offre deja deposé ,
       *  @param demandeId: l'id de la demande
       */
      get: function (demandeId) {
        return this.get({ demandeId: demandeId }).$promise;
      },
      save: function (demande) {
        if (demande.id) {
          return this.$update({
            demandeId: demande.id
          }, demande).$promise;
        } else {
          return this.$save(demande).$promise;
        }
      },
      /**
       *find
        Cette fonction permet de rechercher de returner la lsite des demande,
       *  @param user: l'id d'un utulisateur,
       * si ce parametre(user) est renseigné la fonction retourne les demandes créées par cet utilisateur
       */
      find: function (userId) {
        userId = !userId ? '*' : userId;
        return this.findDemande({ user: new String(userId) }).$promise;
      },
      /**
       * remove
       * Cette fonction permet de supprimer logiquement une demande,
       *  @param demandeId: l'id de la demande
       * @param state: permet de dire si on supprime où si on reactive, prend true en cas de suppression
       */
      remove: function (demandeId, state) {
        return this.remove({ demandeId: demandeId, state: state }).$promise;
      },
      /**
       *deposerOffre
        Cette fonction permet de une offre sur une demande ,
       *  @param demandeId: l'id de la demande
       * @param offre:l'offre qu'on veux deposer
       */
      deposerOffre: function (demandeId, offre) {
        return this.deposerOffre({ demandeId: demandeId }, offre).$promise;
      },
      /**
       *transfererOffre
        Cette fonction permet transferer une offre deja deposé ,
       *  @param demandeId: l'id de la demande
       * @param offreId:l'id de l'offre
       */
      transfererOffre: function (demandeId, offreId) {
        return this.transfererOffre({ demandeId: demandeId, offreId: offreId }).$promise;
      }
    });
    return Demande;
  }
}());
