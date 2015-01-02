describe('Flag component', function() {

  beforeEach(module('app'));

  it('should inject html', inject(function($compile, $rootScope) {
    var flag = $compile('<ol-flag country="FR"></ol-flag>')($rootScope.$new());
    $rootScope.$apply();

    expect(flag[0].tagName.toLowerCase()).toEqual('span');
    expect(flag[0].classList).toEqual('flag-icon flag-icon-fr');
  }));
});
