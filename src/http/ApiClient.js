(function() {
'use strict';

angular
  .module('app')
  .factory('ApiClient', ApiClient)

/**
 * @ngInject
 */
function ApiClient(Restangular, Configuration, Auth) {
  return Restangular
    // Set default HTTP config
    .withConfig(function(RestangularConfigurer) {
      RestangularConfigurer.setBaseUrl(Configuration.API_BASE_URL);
      RestangularConfigurer.setDefaultHeaders({
        'Accept': 'application/json;v=' + Configuration.API_VERSION,
        'Accept-Language': 'en',
      });
    })

    // Add Authorization header when authenticated
    .addFullRequestInterceptor(function(element, operation, route, url, headers, params, httpConfig) {
      if (Auth.isAuthenticated()) {
        headers['Authorization'] = 'Basic ' + Auth.getToken();
      }

      return {
        headers: headers
      };
    })

    // Handle authentication error
    .setErrorInterceptor(function(response, deferred, responseHandler) {
      if (403 === response.status) {
        // refreshAccesstoken().then(function() {
          // Repeat the request and then call the handlers the usual way.
          // $http(response.config).then(responseHandler, deferred.reject);
          // Be aware that no request interceptors are called this way.
        // });

        return false; // error handled
      }

      return true;
    })
}

})();
