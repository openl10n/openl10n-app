(function() {

'use strict';

angular.module('ui.gravatar').config(function (gravatarServiceProvider) {
  gravatarServiceProvider.defaults = {
    'default' : 'mm', // Mystery man as default for missing avatars
    'size' : 100
  };

  // Use https endpoint
  gravatarServiceProvider.secure = true;
});

})();
