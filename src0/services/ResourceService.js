app.factory('ResourceService', function($http, $q, Configuration) {
  'use strict';

  var ResourceService = {};

  ResourceService.getResources = function(projectSlug) {
    var deferred = $q.defer();

    $http.get(Configuration.SERVER_BASE_URL + '/resources?project=' + projectSlug).success(function(data) {
      deferred.resolve(data);
    }, function() {
      deferred.reject();
    });

    return deferred.promise;
  };

  ResourceService.getResource = function(id) {
    var deferred = $q.defer();

    $http.get(Configuration.SERVER_BASE_URL + '/resources/' + id).success(function(data) {
      deferred.resolve(data);
    }, function() {
      deferred.reject();
    });

    return deferred.promise;
  };

  return ResourceService;
});
