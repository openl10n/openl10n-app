app.factory('ResourceService', function() {
  var ResourceService = {};

  ResourceService.getResources = function(projectSlug) {
    return [
      { id: 1, pathname: 'path/to/my/resources.en.yml' },
      { id: 2, pathname: 'path/to/my/other/resources.en.yml' },
    ]
  };

  ResourceService.getResource = function(id) {
    return {
      id: id,
      pathname: 'path/to/my/resources.en.yml',
    };
  };

  return ResourceService;
});
