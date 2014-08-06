app.factory('LanguageService', function() {
  var LanguageService = {};

  LanguageService.getLanguages = function(projectSlug) {
    return [
      { name: 'English (United Kingdom)', locale: 'en_GB' },
      { name: 'French (France)', locale: 'fr_FR' },
      { name: 'Spanish (Spain)', locale: 'es_ES' },
    ]
  };

  return LanguageService;
});
