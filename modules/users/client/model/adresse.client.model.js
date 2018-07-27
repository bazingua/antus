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
      this.pays = data.pays;
      this.ville = data.vile;
      this.adresse = data.adresse;
      this.email = data.email;
      this.telephoneBureau = data.telephoneBureau;
      this.telephoneFixe = data.telephoneFixe;
      this.telephonePortable = data.telephonePortable;
      this.codePostale= data.codePostale;
    }

    return AdresseModel;
  }

]);

