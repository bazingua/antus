(function () {
  'use strict';

  angular
    .module('demandes.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('demandes', {
        abstract: true,
        url: '/demandes',
        template: '<ui-view/>'
      })
      .state('demandes.create', {
        url: '/deposer',
        templateUrl: '/modules/demandes/client/views/deposer-demandes.client.view.html',
        controller: 'DeposerDemandesController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Deposez une demandes'
        },
        resolve: {
          typeDemande: getType('particulier'),
          banques: getBanques
        }
      })
      .state('demandes.createDemandeProfessionnel', {
        url: '/deposer-demande-pro',
        templateUrl: '/modules/demandes/client/views/deposerdemandesPro.client.view.html',
        controller: 'DeposerDemandesProController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Demande crédit professionnel'
        },
        resolve: {
          typeDemande: getType('pro'),
          banques: getBanques
        }
      })
      .state('demandes.view', {
        url: '/:demandeId?:stateOffre',
        templateUrl: '/modules/demandes/client/views/view-demande.client.view.html',
        controller: 'DemandesController',
        controllerAs: 'vm',
        resolve: {
          demande: getDemande
        },
        data: {
          pageTitle: 'Demande {{ demandeResolve.title }}'
        }
      });
  }

  getDemande.$inject = ['$stateParams', 'DemandesService'];

  function getDemande($stateParams, DemandesService) {
    // gere le cas de home client avec une demande qi vient d'etre créée
    if ($stateParams.demandeId === 'home')
      return {};
    else
      return DemandesService.get($stateParams.demandeId);
  }


  function getType (params) {
    getType.$inject = ['TypeService'];
    return function getType(TypeService) {
      return TypeService.get({ type: params }).$promise;
    };
  }

  getBanques.$inject = ['BanqueDemandeService'];
  function getBanques(BanqueDemandeService) {
    return BanqueDemandeService.getData().$promise;
  }
}());
