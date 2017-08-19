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
      this.nom = data.nom || '';
      this.type = data.type || '';
      this.etat = data.etat || '';
      this.usage = data.usage || '';
      this.pays = data.pays || '';
      this.ville = data.ville || '';
      this.montantProjet = data.montantProjet || '';
      this.montantTravaux = data.montantTravaux || '';
      this.fraisNotaire = data.fraisNotaire || '';
      this.nombreEmpreteur = data.nombreEmpreteur || '';
    }

    return ProjetModel;
  }

]);
