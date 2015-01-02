(function() {
'use strict';

angular.module('app', [
  // Vendors
  'ngMessages',
  'ngMaterial',
  'ui.router',
  // 'ui.gravatar',
  'cfp.hotkeys',
  'infinite-scroll',
  'monospaced.elastic',
  'duScroll',
  'restangular',

  // Application specific
  'templates',

]).run(function($document) {
  // Initialize the page body.
  // This set the body attributes and inject the default html template.
  var body = $document[0].body;
  body.setAttribute('layout', 'row');
  body.innerHTML = [
    '<div flex layout="column" ui-view></div>'
    // '<div ng-include="\'views/sidebar.html\'"></div>',
    // '<div layout="column" layout-fill>',
    //   '<div ng-include="\'views/toolbar.html\'"></div>',
    //   '<md-content md-scroll-y flex ui-view></md-content>',
    // '</div>',
  ].join('');
});

})();


