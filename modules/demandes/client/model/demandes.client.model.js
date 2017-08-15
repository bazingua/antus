angular.module('demandes.model').factory('DemandesModel', ['ProjetModel', 'PatrimoineModel', 'FinancementModel', 'UserModel',
  /**
   * @description Demandes model
   * @returns {DemandesModel}
   */
  function (ProjetModel, PatrimoineModel, FinancementModel, UserModel) {
    'use strict';
    /**
     *Descript: model's contructor
     * @param data
     * @constructor
     */
    function DemandesModel(data) {
      data = data || {};
      this.id= data.id || 0;
      this.projet = new ProjetModel(data.projet);
      this.patrimoine = new PatrimoineModel(data.patrimoine);
      this.financement = new FinancementModel(data.financement);
      this.client = new UserModel(data.client);
    }

    return DemandesModel;
  }

]);

