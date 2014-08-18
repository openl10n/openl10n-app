(function() {

'use strict';

angular
  .module('app')
  .controller('NavbarController', NavbarController);

/**
 * @name NavbarController
 *
 * @desc Controller used to manage the navbar
 *
 * @ngInject
 */
function NavbarController($rootScope, $scope, AuthEvents, AuthenticationService) {
  refreshUser();

  $rootScope.$on(AuthEvents.LOGIN_SUCCESS, refreshUser);
  $rootScope.$on(AuthEvents.LOGOUT_SUCCESS, refreshUser);

  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams, error) {
    $scope.activePage = toState.menu;
  })

  function refreshUser() {
    AuthenticationService.getCurrentUser().then(function(data) {
      $scope.user = data;
    }, function(reason) {
      $scope.user = null;
    })
  }
}

})();
