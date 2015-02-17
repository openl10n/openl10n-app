(function() {
'use strict';

angular
  .module('app')
  .factory('ProjectRepository', ProjectRepository);

/**
 * @ngInject
 */
function ProjectRepository($q, ApiClient) {
  return angular.extend({}, {
    findAll: findAll,
    findOne: findOne,
  });

  /**
   * Get project list.
   *
   * @return {array}
   */
  function findAll() {
    var deferred = $q.defer();

    ApiClient.all('projects').getList().then(
      function onSuccess(projects) {
        deferred.resolve(projects);
      },
      function onFail() {
        deferred.reject();
      });

    return deferred.promise;
  }

  /**
   * Get one project.
   *
   * @param {string} projectSlug
   *
   * @return {object}
   */
  function findOne(projectSlug) {
    var deferred = $q.defer();

    ApiClient.one('projects', projectSlug).get().then(
      function onSuccess(project) {
        deferred.resolve(transformProject(project));
      },
      function onFail() {
        deferred.reject();
      });

    return deferred.promise;
  }

  function transformProject(data) {
    data.defaultLocale = data.default_locale;
    delete data.default_locale;

    return data;
  }
}

})();
