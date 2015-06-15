import angular from 'angular';
import DecoratorsComponent from './decorators';

let ConfigComponent = angular.module('app.core', [
  DecoratorsComponent.name
]);

export default ConfigComponent;
