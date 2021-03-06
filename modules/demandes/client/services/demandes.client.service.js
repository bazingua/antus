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

      getById: { method: 'GET', params: { demandeId: '@demandeId' }, isArray: false },
      findDemande: { method: 'GET', url: '/api/demandes?user=:user&etat=:etat', isArray: true },
      remove: { method: 'PUT', url: '/api/logicdelete/:demandeId/:state', params: { demandeId: '@demandeId', state: '@state' } },
      deposerOfr: { method: 'PUT', url: '/api/demandes/:demandeId/offre/deposer', params: { demandeId: '@demandeId' } },
      validerDmd: { method: 'PUT', url: '/api/demandes/:demandeId/valider', params: { demandeId: '@demandeId' } },
      archiverDmd: { method: 'PUT', url: '/api/demandes/:demandeId/cloturer', params: { demandeId: '@demandeId' } },
      rejeterDmd: { method: 'PUT', url: '/api/demandes/:demandeId/rejeter', params: { demandeId: '@demandeId' } },
      transfererOfr: { method: 'PUT', url: '/api/demandes/:demandeId/offre/:offreId/transferer', params: { demandeId: '@demandeId', offreId: '@offreId' } },
      ChoixOffre: { method: 'PUT', url: '/api/demandes/:demandeId/offre/:offreId/choisir', params: { demandeId: '@demandeId', offreId: '@offreId' } },
      update: { method: 'PUT' },
      saveDemande: { method: 'POST', url: '/api/demandes' },
      saveDemandePro: { method: 'POST', url: '/api/demandespro' }
    });

    angular.extend(Demande, {
      /**
       *transfererOffre
        Cette fonction permet transferer une offre deja deposé ,
       *  @param demandeId: l'id de la demande
       */
      get: function (id) {
        return this.getById({ demandeId: new String(id) }).$promise;
      },
      save: function (demande) {
        if (demande.id) {
          return this.$update({
            demandeId: demande.id
          }, demande).$promise;
        } else {
          return this.saveDemande(demande).$promise;
        }
      },

      savePro: function (demande) {
        if (demande.id) {
          return this.$update({
            demandeId: demande.id
          }, demande).$promise;
        } else {
          return this.saveDemandePro(demande).$promise;
        }
      },
      /**
       *find
        Cette fonction persmet de rechercher de returner la lsite des demande,
       *  @param user: l'id d'un utulisateur,
       * si ce parametre(user) est renseigné la fonction retourne les demandes créées par cet utilisateur
       */
      find: function (query) {
        var query = query || {};
        query.user = !query.user ? '*' : query.user;
        return this.findDemande(query).$promise;
      },
      /**
       * remove
       * Cette fonction permet de supprimer logiquement une demande,
       *  @param demandeId: l'id de la demande
       */
      remove: function (demandeId) {
        return this.remove({ demandeId: demandeId, state: false }).$promise;
      },
      /**
       *validerDemande
        Cette fonction permet de valider une demande ,
       *  @param demandeId: l'id de la demande
       */
      validerDemande: function (demandeId) {
        return this.validerDmd({ demandeId: demandeId }).$promise;
      },

      ArchiverDemande: function (demandeId) {
        return this.archiverDmd({ demandeId: demandeId }).$promise;
      },

      RejeterDemande: function (demandeId) {
        return this.rejeterDmd({ demandeId: demandeId }).$promise;
      },
      /**
       *deposerOffre
        Cette fonction permet de une offre sur une demande ,
       *  @param demandeId: l'id de la demande
       * @param offre:l'offre qu'on veux deposer
       */
      deposerOffre: function (demandeId, offre) {
        return this.deposerOfr({ demandeId: demandeId }, offre).$promise;
      },
      ChoisirOffre: function (demandeId, offreId) {
        return this.ChoixOffre({ demandeId: demandeId, offreId: offreId }).$promise;
      },
      /**
       *transfererOffre
        Cette fonction permet transferer une offre deja deposé ,
       *  @param demandeId: l'id de la demande
       * @param offreId:l'id de l'offre
       */
      transfererOffre: function (demandeId, offreId) {
        return this.transfererOfr({ demandeId: demandeId, offreId: offreId }).$promise;
      }
    });
    return Demande;
  }
}());
