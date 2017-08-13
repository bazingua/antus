(function () {
  'use strict';

  angular.module('demandes.directives')
    .directive('choseTypeDemande', choseTypeDemande);

  choseTypeDemande.$inject = [];
  function choseTypeDemande() {
    var directive = {
      restrict: 'EA',
      transclude: false,
      templateUrl: 'modules/demandes/client/directives/chose-type-demande/chose-type-demande.html',
      scope: {
        type: '='
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
      console.log('xxx', scope.type);
    }
  }
}());

