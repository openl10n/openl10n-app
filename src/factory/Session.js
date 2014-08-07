app.service('Session', function($window) {
  this.create = function(token) {
    $window.sessionStorage.token = token;
  }

  this.destroy = function() {
    delete $window.sessionStorage.token;
  }

  this.getToken = function(token) {
    return $window.sessionStorage.token;
  }

  this.isAuthenticated = function() {
    return !!$window.sessionStorage.token;
  }

  return this;
});
