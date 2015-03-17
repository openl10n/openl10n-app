(function() {
'use strict';

angular.module('app', [
  // Vendors
  'ngMessages',
  'ngMaterial',
  'ui.router',
  'ui.gravatar',
  'cfp.hotkeys',
  'infinite-scroll',
  'monospaced.elastic',
  'duScroll',
  'restangular',

  // Application specific
  'templates',
  'icons',

]).run(initialization);

/**
 * Initialize the page body.
 *
 * This function set the body attributes and inject the default html template.
 *
 * @ngInject
 */
function initialization($document) {
  var body = $document[0].body;

  body.setAttribute('layout', 'row');
  body.innerHTML = '<div flex layout="column" ui-view></div>';
}

})();
