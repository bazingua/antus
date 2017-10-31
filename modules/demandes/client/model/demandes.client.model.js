angular.module('demandes.model').factory('DemandesModel', ['ProjetModel', 'PatrimoineModel', 'FinancementModel', 'UserModel', 'ApportModel',
  /**
   * @description Demandes model
   * @returns {DemandesModel}
   */
  function (ProjetModel, PatrimoineModel, FinancementModel, UserModel, ApportModel) {
    'use strict';
    /**
     *Descript: model's contructor
     * @param data
     * @constructor
     */
    function DemandesModel(data) {
      data = data || {};
      this.id = data.id || data._id || 0;
      this.projet = new ProjetModel(data.projet);
      this.patrimoine = new PatrimoineModel(data.patrimoine);
      this.financement = new FinancementModel(data.financement);
      this.client = new UserModel(data.client);
      this.apport = new ApportModel(data.apport);
      this.offres = data.offres || [];
      this.created = data.created,
      this.etat = data.etat || 1,
      this.active = data.active,
      this.updated = data.updated,
      this.isCurrentUserOwner = data.isCurrentUserOwner
    }

    return DemandesModel;
  }

]);

