(function() {
'use strict';

angular.module('app')
  .controller('ToolbarController', ToolbarController)
  .controller('SidebarController', SidebarController)

/**
 * @ngInject
 */
function ToolbarController($scope, $mdSidenav) {
  $scope.openSidebar = function() {
    $mdSidenav('left').open();
  }
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
