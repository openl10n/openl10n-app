app.controller('LoginController', function ($rootScope, $scope, $location, $timeout, AuthenticationService, AuthEvents) {
  'use strict';

  $scope.credentials = {
    username: '',
    password: '',
  };

  $scope.error = false;

  $scope.authenticate = function (username, password) {
    $scope.error = false;

    AuthenticationService.login(username, password).then(function() {
      $rootScope.$broadcast(AuthEvents.LOGIN_SUCCESS);
      $location.path('/');
    }, function() {
      $rootScope.$broadcast(AuthEvents.LOGIN_FAILED);
      $scope.error = true;

      $timeout(function() {
        $scope.error = false;
      }, 1000);
    })
  };
})
