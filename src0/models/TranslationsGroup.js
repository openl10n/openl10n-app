(function() {

'use strict';

angular
  .module('app')
  .factory('TranslationsGroup', TranslationsGroup);

/**
 * @ngInject
 */
function TranslationsGroup(TranslationCommitList) {

  var Group = function (resource, context, filters) {
    this.resource = resource;
    this.translations = new TranslationCommitList(context, filters);
  };

  // Group.prototype.fn = function() {
  // };

  return Group;
}

})();
