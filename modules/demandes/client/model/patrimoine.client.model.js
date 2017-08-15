angular.module('demandes.model').factory('PatrimoineModel', [
  /**
   * @description Patrimoine model
   * @returns {PatrimoineModel}
   */
  function () {
    'use strict';
    /**
     *Descript: model's contructor
     * @param data
     * @constructor
     */
    function PatrimoineModel(data) {
      data = data || {};
      this.id= data.id || 0;
      this.revenu = data.revenu;
      this.profession = data.profession;
      
    }

    return PatrimoineModel;
  }

]);

