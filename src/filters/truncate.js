(function() {

'use strict';

angular
  .module('app')
  .filter('truncate', truncateFilter);

/**
 * @name truncateFilter
 *
 * @return {Function} The truncate filter function
 *
 * @ngInject
 */
function truncateFilter(StringHandler) {

  /**
   * @name truncate
   *
   * @desc Truncate the input text
   *
   * @param {String} input  The text to truncate
   * @param {String} length The max length of the string
   * @param {String} chars  The ending char
   *
   * @return {String} The truncated string
   */
  return function truncate(input, length, chars) {
    return StringHandler(input).truncate(length, chars).toString();
  };
}

})();
