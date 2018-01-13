(function() {
    'use strict';

    angular.module('demandes.directives')
        .directive('listOffres', listOffres);

    listOffres.$inject = [];

    function listOffres() {
        var directive = {
            restrict: 'EA',
            transclude: false,
            templateUrl: 'modules/demandes/client/directives/list-offre/list-offre.html',
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
        }
    }
}());