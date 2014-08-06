// app.factory('TokenInterceptor', function ($q, $window, AuthenticationService) {
//   return {
//     request: function (config) {
//       config.headers = config.headers || {};

//       if ($window.sessionStorage.token) {
//         config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
//       }

//       return config;
//     },

//     response: function (response) {
//       return response || $q.when(response);
//     }
//   };
// });
