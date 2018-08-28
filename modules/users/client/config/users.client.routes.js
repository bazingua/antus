(function () {
  'use strict';

  // Setting up route
  angular
    .module('users.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    // Users state routing
    $stateProvider
      .state('settings', {
        abstract: true,
        url: '/settings',
        templateUrl: '/modules/users/client/views/settings/settings.client.view.html',
        controller: 'SettingsController',
        controllerAs: 'vm',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('settings.profile', {
        url: '/profile',
        templateUrl: '/modules/users/client/views/settings/edit-profile.client.view.html',
        controller: 'EditProfileController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Settings'
        }
      })
      .state('settings.password', {
        url: '/password',
        templateUrl: '/modules/users/client/views/settings/change-password.client.view.html',
        controller: 'ChangePasswordController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Settings password'
        }
      })
      .state('settings.accounts', {
        url: '/accounts',
        templateUrl: '/modules/users/client/views/settings/manage-social-accounts.client.view.html',
        controller: 'SocialAccountsController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Settings accounts'
        }
      })
      .state('settings.picture', {
        url: '/picture',
        templateUrl: '/modules/users/client/views/settings/change-profile-picture.client.view.html',
        controller: 'ChangeProfilePictureController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Settings picture'
        }
      })
      .state('authentication', {
        abstract: true,
        url: '/authentication',
        templateUrl: '/modules/users/client/views/authentication/authentication.client.view.html'
      })
      .state('authentication.signup_part', {
        url: '/signup-particulier',
        templateUrl: '/modules/users/client/views/authentication/signup.client.view.html',
        controller: 'AuthenticationController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Signup'
        },
        resolve: {}
      })
      .state('authentication.signup_pro', {
        url: '/signup-pro',
        templateUrl: '/modules/users/client/views/authentication/signup.client.view.html',
        controller: 'AuthenticationController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Signup'
        },
        resolve: {}
      })
      .state('authentication.signup', {
        url: '/signup',
        templateUrl: '/modules/users/client/views/authentication/signup.choose.client.view.html',
        data: {
          pageTitle: 'Signup choose'
        }
      })
      .state('authentication.signin', {
        url: '/signin?err',
        templateUrl: '/modules/users/client/views/authentication/signin.client.view.html',
        controller: 'AuthenticationController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Signin'
        }
      })
      .state('password', {
        abstract: true,
        url: '/password',
        template: '<ui-view/>'
      })
      .state('password.forgot', {
        url: '/forgot',
        templateUrl: '/modules/users/client/views/password/forgot-password.client.view.html',
        controller: 'PasswordController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Password forgot'
        }
      })
      .state('password.reset', {
        abstract: true,
        url: '/reset',
        template: '<ui-view/>'
      })
      .state('password.reset.invalid', {
        url: '/invalid',
        templateUrl: '/modules/users/client/views/password/reset-password-invalid.client.view.html',
        data: {
          pageTitle: 'Password reset invalid'
        }
      })
      .state('password.reset.success', {
        url: '/success',
        templateUrl: '/modules/users/client/views/password/reset-password-success.client.view.html',
        data: {
          pageTitle: 'Password reset success'
        }
      })
      .state('password.reset.form', {
        url: '/:token',
        templateUrl: '/modules/users/client/views/password/reset-password.client.view.html',
        controller: 'PasswordController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Password reset form'
        }
      })
      .state('userHome', {
        abstract: true,
        url: '/user-home',
        template: '<ui-view/>'
      })
      .state('userHome.client', {
        url: '/client?created',
        templateUrl: '/modules/demandes/client/views/home.client.view.html',
        controller: 'ClientHomeController',
        controllerAs: 'vm',
        resolve: {
          demandes: getOwnerDemandes
        },
        data: {
          pageTitle: 'Home Client'
        }
      })
      .state('userHome.banque', {
        url: '/banque',
        templateUrl: '/modules/demandes/client/views/home-bank.client.view.html',
        controller: 'BanqueHomeController',
        controllerAs: 'vm',
        resolve: {
          demandes: getDemandesValider
        },
        data: {
          pageTitle: 'Home Banque'
        }
      })
      .state('userHome.homeDeamandebank', {
        url: '/DemandeBanque',
        templateUrl: '/modules/demandes/client/views/homeDemandebank.client.view.html',
        controller: 'BanqueHomeController',
        controllerAs: 'vm',
        resolve: {
          demandes: getOwnerDemandes
        },
        data: {
          pageTitle: 'Home Banque'
        }
      });
    getOwnerDemandes.$inject = ['$stateParams', 'DemandesService', 'Authentication'];
    function getOwnerDemandes($stateParams, DemandesService, Authentication) {
      console.log(Authentication, $stateParams.created);
      return DemandesService.find({ user: $stateParams.created || Authentication.user.email });
    }
    getDemandesValider.$inject = ['$stateParams', 'DemandesService', 'Authentication'];
    function getDemandesValider($stateParams, DemandesService, Authentication) {
      console.log(Authentication.user);
      return DemandesService.find({ etat: 5 });
    }
  }
}());
