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
      this.type = data.type || '';
      this.montantProjet = data.montantProjet || '';
      this.montantTravaux = data.montantTravaux || '';
      this.fraisNotaire = data.fraisNotaire || '';
      this.nombreEmpreteur = data.nombreEmpreteur || '';
    }

    return ProjetModel;
  }

]);

