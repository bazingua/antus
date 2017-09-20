(function () {
  'use strict';

  angular
    .module('offres')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('offres', {
        abstract: true,
        url: '/offres',
        template: '<ui-view/>'
      })
      .state('offres.list', {
        url: '',
        templateUrl: 'modules/offres/client/views/list-offres.client.view.html',
        controller: 'OffresListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Offres List'
        }
      })
      .state('offres.create', {
        url: '/create',
        templateUrl: 'modules/offres/client/views/form-offre.client.view.html',
        controller: 'OffresController',
        controllerAs: 'vm',
        resolve: {
          offreResolve: newOffre
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Offres Create'
        }
      })
      .state('offres.edit', {
        url: '/:offreId/edit',
        templateUrl: 'modules/offres/client/views/form-offre.client.view.html',
        controller: 'OffresController',
        controllerAs: 'vm',
        resolve: {
          offreResolve: getOffre
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Offre {{ offreResolve.name }}'
        }
      })
      .state('offres.view', {
        url: '/:offreId',
        templateUrl: 'modules/offres/client/views/view-offre.client.view.html',
        controller: 'OffresController',
        controllerAs: 'vm',
        resolve: {
          offreResolve: getOffre
        },
        data: {
          pageTitle: 'Offre {{ offreResolve.name }}'
        }
      });
  }

  getOffre.$inject = ['$stateParams', 'OffresService'];

  function getOffre($stateParams, OffresService) {
    return OffresService.get({
      offreId: $stateParams.offreId
    }).$promise;
  }

  newOffre.$inject = ['OffresService'];

  function newOffre(OffresService) {
    return new OffresService();
  }
}());
