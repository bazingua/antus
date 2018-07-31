angular.module('demandes.model').factory('DemandesFinancementProModel', ['AdresseModel', 'UserModel',
  /**
   * @description Demandes Financement Pro model
   * @returns {DemandesFinancementProModel}
   */
  function (AdresseModel, UserModel) {
    'use strict';
    /**
     *Descript: model's contructor
     * @param data
     * @constructor
     */
    function DemandesFinancementProModel(data) {
      data = data || {};
      this.id = data.id || data._id || 0;
      this.type = data.type || '';
      this.exerciceComptable = data.exerciceComptable || '';
      this.resultstExploitationPositif = data.resultstExploitationPositif || '';
      this.fondProprePositif = data.fondProprePositif || '';
      this.fondCommerce = data.fondCommerce || '';
      this.dureeRemboursement = data.dureeRemboursement || '';
      this.montantProjet = data.montantProjet || 0;
      this.montantApport = data.montantApport || 0;
      this.montantSouhaite = data.montantSouhaite || 0;
      this.offres = data.offres || [];
      this.adresse = new AdresseModel(data.adresse);
      this.chiffreAffaire = data.chiffreAffaire || '';
      this.banqueContacter = data.banqueContacter || { oui: [], non: true };// les banque cntacté seront dans le tableau d'objet  oui avec un attribut  'reponse: boolean' et 'nom'
      this.infoSociete = data.infoSociete || {
        StatuJuridique: '',
        nom: '',
        id: -1
      };
      this.coordonneesEmprunteur = new UserModel(data.coordonneesEmprunteur);
      this.coordonneesCoEmprunteur = new UserModel(data.coordonneesCoEmprunteur);
      this.infoDirigeant = new UserModel(data.infoDirigeant);
      this.offres = data.offres || [];
      this.created = data.created;
      this.etat = data.etat || 1;
      this.numeroDemande = data.numeroDemande || -1;
      this.active = data.active;
      this.updated = data.updated;
      this.isCurrentUserOwner = data.isCurrentUserOwner;
    }
    return DemandesFinancementProModel;
  }

]);

