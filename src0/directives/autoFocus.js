(function() {

'use strict';

angular
  .module('app')
  .directive('autoFocus', AutoFocusDirective);

/**
 * @name AutoFocusDirective
 *
 * @desc Autofocus on text fields
 *
 * @ngInject
 */
function AutoFocusDirective($timeout) {
  return {
    restrict: 'A',
    scope: {},
    link: function(scope, element, attrs) {
      $timeout(function() {
        element[0].focus();
      }, 0);
    }
  };
}

})();
