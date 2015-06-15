import {controller} from '../../config/decorators';

/* jshint ignore:start */
@controller
/* jshint ignore:end */
export class DashboardController {
  constructor() {
    this.text = 'world';
  }
}
