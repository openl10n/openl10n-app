app.controller('LoginCtrl', function ($scope, $location, AuthenticationService) {
  var login = {
    username: '',
    password: '',
  };

  $scope.login = login;
  $scope.authenticate = function () {
    if (AuthenticationService.login(login.username, login.password)) {
      $location.path('/');
    }
  };
})
