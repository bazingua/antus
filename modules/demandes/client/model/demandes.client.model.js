angular.module('demandes.model').factory('DemandesModel', ['ProjetModel', 'PatrimoineModel', 'FinancementModel', 'ProfessionModel', 'UserModel',
  /**
   * @description Demandes model
   * @returns {DemandesModel}
   */
  function (ProjetModel, PatrimoineModel, FinancementModel, ProfessionModel, UserModel) {
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
      this.profession = new ProfessionModel(data.profession);
      this.financement = new FinancementModel(data.financement);
      this.client = new UserModel(data.client);
    }

    return DemandesModel;
  }

]);

