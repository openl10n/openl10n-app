(function() {
'use strict';

angular.module('app')
  .config(GravatarConfig);

/**
 * @ngInject
 */
function GravatarConfig(gravatarServiceProvider) {
  gravatarServiceProvider.defaults = {
    'default' : 'mm', // Mystery man as default for missing avatars
    'size' : 100
  };

  // Use https endpoint
  gravatarServiceProvider.secure = true;
}

})();
