angular.module('offres.model').factory('OffresModel', [
  /**
   * @description offres model
   * @returns {OffresModel}
   */
  function () {
    'use strict';
    /**
     *Descript: model's contructor
     * @param data
     * @constructor
     */
    function OffresModel(data) {
      data = data || {};
      this.id = data.id || 0;
    }

    return OffresModel;
  }

]);

