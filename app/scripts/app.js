'use strict';

angular
  .module('distributionGroupManagerApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
      // ,$httpProvider,casInterceptor
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    // $httpProvider.interceptors.push('casInterceptor');
    // $httpProvider.interceptors.push(casInterceptor);
  });
//angular
//  .module('distributionGroupManagerApp',[])  
//  .config(function ($httpProvider) {
//    $httpProvider.interceptors.push('casInterceptor');
//  });  
