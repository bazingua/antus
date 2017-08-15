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
      this.prime = data.prime || '';
    }

    return RevenuModel;
  }

]);

