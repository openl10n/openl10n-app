(function() {
'use strict';

angular.module('app')
  .config(ProfileStateConfig);

/**
 * @ngInject
 */
function ProfileStateConfig($stateProvider) {
  $stateProvider
    .state('root.profile', {
      url: '/profile',
      resolve: {
        user: function(UserRepository) {
          return UserRepository.findMe();
        }
      },
      views: {
        'main': {
          controller: 'ProfileController',
          templateUrl: 'views/profile/layout.html',
        },
        'title': {
          controller: 'ProfileTitleController',
          templateUrl: 'views/profile/toolbar-title.html'
        }
      }
    })
}


})();
