(function() {
'use strict';

angular.module('app')
  .config(ThemeConfig);

/**
 * @ngInject
 */
function ThemeConfig($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue-grey')
    .accentPalette('pink')
    .warnPalette('red')
    .backgroundPalette('grey')
}

})();
