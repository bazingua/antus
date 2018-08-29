(function () {
  'use strict';

  angular.module('demandes.directives')
    .directive('choseTypeDemande', choseTypeDemande);

  choseTypeDemande.$inject = [];

  function choseTypeDemande() {
    var directive = {
      restrict: 'EA',
      transclude: false,
      //
      templateUrl: 'modules/demandes/client/directives/chose-type-demande/chose-type-demande.html',
      scope: true,
      link: link
    };

    return directive;
    /**
     * link function
     * @param  {Object} scope
     * @return {Object} scope
     */
    function link(scope) {
      scope.node = scope.typeDemande;
      scope.choiceType = function (type) {
        if (!type.fils.length) {
          // type.prev = scope.node;
          scope.node.next = 'form';
          // scope.node = type;
          scope.endTreeSelect(type);

        } else {
          scope.node.next = type;
          type.prev = scope.node;
          scope.node = type;
        }
      };

      /**
       * navigation function
       * @name navigation
       * @description la fonction qui permet de faire la navigation dans l'arbre
       * @param node
       */
      scope.navigation = function (type, next) {
        if (next && scope.node.next === 'form')
          scope.endNavigateTree(type);

        else
          scope.node = type;
      };
    }
  }
}());