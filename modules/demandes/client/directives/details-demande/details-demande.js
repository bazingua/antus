(function() {
    'use strict';

    angular.module('demandes.directives')
        .directive('detailsDemande', detailsDemande);

    detailsDemande.$inject = [];

    function detailsDemande() {
        var directive = {
            restrict: 'EA',
            transclude: false,
            templateUrl: 'modules/demandes/client/directives/details-demande/details-demande.html',
            scope: {
              demande: '='
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
            console.log('****', scope.demande);
        }
    }
}());