(function() {
'use strict';

angular.module('app')
  .controller('ToolbarController', ToolbarController)
  .controller('SidebarController', SidebarController)

/**
 * @ngInject
 */
function ToolbarController($scope, $mdSidenav, UserRepository) {
  $scope.openSidebar = function() {
    $mdSidenav('left').open();
  }

  UserRepository.findMe().then(function(user) {
    $scope.user = user;
  });
}

/**
 * @ngInject
 */
function SidebarController($scope, $mdSidenav) {
  $scope.closeSidebar = function() {
    $mdSidenav('left').close();
  }
}

})();
