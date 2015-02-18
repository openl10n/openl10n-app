(function() {
'use strict';

angular
  .module('app')
  .factory('TranslationCommitRepository', TranslationCommitRepository);

/**
 * @ngInject
 */
function TranslationCommitRepository($http, $q, $timeout, ApiClient, TranslationCommit) {
  var id = 0;

  return angular.extend({}, {
    findBy: findBy,
    findOne: findOne
  });

  /**
   * Get a list of translation commits.
   *
   * @param {string} source  Source locale
   * @param {string} target  Target locale
   * @param {object} filters List of criteria
   *
   * @return {array} The collection
   */
  function findBy(source, target, filters) {
    var deferred = $q.defer();

    function onSuccess(response) {
      var translations = response.map(_transformTranslationCommit);

      deferred.resolve(translations);
    }

    function onFail() {
      deferred.reject();
    }

    ApiClient.all('translation_commits/' + source + '/' + target)
      .getList(filters)
      .then(onSuccess, onFail);

    return deferred.promise;
  }

  /**
   * Get a translation commits.
   *
   * @param {string} source      Source locale
   * @param {string} target      Target locale
   * @param {string} translation Translation identifier
   *
   * @return {object} the translation commit
   */
  function findOne(source, target, translation) {
    return ApiClient.one('translation_commits/' + source + '/' + target, translation)
      .get()
      .then(function(translation) {
        return _transformTranslationCommit(translation);
      });
  }

  function _transformTranslationCommit(translation) {
    return new TranslationCommit({
          id: translation.id,
          key: translation.key,
          isTranslated: translation.is_translated,
          isApproved: translation.is_approved,
          sourceLocale: translation.source_locale,
          sourcePhrase: translation.source_phrase,
          targetLocale: translation.target_locale,
          targetPhrase: translation.target_phrase,
          editedPhrase: translation.target_phrase,
        });
  };

}

})();
