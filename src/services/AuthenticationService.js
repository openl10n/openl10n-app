app.factory('AuthenticationService', function ($window, $q, $timeout) {
  var AuthenticationService = {};

  AuthenticationService.login = function (username, password) {
    var deferred = $q.defer();

    if (username === 'foo' && password === 'bar') {
      $window.sessionStorage.token = '12345';

      $timeout(deferred.resolve, 0);
    } else {
      $timeout(deferred.reject, 0);
    }

    return deferred.promise;
  }

  AuthenticationService.logout = function () {
    delete $window.sessionStorage.token;
  }

  AuthenticationService.isLogged = function() {
    return !!$window.sessionStorage.token;
  }

  return AuthenticationService;
});
