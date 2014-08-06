app.controller('DashboardCtrl', function($scope, ProjectService) {
  $scope.projects = ProjectService.getProjects();
})
