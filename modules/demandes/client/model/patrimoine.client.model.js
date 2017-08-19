angular.module('demandes.model').factory('PatrimoineModel', ['RevenuModel', 'ProfessionModel', 'CreditModel',
  /**
   * @description Patrimoine model
   * @returns {PatrimoineModel}
   */
  function (RevenuModel, ProfessionModel, CreditModel) {
    'use strict';
    /**
     *Descript: model's contructor
     * @param data
     * @constructor
     */
    function PatrimoineModel(data) {
      data = data || {};
      this.revenu = new RevenuModel(data.revenu);
      this.profession = new ProfessionModel(data.profession);
      this.credit = new CreditModel(data.credit);
      this.bienPrincipal = data.bienPrincipal;
      this.duPrincipal = data.duPrincipal;
      this.bienSecondaire = data.bienSecondaire;
      this.duSecondaire = data.duSecondaire;
      this.bienLocatif = data.bienLocatif;
      this.duLocatif = data.duLocatif;
      this.bienAutre = data.bienAutre;
      this.duAutre = data.duAutre;

    }

    return PatrimoineModel;
  }

]);

