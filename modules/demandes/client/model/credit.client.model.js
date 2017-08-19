angular.module('demandes.model').factory('CreditModel', ['CreditEncoursModel',
  /**
   * @description Credit model
   * @returns {CreditModel}
   */
  function (CreditEncoursModel) {
    'use strict';
    /**
     *Descript: model's contructor
     * @param data
     * @constructor
     */
    function CreditModel(data) {
      data = data || {};
      this.principal = new CreditEncoursModel(data.principal);
      this.secondaire = new CreditEncoursModel(data.secondaire);
      this.locatif = new CreditEncoursModel(data.locatif);
      this.autre = new CreditEncoursModel(data.autre);
    }

    return CreditModel;
  }

]);
