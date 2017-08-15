angular.module('demandes.model').factory('ProfessionModel', [
  /**
   * @description Profession model
   * @returns {ProfessionModel}
   */
  function () {
    'use strict';
    /**
     *Descript: model's contructor
     * @param data
     * @constructor
     */
    function ProfessionModel(data) {
      data = data || {};
      this.id= data.id || 0;
    }

    return ProfessionModel;
  }

]);

