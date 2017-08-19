angular.module('demandes.model').factory([
  /**
   * @description Apport model
   * @returns {ApportModel}
   */
  function () {
    'use strict';
    /**
     *Descript: model's contructor
     * @param data
     * @constructor
     */
    function ApportModel(data) {
      data = data || {};
      this.montant = data.montant || '';
      this.montantFinale = data.montantFinale || '';
      this.dureeSouhaite = data.dureeSouhaite || '';
      this.montantMaxSouhaite = data.montantMaxSouhaite || '';
    }

    return ApportModel;
  }

]);
