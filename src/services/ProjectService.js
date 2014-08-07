app.factory('ProjectService', function($http, $q, Configuration, Project) {
  var ProjectService = {};

  ProjectService.getProjects = function() {
    var deferred = $q.defer();

    $http.get(Configuration.SERVER_BASE_URL + '/projects').success(function(data) {
      deferred.resolve(data);
    }, function() {
      deferred.reject();
    });

    return deferred.promise;
  };

  ProjectService.getProject = function(slug) {
    var deferred = $q.defer();

    $http.get(Configuration.SERVER_BASE_URL + '/projects/' + slug).success(function(data) {
      deferred.resolve(new Project(data));
    }, function() {
      deferred.reject();
    });

    return deferred.promise;
  };

  return ProjectService;
});
