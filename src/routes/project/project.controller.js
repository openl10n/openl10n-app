(function() {
'use strict';

angular.module('app')
  .controller('ProjectController', ProjectController)
  .controller('ProjectTitleController', ProjectTitleController)

/**
 * @ngInject
 */
function ProjectController($scope, project, languages, resources) {
  $scope.project = project;
  $scope.languages = languages;
  $scope.resources = resources;
}

/**
 * @ngInject
 */
function ProjectTitleController($scope, project) {
  $scope.project = project;
}

})();
