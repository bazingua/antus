(function() {
  angular.module('users').filter('filterUserByRole', function () {
    return function (items, role) {
      var result = [];
      angular.forEach(items, function (value, key) {
        angular.forEach(value.roles, function (value2, key2) {
          if (value2 === role) {
            result.push(value);
          }
        })
      });
      return result;
    }
  });

}());