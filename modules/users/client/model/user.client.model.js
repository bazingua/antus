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
      this.prenom = data.prenom;
      this.nom = data.nom;
      this.civilite = data.civilite;
      this.dateNassance=data.dateNassance;
      this.nationalite=data.nationalite;
      this.adresse=data.adresse;
      this.age=data.age;
      this.sexe=data.sexe;
      this.telephone=data.telephone;
      this.active=data.active;
    }

    return ProjetModel;
  }

]);

