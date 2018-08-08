angular.module('demandes.model').factory('CreditEncoursModel', [
  /**
   * @description Credit Encours model
   * @returns {CreditEncoursModel}
   */
  function () {
    'use strict';
    /**
     *Descript: model's contructor
     * @param data
     * @constructor
     */
    function CreditEncoursModel(data) {
      data = data || {};
      this.mensualite = data.mensualite || '';
      this.restant = data.restant || '';
      this.nbrMois = data.nbrMois || '';
      this.creditEncours = data.creditEncours || '';
      this.creditProfessionnel = data.creditProfessionnel || '';
    }

    return CreditEncoursModel;
  }

]);
