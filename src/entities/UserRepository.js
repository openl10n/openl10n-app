(function() {
'use strict';

angular
  .module('app')
  .factory('UserRepository', UserRepository);

/**
 * @ngInject
 */
function UserRepository($q, ApiClient) {
  return angular.extend({}, {
    findMe: findMe,
  });

  /**
   * Get all supported language list.
   *
   * @return {array}
   */
  function findMe() {
    var deferred = $q.defer();

    ApiClient.one('me').get().then(function(languages) {
      deferred.resolve(languages);
    });

    return deferred.promise;
  }
}

})();
