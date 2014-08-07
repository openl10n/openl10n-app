//
// Intercept every non loggued call
//
app.run(function ($rootScope, $location, AuthenticationService) {
  $rootScope.$on("$stateChangeStart", function (event, nextRoute, currentRoute) {
    // if (nextRoute.access.requiredLogin && !AuthenticationService.isLogged) {
    //   $location.path("/admin/login");
    // }
    if (!AuthenticationService.isLogged()) {
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
