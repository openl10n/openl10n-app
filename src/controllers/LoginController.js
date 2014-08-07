app.controller('LoginController', function ($scope, $location, AuthenticationService) {
  $scope.credentials = {
    username: '',
    password: '',
  };

  $scope.authenticate = function (username, password) {
    if (AuthenticationService.login(username, password)) {
      $location.path('/');
    }
  };
})
