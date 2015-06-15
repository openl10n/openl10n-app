import angular from 'angular';
import configModule from './config/config';
import MainComponent from './components/main/main';

var app = angular.module('app', [
  configModule.name,
  MainComponent.name,
]);

// Override native directive-registration to support classes
var orig = app.directive;
app.directive = (name, implementation) => {
  try {
    var testForFunction = implementation();

    return orig(name, implementation);
  } catch(ex) {
    return orig(name, function () {
      return new implementation();
    });
  }
};

// Manual Application Bootstrapping
angular.element(document).ready(() => {
  angular.bootstrap(document, ['app']);
});

// Export app as so others may require it
export {app};
