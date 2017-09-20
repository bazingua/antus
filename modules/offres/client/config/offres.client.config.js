(function () {
  'use strict';

  angular
    .module('offres')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Offres',
      state: 'offres',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'offres', {
      title: 'List Offres',
      state: 'offres.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'offres', {
      title: 'Create Offre',
      state: 'offres.create',
      roles: ['user']
    });
  }
}());
