app.factory('TranslationService', function($http, $q, Configuration) {
  'use strict';

  var TranslationService = {};

  // Get project translations
  TranslationService.getTranslations = function(projectSlug) {
    var deferred = $q.defer();

    $http.get(Configuration.SERVER_BASE_URL + '/translations?project=' + projectSlug).success(function(data) {
      deferred.resolve(data);
    }, function() {
      deferred.reject();
    });

    return deferred.promise;
  };

  return TranslationService;
});
