describe('Login', function() {
  describe('Controller: LoginCtrl', function () {
    it('should display login page', function () {
      browser.get(browser.baseUrl + '/login');

      var title = element(by.className('ol-card__title'));
      expect(title.getText()).toEqual('Login with your credentials');
    })
  });
});
