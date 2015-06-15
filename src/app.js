import angular from 'angular';
import ngNewRouter from 'angular-new-router';
import ConfigComponent from './config/config';

import {AppController} from './components/app/app';
import {DashboardController} from './components/dashboard/dashboard';
import {ProjectController} from './components/project/project';
//import {MainComponent} from './components/Main/Main';

var app = angular.module('app', [
  'ngNewRouter',
  ConfigComponent.name,
  // AppComponent.name,
  // MainComponent.name,
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
