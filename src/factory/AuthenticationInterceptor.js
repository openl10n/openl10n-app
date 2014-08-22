app.factory('AuthenticationInterceptor', function ($q, Session) {
  'use strict';

  return {
    request: function (config) {
      config.headers = config.headers || {};

      if (Session.isAuthenticated()) {
        config.headers.Authorization = 'Basic ' + Session.getToken();
      }

      return config;
    },

    // response: function (response) {
    //   return response || $q.when(response);
    // }
  };
});
