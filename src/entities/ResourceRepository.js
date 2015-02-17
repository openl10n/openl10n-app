(function() {
'use strict';

angular
  .module('app')
  .factory('ResourceRepository', ResourceRepository);

/**
 * @ngInject
 */
function ResourceRepository($q, ApiClient) {
  return angular.extend({}, {
    findByProject: findByProject,
  });

  /**
   * Get all languages of one project.
   *
   * @param {string} projectSlug
   *
   * @return {object}
   */
  function findByProject(projectSlug) {
    var deferred = $q.defer();

    ApiClient.all('resources').getList({project: projectSlug}).then(function(resources) {
      deferred.resolve(resources);
    });

    // var data = [
    //   { pathname: 'path/to/messages.en.yml' },
    //   { pathname: 'locales/en.yml' },
    // ];

    // deferred.resolve(data);

    return deferred.promise;
  }
}

})();
