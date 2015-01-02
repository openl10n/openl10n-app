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
function ScrollDirective($document, $timeout) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var when = attrs['scrollWhen'];
      if (!when) {
        return;
      }

      var container = attrs['scrollContainer'] ? scope[attrs['scrollContainer']] : $document;
      var offset = +attrs['scrollOffset'] || 0;
      var duration = +attrs['scrollDuration'] || 0;
      var delay = +attrs['scrollDelay'] || 0;

      var unwatch = scope.$watch(when, function(newValue, oldValue) {
        if (!oldValue && newValue) {
          $timeout(function() {
            container.scrollTo(element, offset, duration);
          }, delay);
        }
      });

      scope.$on("$destroy", function() {
        unwatch();
      });
    }
  };
}

})();
