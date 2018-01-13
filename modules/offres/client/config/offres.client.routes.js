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
      .state('offres.deposer', {
        url: 'offre/:demandeId',
        templateUrl: 'modules/offres/client/views/form-offre.client.view.html',
        controller: 'OffresDeposerController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Deposer une offre'
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
        //  roles: ['bank'],
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
          roles: ['bank'],
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
      })
      .state('offres.banque', {
        url: '/banque',
        templateUrl: 'modules/offres/client/views/banque.offre.client.view.html',
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
