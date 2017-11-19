(function () {
  'use strict';

  // Setting up route
  angular
    .module('users.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
    .state('admin', {
      abstract: true,
      url: '/users',
      template: '<ui-view/>'
    })
      .state('admin.users', {
        url: '/list',
        templateUrl: '/modules/users/client/views/admin/list-users.client.view.html',
        controller: 'UserListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Users List'
        }
      })
      .state('admin.user', {
        url: '/:userId',
        templateUrl: '/modules/users/client/views/admin/view-user.client.view.html',
       
        controller: 'UserController',
        controllerAs: 'vm',
        resolve: {
          userResolve: getUser,
          demandes: getDemandes
        },
        data: {
          pageTitle: 'Edit {{ userResolve.displayName }}'
        }
      })
      .state('admin.user.demandesoumises', {
        url: "/demandes",
        views: {
              "admin_home_right_side": {
                templateUrl: '/modules/users/client/views/admin/demandes-soumises.client.view.html'
              }
          }
      }) 
      .state('admin.user.clients', {
        url: "/clients",
        views: {
          "admin_home_right_side": { templateUrl: "/modules/users/client/views/admin/clients.client.view.html" }          
          }
      }) 
      .state('admin.user.banques', {
        url: "/banques",
        views: {
          "admin_home_right_side": { templateUrl: "/modules/users/client/views/admin/banques.client.view.html" }          
          }
      })
      .state('admin.user.addBanque', {
        url: "/addBanque",
        views: {
          "admin_home_right_side": { templateUrl: "/modules/users/client/views/admin/add.banque.client.view.html" }          
          }
      })
      .state('admin.user.addAdmin', {
        url: "/addAdmin",
        views: {
          "admin_home_right_side": { templateUrl: "/modules/users/client/views/admin/add.admin.client.view.html" }          
          }
      }) 
      .state('admin.user-edit', {
        url: '/:userId/edit',
        templateUrl: '/modules/users/client/views/admin/edit-user.client.view.html',
        controller: 'UserController',
        controllerAs: 'vm',
        resolve: {
          userResolve: getUser
        },
        data: {
          pageTitle: 'Edit User {{ userResolve.displayName }}'
        }
      });

    getUser.$inject = ['$stateParams', 'AdminService'];
    function getUser($stateParams, AdminService) {
      return AdminService.get({
        userId: $stateParams.userId
      }).$promise;
    }
      
    getDemandes.$inject = ['DemandesService', 'Authentication'];
    function getDemandes(DemandesService, Authentication) {
    //  DemandesService.find({etat: 5}).then(function (data) {
      if (Authentication.user)
        return DemandesService.find({etat: 1});
      else 
        return [];
    }

  }
}());
