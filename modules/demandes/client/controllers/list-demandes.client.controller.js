(function () {
  'use strict';

  angular
    .module('demandes')
    .controller('DemandesListController', DemandesListController);

  DemandesListController.$inject = ['$scope', 'DemandesService', 'typeDemande'];

  function DemandesListController($scope, DemandesService, typeDemande) {
    var vm = this;
    //  DemandesService.find({etat: 5}).then(function (data) {
      DemandesService.find().then(function (data) {
      vm.demandes = data;
    }).catch(function (error) {
      // Error catched
    });
  }
}());
