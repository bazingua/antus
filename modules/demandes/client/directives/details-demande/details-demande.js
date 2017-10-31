(function() {
    'use strict';

    angular.module('demandes.directives')
        .directive('detailsDemande', detailsDemande);

    detailsDemande.$inject = ['DemandesService'];

    function detailsDemande(DemandesService) {
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
          scope.error = {};
          scope.validerDemande = function () {
            console.log('heeeere');  
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