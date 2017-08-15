angular.module('demandes.model').factory('DemandesModel', [
  /**
   * @description Demandes model
   * @returns {DemandesModel}
   */
  function () {
    'use strict';
    /**
     *Descript: model's contructor
     * @param data
     * @constructor
     */
    function DemandesModel(data) {
      data = data || {};
      // Demande's Code
      this.id= data.id || 0;
    }

    return DemandesModel;
  }

]);

