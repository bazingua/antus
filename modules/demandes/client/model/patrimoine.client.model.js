angular.module('demandes.model').factory('PatrimoineModel', [ 'RevenuModel', 'ProfessionModel',
  /**
   * @description Patrimoine model
   * @returns {PatrimoineModel}
   */
  function (RevenuModel, ProfessionModel) {
    'use strict';
    /**
     *Descript: model's contructor
     * @param data
     * @constructor
     */
    function PatrimoineModel(data) {
      data = data || {};
      this.revenu = new RevenuModel(data.revenu);
      this.profession = new ProfessionModel(data.profession);

    }

    return PatrimoineModel;
  }

]);

