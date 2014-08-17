app.factory('AuthenticationService', function ($q, $http, Configuration, Session) {
  var AuthenticationService = {};

  AuthenticationService.login = function (username, password) {
    var deferred = $q.defer();

    var token = btoa(username + ':' + password);

    // At the end this should call a path like `/auth`
    $http({
      method: 'GET',
      url: Configuration.SERVER_BASE_URL + '/me',
      headers: { 'Authorization': 'Basic ' + token }
    }).then(function() {
      Session.create(token);
      deferred.resolve();
    }, function() {
      Session.destroy();
      deferred.reject();
    })

    return deferred.promise;
  }

  AuthenticationService.getCurrentUser = function() {
    var deferred = $q.defer();

    if (!Session.isAuthenticated) {
      deferred.reject();

      return deferred.promise;
    }

    // Retrieve user information
    $http.get(Configuration.SERVER_BASE_URL + '/me').success(function(data) {
      deferred.resolve(data);
    }, function() {
      deferred.reject();
    })

    return deferred.promise;
  }

  return AuthenticationService;
});
