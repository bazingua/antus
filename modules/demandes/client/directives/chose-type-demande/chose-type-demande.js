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
        node: '='
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
      console.log('xxx', scope.node);

      scope.choiceType = function (node) {
        scope.node = node;
      };
    }
  }
}());

