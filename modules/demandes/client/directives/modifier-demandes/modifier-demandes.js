(function() {
    'use strict';
    angular.module('demandes.directives')
        .directive('modifierDemandes', modifierDemandes);
  
    detailsDemande.$inject = ['DemandesService', 'Utils', '$state', '$stateParams'];
  
    function detailsDemande(DemandesService, Utils, $state, $stateParams) {
      var directive = {
        restrict: 'EA',
        transclude: false,
        templateUrl: 'modules/demandes/client/directives/details-demande/modifier-demandes.html',
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
          scope.error = error.data;
        }
      }
    }
  }());
  