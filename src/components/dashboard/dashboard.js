import {controller, inject} from '../../config/decorators';

@controller
export class DashboardController {
  @inject
  $mdDialog = null;

  constructor() {
    this.text = 'world';
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
