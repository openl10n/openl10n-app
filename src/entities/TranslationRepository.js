(function() {
'use strict';

angular
  .module('app')
  .factory('TranslationRepository', TranslationRepository);

/**
 * @ngInject
 */
function TranslationRepository($http, $q, $timeout, ApiClient, TranslationCommit) {

  return angular.extend({}, {
    createTranslation: createTranslation
  });

  /**
   * Create a new translation
   *
   * @param {object} resource   Ressource
   * @param {string} identifier Translation identifier
   *
   * @return {object} translation
   */
  function createTranslation(resource, identifier) {
    return ApiClient.all('translations').customPOST({
      resource: resource.id,
      identifier: identifier
    });
  };

}

})();
