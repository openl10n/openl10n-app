(function() {

var defaultConfig = {
  SERVER_BASE_URL: 'http://openl10n.dev/api',
}

if (typeof config === 'undefined') {
  config = defaultConfig;
}

angular
  .module('app')
  .constant('Configuration', config);

})();
