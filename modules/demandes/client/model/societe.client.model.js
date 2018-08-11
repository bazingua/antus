angular.module('demandes.model').factory('SocieteModel', [
  /**
   * @description Societe model
   * @returns {SocieteModel}
   */
  function () {
    'use strict';
    /**
     *Descript: model's contructor
     * @param data
     * @constructor
     */
    function SocieteModel(data) {
      data = data || {};
      this.StatusJuridique = data.StatusJuridique || '';
      this.nom = data.nom || '';
      this.secteurActivite = data.secteurActivite || '';
      this.id = data.id || -1;// TODO : A revoir si l'id est necessaire
    }

    return SocieteModel;
  }

]);

