angular.module('users.model').factory('UserModel', ['AdresseModel',
  /**
   * @description Projets model
   * @returns {UserModel}
   */
  function (AdresseModel) {
    'use strict';
    /**
     *Descript: model's contructor
     * @param data
     * @constructor
     */
    function UserModel(data) {
      data = data || {};
      this.id = data.id || 0;
      this.prenom = data.prenom;
      this.nom = data.nom;
      this.civilite = data.civilite;
      this.situationfamiliale = data.situationfamiliale;
      this.dateNassance = data.dateNassance || new Date();
      this.nationalite = data.nationalite;
      this.adresse = new AdresseModel(data.adresse);
      this.age = data.age;
      this.sexe = data.sexe;
      this.active = data.active || false;
    }

    return UserModel;
  }

]);

