//
// Intercept every non loggued call
//
app.run(function ($rootScope, $location, Session) {
  $rootScope.$on("$stateChangeStart", function (event, nextRoute, currentRoute) {
    // if (nextRoute.access.requiredLogin && !AuthenticationService.isLogged) {
    //   $location.path("/admin/login");
    // }
    if (!Session.isAuthenticated()) {
      $location.path('/login');
    }
  });
});

//
// Add token interceptor
//
app.config(function ($httpProvider) {
  $httpProvider.interceptors.push('AuthenticationInterceptor');
});
