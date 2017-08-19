angular.module('demandes.model').factory('FinancementModel', [
  /**
   * @description Financement model
   * @returns {FinancementModel}
   */
  function () {
    'use strict';
    /**
     *Descript: model's contructor
     * @param data
     * @constructor
     */
    function FinancementModel(data) {
      data = data || {};
      this.apport = data.apport || '';
      this.duree = data.duree || 0; // nombre de mois
      this.versement = data.versement || '';
      this.banque = data.banque || '';
      this.banqueContacter = data.banqueContacter || [];
    }

    return FinancementModel;
  }

]);

