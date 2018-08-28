(function () {
  'use strict';
  angular.module('demandes.directives')
    .directive('listDemandes', listDemandes);

  listDemandes.$inject = ['Utils'];

  function listDemandes(Utils) {
    var directive = {
      restrict: 'EA',
      transclude: false,
      templateUrl: 'modules/demandes/client/directives/list-demandes/list-demandes.html',
      scope: {
        demandes: '='
      },
      link: link
    };

    return directive;
    /**
     * link function
     * @param  {Object} scope
     * @return {Object} scope
     */
    function link(scope) {
      console.log('++++', scope.demandes);
      scope.isAdmin = Utils.isAdmin();
      // model filtre demande
      scope.filtre = {
        demande: {
          currentstatus: 1,
          currentType: { value: 'PART.', libelle: 'Particulier' },
          status: Utils.statusDemendes(),
          offre: false,
          numeroDemande: '',
          types: Utils.typeDemande()
        }
      };
    }
  }
}());
