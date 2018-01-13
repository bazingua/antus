(function() {
    'use strict';

    angular.module('demandes.directives')
        .directive('detailsDemande', detailsDemande);

    detailsDemande.$inject = ['DemandesService', 'Utils'];

    function detailsDemande(DemandesService, Utils) {
        var directive = {
            restrict: 'EA',
            transclude: false,
            templateUrl: 'modules/demandes/client/directives/details-demande/details-demande.html',
            scope: {
              demande: '=',
              recap: '=?'
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
          scope.utilsService = Utils;
          console.log('****', scope.recap);
          scope.error = {};
          scope.validerDemande = function () {
            DemandesService.validerDemande(scope.demande.id)
            .then(successCallback)
            .catch(errorCallback);
          }
          function successCallback(res) {
            console.log('res', res);
            $state.go('demandes.view', {
              demandeId: demande.id
            });
          }
    
          function errorCallback(error) {
            console.log('error', error);
            scope.error = error.data;
          }
        }
    }
}());