app.factory('TranslationService', function($q) {
  var TranslationService = {};

  // Get project translations
  TranslationService.getTranslations = function(projectSlug) {
    console.log('TranslationService.getTranslations');

    var deferred = $q.defer();

    var data = [
      {
        id: 'key1',
        resourceId: 1,
        phrases: {
          'en': { text: 'Hello World', isApproved: true },
          'fr': { text: 'Bonjour monde', isApproved: true },
          'es': { text: 'Hola!', isApproved: false },
          'it': { text: 'Bonjourno', isApproved: false },
        }
      },
      {
        id: 'key2',
        resourceId: 1,
        phrases: {
          'en': { text: 'Hello 2', isApproved: true },
          'fr': { text: 'Bonjour 2', isApproved: true },
          'es': { text: 'Hola 2!', isApproved: false },
          'it': { text: 'Bonjourno 2', isApproved: false },
        }
      },
    ];

    deferred.resolve(data);

    return deferred.promise;
  };

  return TranslationService;
});
