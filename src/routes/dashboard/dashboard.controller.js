(function() {
'use strict';

angular.module('app')
  .controller('DashboardController', DashboardController)

/**
 * @ngInject
 */
function DashboardController($scope, projects) {
  $scope.projects = projects;
}

})();
