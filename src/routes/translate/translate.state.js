(function() {
'use strict';

angular.module('app')
  .config(TranslateStateConfig);

/**
 * @ngInject
 */
function TranslateStateConfig($stateProvider) {
  $stateProvider
    .state('root.translate', {
      url: '/projects/:project/translate',
      resolve: {
        editor: function($stateParams, Editor) {
          return new Editor($stateParams.project).initialize();
        }
      },
      views: {
        'main': {
          templateUrl: 'views/translate/layout.html',
          controller: 'TranslateController',
        },
        'toolbar-title': {
          templateUrl: 'views/translate/toolbar-title.html',
          controller: 'TranslateTitleController',
        },
        'toolbar-menu': {
          templateUrl: 'views/translate/toolbar-menu.html',
          controller: 'TranslateMenuController',
        },
        'toolbar-middle': {
          templateUrl: 'views/translate/toolbar-middle.html',
          controller: 'TranslateSearchController',
        },
        'footer': {
          templateUrl: 'views/translate/footer.html',
          controller: 'TranslateFooterController',
        }
      }
    })
    .state('root.translate.source', {
      url: '/:source',
      resolve: {
        sourceLocale: function($stateParams) {
          return $stateParams.source;
        }
      },
      template: '<ui-view />',
      controller: 'TranslateSourceController',
    })
    .state('root.translate.source.target', {
      url: '/:target',
      resolve: {
        targetLocale: function($stateParams) {
          return $stateParams.target;
        }
      },
      template: '<ui-view />',
      controller: 'TranslateTargetController',
    })
}


})();
