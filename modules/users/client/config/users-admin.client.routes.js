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
    .state('signup', {
      url: '/admin/signup',
      templateUrl: '/modules/users/client/views/authentication/signup.client.view.html',
      controller: 'AdminAuthenticationController',
      controllerAs: 'vm',
      data: {
        pageTitle: 'Signup'
      }
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
      .state('homeadmin', {
        url: '/home-admin',
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
      .state('homeadmin.demandesoumises', {
        url: "/demandes",
        views: {
              "admin_home_right_side": {
                templateUrl: '/modules/users/client/views/admin/demandes-soumises.client.view.html'
              }
          }
      }) 
      .state('homeadmin.users', {
        url: "/users/:role",
        views: {
          "admin_home_right_side": { templateUrl: "/modules/users/client/views/admin/clients.client.view.html" }          
          }
      }) 
      .state('homeadmin.addBanque', {
        url: "/addBanque",
        views: {
          "admin_home_right_side": { templateUrl: "/modules/users/client/views/admin/add.banque.client.view.html" }          
          }
      })
      .state('homeadmin.addAdmin', {
        url: "/addAdmin",
        views: {
          "admin_home_right_side": { templateUrl: "/modules/users/client/views/admin/add.admin.client.view.html" }          
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

    getUser.$inject = ['$stateParams', 'AdminService', 'Authentication'];
    function getUser($stateParams, AdminService, Authentication) {
      return Authentication.user;
      /*
      return AdminService.get({
        userId: Authentication.user._id
      }).$promise;*/
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
