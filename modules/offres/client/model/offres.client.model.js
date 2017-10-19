angular.module('offres.model').factory('OffresModel', ['BanqueModel','DemandesModel',
  /**
   * @description offres model
   * @returns {OffresModel}   */
  function (BanqueModel,DemandesModel) {
    'use strict';
    /**
     *Descript: model's contructor
     * @param data
     * @constructor
     */ 
    function OffresModel(data) {
      data = data || {};
      this.id = data.id || 0;
      this.banque = data.banque;
      this.montantPret = data.montantPret || 0;
      this.dureePret = data.dureePret || 0;
      this.tauxInteret = data.tauxInteret || 0;
      this.echeance = data.echeance || 0;
      this.fraisDossier = data.fraisDossier || 0;
      this.assuranceOffre = data.assuranceOffre || 0;
      this.fraisNotaire = data.fraisNotaire || 0;
      this.created = data.created;
    }

    return OffresModel;
  }

]);

