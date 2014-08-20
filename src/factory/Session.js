app.service('Session', function($window) {
  this.create = function(token) {
    $window.localStorage.token = token;
  }

  this.destroy = function() {
    delete $window.localStorage.token;
  }

  this.getToken = function(token) {
    return $window.localStorage.token;
  }

  this.isAuthenticated = function() {
    return !!$window.localStorage.token;
  }

  return this;
});
