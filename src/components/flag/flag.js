(function() {
'use strict';

/*
 * @ngdoc module
 * @name app.components.flag
 * @description
 * Flag
 */
angular
  .module('app')
  .directive('olFlag', flagDirective);

/*
 * @ngdoc directive
 * @name olFlag
 * @module app.components.flag
 *
 * @restrict E
 *
 * @description
 * The `<ol-flag>` directive is an element useful to display an SVG flag image
 *
 * @usage
 * <hljs lang="html">
 *  <ol-flag country="FR"></ol-flag>
 * </hljs>
 */
function flagDirective() {
  return {
    restrict: 'E',
    template: '<span></span>',
    scope: {
      country: '@'
    },
    link: function(scope, element, attr) {
      var element = angular.element(element[0].children[0]);

      element.attr('class', 'flag-icon flag-icon-' + scope.country.toLowerCase());
    }
  };
}
})();
