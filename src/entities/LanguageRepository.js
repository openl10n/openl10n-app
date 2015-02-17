(function() {
'use strict';

angular
  .module('app')
  .factory('LanguageRepository', LanguageRepository);

/**
 * @ngInject
 */
function LanguageRepository($q, ApiClient) {
  return angular.extend({}, {
    findAll: findAll,
    findByProject: findByProject,
  });

  /**
   * Get all supported language list.
   *
   * @return {array}
   */
  function findAll() {
    var deferred = $q.defer();

    ApiClient.all('languages').getList().then(function(languages) {
      deferred.resolve(languages);
    });

    return deferred.promise;
  }

  /**
   * Get all languages of one project.
   *
   * @param {string} projectSlug
   *
   * @return {object}
   */
  function findByProject(projectSlug) {
    var deferred = $q.defer();

    ApiClient.one('projects', projectSlug).getList('languages').then(function(languages) {
      deferred.resolve(languages);
    });

    return deferred.promise;
  }
}

})();
