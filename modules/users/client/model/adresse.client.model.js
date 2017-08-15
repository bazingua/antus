angular.module('users.model').factory('AdresseModel', [
  /**
   * @description Projets model
   * @returns {AdresseModel}
   */
  function () {
    'use strict';
    /**
     *Descript: model's contructor
     * @param data
     * @constructor
     */
    function AdresseModel(data) {
      data = data || {};
      this.id = data.id || 0;
    }

    return AdresseModel;
  }

]);

