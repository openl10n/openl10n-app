(function() {

'use strict';

angular
  .module('app')
  .directive('autoselect', AutoSelectDirective);

/**
 * @name AutoSelectDirective
 *
 * @desc AutoSelect on text fields
 *
 * @ngInject
 */
function AutoSelectDirective($timeout) {
  return {
    restrict: 'A',
    scope: {},
    link: function(scope, element, attrs) {
      $timeout(function() {
        element[0].select();
      }, 0);
    }
  };
}

})();
