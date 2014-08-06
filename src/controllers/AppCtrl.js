app.controller('AppCtrl', function($rootScope) {
  $rootScope.$on("$routeChangeError", function(event, current, previous, rejection) {
    console.log(event);
  });
});
