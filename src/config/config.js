(function() {

var defaultConfig = {
  SERVER_BASE_URL: 'http://openl10n.dev/api',
}

if (typeof config === 'undefined') {
  config = defaultConfig;
}

// Trim the final slash if exist
config.SERVER_BASE_URL = config.SERVER_BASE_URL.replace(/\/+$/g, '');

angular
  .module('app')
  .constant('Configuration', config);

})();
