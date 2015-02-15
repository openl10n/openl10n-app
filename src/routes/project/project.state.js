(function() {
'use strict';

angular.module('app')
  .config(ProjectStateConfig);

/**
 * @ngInject
 */
function ProjectStateConfig($stateProvider) {
  $stateProvider
    .state('root.project', {
      url: '/projects/:project',
      resolve: {
        project: function($stateParams, ProjectRepository) {
          return ProjectRepository.findOne($stateParams.project);
        },
        languages: function($stateParams, LanguageRepository) {
          return LanguageRepository.findByProject($stateParams.project);
        },
        resources: function($stateParams, ResourceRepository) {
          return ResourceRepository.findByProject($stateParams.project);
        }
      },
      views: {
        'main': {
          controller: 'ProjectController',
          templateUrl: 'views/project/layout.html',
        },
        'toolbar-title': {
          controller: 'ProjectTitleController',
          templateUrl: 'views/project/toolbar-title.html'
        }
      }
    })
}


})();
