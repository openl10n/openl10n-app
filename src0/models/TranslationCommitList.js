(function() {

'use strict';

angular
  .module('app')
  .factory('TranslationCommitList', TranslationCommitList);

/**
 * @ngInject
 */
function TranslationCommitList($q, TranslationCommitRepository) {

  var List = function (context, filters) {
    this.filters = filters;
    this.context = context;

    this.items = [];

    // Handle paging
    this.page = 0;
    this.perPage = 20;

    // Loading state
    this.loading = false;
    this.complete = false;
  }

  List.prototype.reset = function() {
    this.items = [];
    this.complete = false;
    this.page = 0;
  }

  List.prototype.loadMore = function() {
    var deferred = $q.defer();

    // Throttle calls & avoid loading when complete
    if (this.loading || this.complete)
      return deferred.promise;

    // Ensure context is correctly defined
    if (!this.context.source || !this.context.target)
      return deferred.promise;

    this.loading = true;

    this.busy = true;
    this.page++;

    this.filters.page = this.page;
    this.filters.per_page = this.perPage;

    TranslationCommitRepository
      .findBy(this.context.source, this.context.target, this.filters)
      .then(function(items) {
        if (items.length < this.perPage) {
          this.complete = true;
        }

        for (var i = 0; i < items.length; i++) {
          var translationCommit = items[i];
          translationCommit.edit_phrase = translationCommit.target_phrase;
          this.items.push(translationCommit);
        }

        this.loading = false;
        deferred.resolve();
      }.bind(this),
      function() {
        this.complete = true;
        this.loading = false;
        deferred.resolve();
      }.bind(this));

    return deferred.promise;
  }

  return List;
}

})();
