angular.module('demandes.model').factory('RevenuModel', [
  /**
   * @description Revenu model
   * @returns {RevenuModel}
   */
  function () {
    'use strict';
    /**
     *Descript: model's contructor
     * @param data
     * @constructor
     */
    function RevenuModel(data) {
      data = data || {};
      this.mensuel = data.mensuel || '';
      this.nbrMois = data.nbrMois || 0;
      this.prime = data.prime || '';
      this.locatif = data.locatif || '';
      this.pensionAlimentaire = data.pensionAlimentaire || '';
      this.cessionSalaire = data.cessionSalaire || 0;
    }

    return RevenuModel;
  }

]);

