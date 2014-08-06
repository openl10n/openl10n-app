app.factory('ProjectService', function(Project) {
  var ProjectService = {};

  ProjectService.getProjects = function() {
    return [
      new Project({ name: 'Foobar', slug: 'foobar' }),
      new Project({ name: 'Barbaz', slug: 'barbaz' }),
    ]
  };

  ProjectService.getProject = function(slug) {
    return new Project({
      name: 'Project ' + slug,
      slug: slug,
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.'
    });
  };

  return ProjectService;
});
