(function() {
'use strict';

angular.module('app')
  .run(SecurityConfig)
  .factory('Auth', AuthService)

/**
 * Intercept every non loggued call.
 *
 * @ngInject
 */
function SecurityConfig($rootScope, $location, Auth) {
  $rootScope.$on("$stateChangeStart", function (event, nextRoute, currentRoute) {
    if (!Auth.isAuthenticated()) {
      $location.path('/login');
    }
  });
};

/**
 * @ngInject
 */
function AuthService($q, $window, $timeout, $http, Configuration) {
  var tokenName = 'olToken';

  var Auth = {
    login: login,
    logout: logout,
    getToken: getToken,
    setToken: setToken,
    isAuthenticated: isAuthenticated,
  };

  function login(credentials) {
    var deferred = $q.defer();
    var _this = this;

    var token = btoa(credentials.username + ':' + credentials.password);

    // At the end this should call a path like `/auth`
    $http({
      method: 'GET',
      url: Configuration.API_BASE_URL + '/me',
      headers: { 'Authorization': 'Basic ' + token }
    }).then(function() {
      _this.setToken(token);
      deferred.resolve();
    }, function() {
      _this.logout();
      deferred.reject();
    });

    return deferred.promise;
  }

  function logout() {
    delete $window.localStorage[tokenName];
  }

  function getToken() {
    return $window.localStorage[tokenName];
  }

  function setToken(token) {
    $window.localStorage[tokenName] = token;
  }

  function isAuthenticated() {
    return !!$window.localStorage[tokenName];
  }

  return Auth;
}


})();
