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
      
      .state('demandes.list', {
        url: '',
        templateUrl: '/modules/demandes/client/views/list-demandes.client.view.html',
        controller: 'DemandesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Demandes List'
        },
        resolve: {
          typeDemande: getType
        }
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
          typeDemande: getType,
          banques: getBanques
        }
      })
      .state('demandes.view', {
        url: '/:demandeId',
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
    console.log('XXXXXXXXX', $stateParams.demandeId);
    // gere le cas de home client avec une demande qi vient d'etre créée
    if ($stateParams.demandeId === 'home')
      return {}
    else
      return DemandesService.get($stateParams.demandeId);
  }


  getType.$inject = ['TypeService'];
  function getType(TypeService) {
    return TypeService.get().$promise;
  }

  getBanques.$inject = ['BanqueDemandeService'];
  function getBanques(BanqueDemandeService) {
    return BanqueDemandeService.getData().$promise;
  }
}());
