app.factory('TranslationService', function($q) {
  var TranslationService = {};

  // Get project translations
  TranslationService.getTranslations = function(projectSlug) {
    console.log('TranslationService.getTranslations');

    var deferred = $q.defer();

    var data = [
      {
        id: 1,
        key: 'key1',
        resourceId: 1,
        phrases: {
          'en': { text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', isApproved: true },
          'fr': { text: 'Bonjour monde', isApproved: true },
          'es': { text: 'Hola!', isApproved: false },
          'it': { text: 'Bonjourno', isApproved: false },
        }
      },
      {
        id: 2,
        key: 'key2',
        resourceId: 1,
        phrases: {
          'en': { text: 'Hello 2', isApproved: true },
          'fr': { text: 'Bonjour 2', isApproved: false },
        }
      },
    ];

    deferred.resolve(data);

    return deferred.promise;
  };

  return TranslationService;
});
