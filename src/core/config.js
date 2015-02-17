(function() {
'use strict';

var defaultConfig = {
  API_BASE_URL: 'http://openl10n.dev/api',
  API_VERSION: '0.2',
}

if (typeof config === 'undefined') {
  config = defaultConfig;
}

config = angular.extend(defaultConfig, config);

// Trim the final slash if exist
config.API_BASE_URL = config.API_BASE_URL.replace(/\/+$/g, '');

angular
  .module('app')
  .constant('Configuration', config);

})();
