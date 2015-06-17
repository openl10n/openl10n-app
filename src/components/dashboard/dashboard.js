import {controller, inject} from '../../config/decorators';

@controller
export class DashboardController {
  @inject
  $mdDialog = null;

  constructor() {
    this.text = 'world';

    this.state = null;
    this.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
      'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
      'WY').split(' ').map(function (state) { return { abbrev: state }; });
  }

  showAlert(event) {
    this.$mdDialog.show(
      this.$mdDialog.alert()
        .parent(angular.element(document.body))
        .title('This is an alert title')
        .content('You can specify some description text in here.')
        .ariaLabel('Alert Dialog Demo')
        .ok('Got it!')
        .targetEvent(event)
    );
  }
}
