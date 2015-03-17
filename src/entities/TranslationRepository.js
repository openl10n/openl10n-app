(function() {
'use strict';

angular
  .module('app')
  .factory('TranslationRepository', TranslationRepository);

/**
 * @ngInject
 */
function TranslationRepository($http, $q, $timeout, ApiClient) {

  return angular.extend({}, {
    createTranslation: createTranslation,
    createPhrase: createPhrase
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

  /**
  * Create a new phrase
  *
  * @param {int}    translationId Transaltion identifier
  * @param {string} locale        Locale
  * @param {phrase} phrase        Phrase to create
  *
  * @return {promise}
  */
  function createPhrase(translationId, locale, phrase) {
    return ApiClient.one('translations', translationId).one('phrases', locale).customPOST({
      text: phrase,
      approved: false
    });
  };

}

})();
