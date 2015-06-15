import angular from 'angular';
import DecoratorsComponent from './decorators';

let configComponent = angular.module('app.core', [
  DecoratorsComponent.name
]);

export default configComponent;
