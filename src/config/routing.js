app.config(function($stateProvider, $urlRouterProvider) {
  // Redirect 404 to homepage
  $urlRouterProvider.otherwise('/');

  // Routing
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'partials/login.html',
      controller: 'LoginCtrl',
    })
    .state('dashboard', {
      url: '/',
      templateUrl: 'partials/dashboard.html',
      controller: 'DashboardCtrl',
    })
    .state('project', {
      url: '/project/:slug',
      templateUrl: 'partials/project.html',
      controller: 'ProjectCtrl',
      resolve: {
        project: function($stateParams, ProjectService) {
          return ProjectService.getProject($stateParams.slug);
        },
        languages: function($stateParams, LanguageService) {
          return LanguageService.getLanguages($stateParams.slug);
        },
        resources: function($stateParams, ResourceService) {
          return ResourceService.getResources($stateParams.slug);
        },
      }
    })
    .state('translate', {
      url: '/project/:slug/translate',
      templateUrl: 'partials/translate.html',
      controller: 'TranslateCtrl',
      resolve: {
        project: function($stateParams, ProjectService) {
          return ProjectService.getProject($stateParams.slug);
        },
        languages: function($stateParams, LanguageService) {
          return LanguageService.getLanguages($stateParams.slug);
        },
      }
    })
});

app.run(function($rootScope) {
  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
    console.log(event);
  })
})
