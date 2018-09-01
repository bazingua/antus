angular.module('demandes.model').factory('DemandesModel', ['ProjetModel', 'PatrimoineModel', 'FinancementModel', 'UserModel', 'ApportModel', 'SocieteModel',
  /**
   * @description Demandes model
   * @returns {DemandesModel}
   */
  function (ProjetModel, PatrimoineModel, FinancementModel, UserModel, ApportModel, SocieteModel) {
    'use strict';
    /**
     *Descript: model's contructor
     * @param data
     * @constructor
     */
    function DemandesModel(data) {
      data = data || {};
      this.id = data.id || data._id || 0;
      this.projet = new ProjetModel(data.projet);
      this.patrimoine = new PatrimoineModel(data.patrimoine);
      this.financement = new FinancementModel(data.financement);
      this.client = new UserModel(data.client);
      this.emprunteur = new UserModel(data.emprunteur);
      this.coemprunteur = new UserModel(data.coemprunteur);
      this.apport = new ApportModel(data.apport);
      this.societe = new SocieteModel(data.societe);
      this.offres = data.offres || [];
      this.created = data.created;
      this.etat = data.etat || 1;
      this.numeroDemande = data.numeroDemande || 1;
      this.active = data.active;
      this.updated = data.updated;
      this.isCurrentUserOwner = data.isCurrentUserOwner;
      this.type = data.type || 'PARTICULIER';
    }

    return DemandesModel;
  }

]);

