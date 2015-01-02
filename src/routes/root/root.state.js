(function() {
'use strict';

angular.module('app')
  .config(RootStateConfig);

/**
 * @ngInject
 */
function RootStateConfig($stateProvider) {
  $stateProvider
    .state('root', {
      url: '',
      templateUrl: 'views/layout.html',
      abstract: true
    })
}


})();
