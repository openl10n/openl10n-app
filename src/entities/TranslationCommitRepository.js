(function() {

'use strict';

angular
  .module('app')
  .service('TranslationCommitRepository', TranslationCommitRepository);


/**
 * @ngInject
 */
function TranslationCommitRepository($http, $q, Configuration) {

  this.get = function(source, target, translationId) {

  }

  this.findBy = function(source, target, filters) {
    var deferred = $q.defer();

    var params = [];
    for (var name in filters) {
      params.push(encodeURIComponent(name) + "=" + encodeURIComponent(filters[name]));
    }

    var url = Configuration.SERVER_BASE_URL + '/translation_commits/' + source + '/' + target + '?' + params.join('&');

    $http.get(url).success(function(data) {
      deferred.resolve(data);
    }).error(function() {
      deferred.reject();
    });

    return deferred.promise;
  }
}

})();
