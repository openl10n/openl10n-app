app.factory('LanguageService', function($http, $q, Configuration) {
  'use strict';

  var LanguageService = {};

  LanguageService.getLanguages = function(projectSlug) {
    var deferred = $q.defer();

    $http.get(Configuration.SERVER_BASE_URL + '/projects/' + projectSlug + '/languages').success(function(data) {
      deferred.resolve(data);
    }, function() {
      deferred.reject();
    });

    return deferred.promise;
  };

  LanguageService.getDefaultLanguages = function(projectSlug) {
    var deferred = $q.defer();

    var data = [
      { locale: 'en', name: 'English (UK) '},
      { locale: 'fr', name: 'French (France) '},
    ];

    deferred.resolve(data);

    return deferred.promise;
  };

  return LanguageService;
});
