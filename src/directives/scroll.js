(function() {

'use strict';

angular
  .module('app')
  .directive('scroll', ScrollDirective)
;

/**
 * @name ScrollDirective
 *
 * @ngInject
 */
function ScrollDirective($window) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var when = attrs['scrollWhen'];
      if (!when) {
        return;
      }

      var container = attrs['scrollContainer'] ? scope[attrs['scrollContainer']] : $window;
      var offset = attrs['scrollOffset'] || 0;
      var duration = attrs['scrollDuration'] || 0;

      var unwatch = scope.$watch(when, function(newValue, oldValue) {
        if (!oldValue && newValue) {
          container.scrollTo(element, +offset, +duration);
        }
      });

      scope.$on("$destroy", function() {
        unwatch();
      });
    }
  };
}

})();
