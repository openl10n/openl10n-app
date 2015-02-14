(function() {
'use strict';

angular.module('app')
  .controller('ProfileController', ProfileController)
  .controller('ProfileTitleController', ProfileTitleController)

/**
 * @ngInject
 */
function ProfileController($scope, user) {
  $scope.user = user;
}

/**
 * @ngInject
 */
function ProfileTitleController($scope) {
}

})();
