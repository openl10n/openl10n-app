app.factory('AuthenticationService', function ($q, $http, Configuration, Session) {
  var AuthenticationService = {};

  AuthenticationService.login = function (username, password) {
    var deferred = $q.defer();

    var token = btoa(username + ':' + password);

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

  return AuthenticationService;
});
