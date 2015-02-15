(function() {
'use strict';

angular.module('app')
  .config(DashboardStateConfig);

/**
 * @ngInject
 */
function DashboardStateConfig($stateProvider) {
  $stateProvider
    .state('root.dashboard', {
      url: '/',
      views: {
        'main': {
          templateUrl: 'views/dashboard.html',
          controller: 'DashboardController',
        },
        'toolbar-title': {
          template: 'Dashboard'
        }
      },
      resolve: {
        projects: function(ProjectRepository) {
          return ProjectRepository.findAll();
        }
      }
    })
}


})();
