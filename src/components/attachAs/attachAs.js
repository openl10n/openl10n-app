(function() {

'use strict';

angular
  .module('app')
  .directive('attachAs', AttachAsDirective);

/**
 * @name AttachAsDirective
 *
 * @desc Autofocus on text fields
 *
 * @ngInject
 */
function AttachAsDirective($timeout) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var fieldName = attrs['attachAs'];
      scope[fieldName] = element;
    }
  };
}

})();
