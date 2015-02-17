(function() {
'use strict';

angular.module('app')
  .config(AppRoutesConfig);

/**
 * @ngInject
 */
function AppRoutesConfig($urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
}

})();
