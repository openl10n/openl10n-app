import {inject, controller, routes} from '../../config/decorators';

/* jshint ignore:start */
@controller
@routes([
  { path: '',                       component: 'home' },
  { path: 'projects/:slug',         component: 'project' }
])
/* jshint ignore:end */
export class AppController {}
