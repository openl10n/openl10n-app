(function() {
'use strict';

angular.module('app')
  .config(LoginStateConfig);

/**
 * @ngInject
 */
function LoginStateConfig($stateProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'views/login.html',
      controller: 'LoginController',
    })
    .state('logout', {
      url: '/logout',
      controller: 'LogoutController',
    })
}


})();
