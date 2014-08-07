app.controller('LoginController', function ($rootScope, $scope, $location, AuthenticationService, AuthEvents) {
  $scope.credentials = {
    username: '',
    password: '',
  };

  $scope.authenticate = function (username, password) {
    AuthenticationService.login(username, password).then(function() {
      $rootScope.$broadcast(AuthEvents.LOGIN_SUCCESS);
      $location.path('/');
    }, function() {
      $rootScope.$broadcast(AuthEvents.LOGIN_FAILED);
      alert('Login failed');
    })
  };
})
