app.controller('DashboardController', function($scope, ProjectService) {
  $scope.projects = ProjectService.getProjects();
})
