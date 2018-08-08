angular.module('demandes.model').factory('DemandesFinancementProModel', ['AdresseModel', 'UserModel','FinancementModel','ProjetModel',
  /**
   * @description Demandes Financement Pro model
   * @returns {DemandesFinancementProModel}
   */
  function (AdresseModel, UserModel, FinancementModel,ProjetModel) {
    'use strict';
    /**
     *Descript: model's contructor
     * @param data
     * @constructor
     */
    function DemandesFinancementProModel(data) {
      data = data || {};
      this.id = data.id || data._id || 0;
      this.exerciceComptable = data.exerciceComptable || '';
      this.resultstExploitationPositif = data.resultstExploitationPositif || '';
      this.fondProprePositif = data.fondProprePositif || '';
      this.fondCommerce = data.fondCommerce || '';
      this.dureeRemboursement = data.dureeRemboursement || 0;
      this.montantProjet = data.montantProjet || 0;
      this.montantApport = data.montantApport || 0;
      this.montantSouhaite = data.montantSouhaite || 0;
      this.secteurActivite = data.secteurActivite || '';
      this.creditEncours = data.creditEncours || '';
      this.creditProfessionnel = data.creditProfessionnel || '';
      this.descriptionProjet = data.descriptionProjet || '';
      this.offres = data.offres || [];
      this.client = new UserModel(data.client);
      this.financement = new FinancementModel(data.financement);
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
      this.financement = new FinancementModel(data.financement);
      this.projet = new ProjetModel(data.projet);
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

