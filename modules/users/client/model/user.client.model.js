angular.module('demandes.model').factory('ProjetModel', [
  /**
   * @description Projets model
   * @returns {ProjetModel}
   */
  function () {
    'use strict';
    /**
     *Descript: model's contructor
     * @param data
     * @constructor
     */
    function ProjetModel(data) {
      data = data || {};
      this.id= data.id || 0;
    }

    return ProjetModel;
  }

]);

