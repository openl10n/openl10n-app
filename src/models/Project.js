app.factory('Project', function() {

  var Project = function (data) {
    angular.extend(this, {
      name: '',
      slug: '',
      description: ''
    }, data);
  };

  return Project;
});
