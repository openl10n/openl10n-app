(function() {

'use strict';

angular
  .module('app')
  .filter('matchSpecification', matchSpecificationFilter);

/**
 * @name matchSpecificationFilter
 *
 * @return {Function} The matchSpecification filter function
 *
 * @ngInject
 */
function matchSpecificationFilter() {

  /**
   * @name matchSpecification
   *
   * @desc Match the translations filter specification
   *
   * @param {String} translations
   * @param {Array} filters
   *
   * @return {Array}
   */
  return function matchSpecification(translations, filters) {
    var filtered = [];

    angular.forEach(translations, function(translation) {
      if (filters.isSatisfying(translation))
        filtered.push(translation);
    })

    return filtered;
  };
}

})();
