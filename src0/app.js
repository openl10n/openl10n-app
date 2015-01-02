var app = angular.module('app', [
  'templates',
  'ui.router',
  'ui.gravatar',
  'cfp.hotkeys',
  'infinite-scroll',
  'monospaced.elastic',
  'duScroll',
]);

// Declare the module used to inline templates
angular.module('templates', []);

// Initialize the page body.
// Here we just add a class to the body and set the default html template.
app.run(function($document) {
  var body = $document[0].body;
  body.classList.add('document');
  body.innerHTML = [
    '<div ng-include="\'views/navbar.html\'"></div>',
    '<div class="document__content" ui-view></div>',
  ].join('');
});
