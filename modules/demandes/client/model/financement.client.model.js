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
      this.id= data.id || 0;
      this.apport = data.apport;
      this.duree = data.duree;
      this.versement = data.versement;
    }

    return FinancementModel;
  }

]);

