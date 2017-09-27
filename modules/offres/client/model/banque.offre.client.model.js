angular.module('offres.model').factory('BanqueModel', [
  /**
   * @description Banque model
   * @returns {BanqueModel}
   */
  function () {
    'use strict';
    /**
     *Descript: model's contructor
     * @param data
     * @constructor
     */
    function BanqueModel(data) {
      data = data || {};
      this.id = data.id || 0;
      this.nomBanque = data.nomBanque || "";
      this.adresseBanque = data.adresseBanque || "";
      this.emailBanque = data.emailBanque || "";
      this.pw = data.pw || "";
      this.dateCreation = data.dateCreation || "";
 
    }

    return BanqueModel;
  }

]);

