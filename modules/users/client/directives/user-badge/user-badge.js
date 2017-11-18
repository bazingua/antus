(function() {
    'use strict';

    angular.module('users')
        .directive('userBadge', userBadge);

    userBadge.$inject = ['UserRoleService'];

    function userBadge(UserRoleService) {
        var directive = {
            restrict: 'EA',
            transclude: false,
            templateUrl: 'modules/users/client/directives/user-badge/user-badge.html',
            scope: {
              user: '='
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
          user.created = UserRoleService.formaterDate(new Date(user.created).toISOString());
        }
    }
}());