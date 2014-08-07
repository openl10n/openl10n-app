app.config(function($stateProvider, $urlRouterProvider) {
  // Redirect 404 to homepage
  $urlRouterProvider.otherwise('/');

  // Routing
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'partials/login.html',
      controller: 'LoginController',
    })
    .state('dashboard', {
      url: '/',
      templateUrl: 'partials/dashboard.html',
      controller: 'DashboardController',
      resolve: {
        projects: function(ProjectService) {
          return ProjectService.getProjects();
        },
      }
    })
    .state('project', {
      url: '/project/:slug',
      templateUrl: 'partials/project.html',
      controller: 'ProjectController',
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
      controller: 'TranslateController',
      resolve: {
        project: function($stateParams, ProjectService) {
          return ProjectService.getProject($stateParams.slug);
        },
        languages: function($stateParams, LanguageService) {
          return LanguageService.getLanguages($stateParams.slug);
        },
      }
    })
    .state('translate.phrase', {
      url: '/:id',
      templateUrl: 'partials/translate-phrase.html',
      controller: 'TranslatePhraseController',
    })
});

app.run(function($rootScope) {
  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
    console.log(event);
  })
})
