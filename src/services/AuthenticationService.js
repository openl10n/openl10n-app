app.factory('AuthenticationService', function ($window) {
  var AuthenticationService = {};

  AuthenticationService.login = function (username, password) {
    if (username === 'foo' && password === 'bar') {
      $window.sessionStorage.token = '12345';

      return true;
    }
  }

  AuthenticationService.logout = function () {
    delete $window.sessionStorage.token;
  }

  AuthenticationService.isLogged = function() {
    return !!$window.sessionStorage.token;
  }

  return AuthenticationService;
});
