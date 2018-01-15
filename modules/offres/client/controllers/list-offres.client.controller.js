(function () {
  'use strict';

  angular
    .module('offres')
    .controller('OffresListController', OffresListController);

  OffresListController.$inject = ['OffresService'];

  function OffresListController(OffresService) {
    var vm = this;

    vm.offres = [];
  }
}());
