describe('Directive: logout', function () {
  'use strict';

  var element;
  var scope;
  var Session;

  beforeEach(module('app'));

  beforeEach(inject(function(_Session_, $rootScope, $compile) {
    // Dependencies
    Session = _Session_;

    // Element creation
    scope = $rootScope.$new();
    element = '<button logout>Logout</button>';

    element = $compile(element)(scope);
    scope.$digest();
  }));

  it('should destroy session on click', function () {
    spyOn(Session, 'destroy');

    element[0].click();

    expect(Session.destroy).toHaveBeenCalled();
  });
});
