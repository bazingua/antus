(function() {
    'use strict';

    angular.module('demandes.directives')
        .directive('listDemandes', listDemandes);

    listDemandes.$inject = [];

    function listDemandes() {
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
            console.log(scope.demandes);
        }
    }
}());