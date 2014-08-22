app.factory('Project', function() {
  'use strict';

  var Project = function (data) {
    angular.extend(this, {
      name: '',
      slug: '',
      description: ''
    }, data);
  };

  return Project;
});
