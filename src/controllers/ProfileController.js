(function() {

'use strict';

angular
  .module('app')
  .controller('ProfileController', ProfileController);

/**
 * @name ProfileController
 *
 * @desc Controller used to display profile page
 *
 * @ngInject
 */
function ProfileController($scope, AuthenticationService) {
  AuthenticationService.getCurrentUser().then(function(data) {
    $scope.user = data;
  })
}

})();
