(function() {
    'use strict';

    angular.module('users')
        .directive('listUsers', listUsers);

    listUsers.$inject = ['$filter', 'AdminService', '$stateParams'];

    function listUsers($filter, AdminService, $stateParams) {
        var directive = {
            restrict: 'EA',
            transclude: false,
            templateUrl: 'modules/users/client/directives/list-users/list-users.html',
            scope: {
            },
            link: link
        };

        return directive;
        /**
         * link function
         * @param  {Object} scope
         * @return {Object} scope
         */
        function link(scope) {

          if ($stateParams.role === 'user')
            scope.role = 'utilisateurs';
          if ($stateParams.role === 'banque')
            scope.role = 'banques';
          
            scope.buildPager = buildPager;
            scope.figureOutItemsToDisplay = figureOutItemsToDisplay;
            scope.pageChanged = pageChanged;
            AdminService.query(function (data) {
              scope.users = data;
              if ($stateParams.role)
                scope.users = $filter('filterUserByRole')(data, $stateParams.role);
              scope.buildPager();
            });
        
            function buildPager() {
              scope.pagedItems = [];
              scope.itemsPerPage = 15;
              scope.currentPage = 1;
              scope.figureOutItemsToDisplay();
            }
        
            function figureOutItemsToDisplay() {
              scope.filteredItems = $filter('filter')(scope.users, {
                $: scope.search
              });
              scope.filterLength = scope.filteredItems.length;
              var begin = ((scope.currentPage - 1) * scope.itemsPerPage);
              var end = begin + scope.itemsPerPage;
              scope.pagedItems = scope.filteredItems.slice(begin, end);
            }
        
            function pageChanged() {
              scope.figureOutItemsToDisplay();
            }
        }
    }
}());