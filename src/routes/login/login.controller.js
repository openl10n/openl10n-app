(function() {
'use strict';

angular.module('app')
  .controller('LoginController', LoginController)

/**
 * @ngInject
 */
function LoginController($scope, Auth, $location) {
  Auth.logout();

  $scope.credentials = {
    username: '',
    password: '',
  }

  $scope.login = function(credentials) {
    if ($scope.loginForm.$pristine || $scope.loginForm.$invalid)
      return;

    Auth.login(credentials).then(onLoginSuccess, onLoginFail);

    function onLoginSuccess() {
      $location.path('/');
    }

    function onLoginFail() {
      alert('Login fail');
    }
  }
}

})();
