import {inject, controller} from '../../config/decorators';

/* jshint ignore:start */
@controller
@inject('$routeParams')
/* jshint ignore:end */
export class ProjectController {
  constructor($routeParams) {
    this.name = 'Foobar';
  }
}
