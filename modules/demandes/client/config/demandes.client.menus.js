(function () {
  'use strict';

  angular
    .module('demandes')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
    //  title: 'Demandes',
      title: 'Crédit Immobilier',
      state: 'demandes',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'demandes', {
      title: 'List Demandes',
      state: 'demandes.list',
      roles: ['*']
     // roles: ['admin']
    });

    menuService.addSubMenuItem('topbar', 'demandes', {
      title: 'Déposer Votre Demande',
      state: '',
      roles: ['*']
      // roles: ['admin']
    });
  }
}());
