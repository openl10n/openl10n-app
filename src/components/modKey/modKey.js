(function() {
'use strict';

angular
  .module('app')
  .directive('modKey', ModKeyDirection);

/**
 * @name ModKeyDirection
 *
 * @desc Display MOD key depending on the OS (Ctrl or Cmd)
 *
 * @ngInject
 */
function ModKeyDirection() {
  return {
    restrict: 'EA',
    scope: {},
    template: function() {
      var isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;

      return isMac ? 'Cmd' : 'Ctrl';
    }
  };
}

})();
