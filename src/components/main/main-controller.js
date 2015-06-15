import {controller, inject, injectAs} from '../../config/decorators';

/* jshint ignore:start */
@controller
@inject('$scope')
/* jshint ignore:end */
export class MainCtrl {
  constructor($scope) {
    this.foobar = 'AngularJS';
  }
}
