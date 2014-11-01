(function() {

'use strict';

app.config(function($stateProvider, $urlRouterProvider) {
  // Redirect 404 to homepage
  $urlRouterProvider.otherwise('/');

  // Routing
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'views/login.html',
      controller: 'LoginController',
    })
    .state('dashboard', {
      url: '/',
      menu: 'dashboard',
      templateUrl: 'views/dashboard.html',
      controller: 'DashboardController',
      resolve: {
        projects: function(ProjectService) {
          return ProjectService.getProjects();
        },
      }
    })
    .state('profile', {
      url: '/profile',
      templateUrl: 'views/profile.html',
      controller: 'ProfileController',
      resolve: {
        user: function(AuthenticationService) {
          return AuthenticationService.getCurrentUser();
        }
      }
    })
    .state('project', {
      url: '/projects/{slug:[a-zA-Z0-9\-\.\_]+}',
      menu: 'translate',
      templateUrl: 'views/project.html',
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
      url: '/projects/:slug/translate',
      menu: 'translate',
      templateUrl: 'views/translate.html',
      controller: 'TranslateController',
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
        // translations: function($stateParams, TranslationService) {
        //   return TranslationService.getTranslations($stateParams.slug);
        // },
        // target: function($stateParams) {
        //   return $stateParams.locale;
        // },
      }
    })
    .state('translate.source', {
      url: '/{source:[a-zA-Z\-_]+}',
      menu: 'translate',
      controller: 'TranslateSourceController',
      // Setting the source locale doesn't change the UI so let's put an empty template
      template: '<ui-view/>',
      resolve: {
        source: function($stateParams) {
          return $stateParams.source;
        }
      }
    })
    .state('translate.source.target', {
      url: '/{target:[a-zA-Z\-_]+}',
      menu: 'translate',
      controller: 'TranslateTargetController',
      template: '<ui-view/>',
      resolve: {
        target: function($stateParams) {
          return $stateParams.target;
        },
      }
    })
    // .state('translate.source.target.phrase', {
    //   url: '/{id:[0-9]+}',
    //   menu: 'translate',
    //   templateUrl: 'views/translate-phrase.html',
    //   controller: 'TranslatePhraseController',
    //   resolve: {
    //     translationId: function($stateParams) {
    //       return +$stateParams.id;
    //     },
    //   }
    // })
    .state('glossary', {
      url: '/glossary',
      menu: 'glossary',
      templateUrl: 'views/glossary.html',
      controller: 'GlossaryController',
    })
});

app.run(function($rootScope, Stopwatch) {
  var stopwatch = Stopwatch.create();

  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    stopwatch.start();
  })

  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    console.log('Time to go to state = ' + stopwatch.time());
    stopwatch.reset();
  })

  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
    stopwatch.reset();
    console.log(event);
  })
})

})();
