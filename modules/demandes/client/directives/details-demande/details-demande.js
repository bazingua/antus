(function() {
    'use strict';

    angular.module('demandes.directives')
        .directive('detailsDemande', detailsDemande);

    detailsDemande.$inject = ['DemandesService', 'Utils', '$state', '$stateParams'];

    function detailsDemande(DemandesService, Utils, $state, $stateParams) {
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
          };

          function successCallback(res) {
            $state.transitionTo($state.current, $stateParams, {
              reload: true,
              inherit: false,
              notify: true
            });
          }              
          function errorCallback(error) {
            console.log('error', error);
            scope.error = error.data;
          }
        }
    }
}());