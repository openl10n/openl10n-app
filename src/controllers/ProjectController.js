(function() {

'use strict';

angular
  .module('app')
  .controller('ProjectController', ProjectController);

/**
 * @name ProjectController
 *
 * @desc Controller to display project details page
 *
 * @ngInject
 */
function ProjectController($scope, project, languages, resources) {
  $scope.project = project;
  $scope.languages = languages;
  $scope.resources = resources;
}

})();
