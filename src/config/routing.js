app.config(function($stateProvider, $urlRouterProvider) {
  // Redirect 404 to homepage
  $urlRouterProvider.otherwise('/');

  // Routing
  $stateProvider
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
    })
});
