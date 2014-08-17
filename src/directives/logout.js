(function() {

'use strict';

angular
  .module('app')
  .directive('logout', LogoutDirective);

/**
 * @name NavbarController
 *
 * @desc Controller used to manage the navbar
 *
 * @ngInject
 */
function LogoutDirective($rootScope, $state, AuthEvents, Session) {
  return {
    restrict: 'A',
    scope: {},
    link: function(scope, el, attrs) {
      el.bind('click', function() {
        Session.destroy();
        $state.go('login');
        $rootScope.$broadcast(AuthEvents.LOGOUT_SUCCESS);
      })
    }
  };
}

})();
