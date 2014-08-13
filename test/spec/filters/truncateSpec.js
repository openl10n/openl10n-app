describe('Filter: truncate', function () {
  'use strict';

  // Load module
  beforeEach(module('app'));

  // initialize a new instance of the filter before each test
  var truncate;
  beforeEach(inject(function($filter) {
      truncate = $filter('truncate');
  }));

  it('should truncate the string, accounting for word placement and chars count', function () {
    expect(truncate('Hello World', 3)).toMatch('...');
    expect(truncate('Hello World', 8)).toMatch('Hello...');
    expect(truncate('Hello World', 8, '…')).toMatch('Hello…');
    expect(truncate('Hello World', 100)).toMatch('Hello World');
  });
});
