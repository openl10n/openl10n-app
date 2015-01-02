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
        'title': {
          templateUrl: 'views/translate/toolbar-title.html',
          controller: 'TranslateTitleController',
        },
        'menu': {
          templateUrl: 'views/translate/toolbar-menu.html',
          controller: 'TranslateMenuController',
        },
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
