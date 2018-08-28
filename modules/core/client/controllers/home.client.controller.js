(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$state','Authentication','Utils'];
  function HomeController($state,Authentication,Utils) {
    var vm = this;
    vm.authentication = Authentication;
    vm.utils = Utils;
  }
}());
