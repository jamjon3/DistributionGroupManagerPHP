'use strict';

angular.module('distributionGroupManagerApp')
    .factory('casservice', ['$q', '$rootScope', '$location', '$window',
        function ($q, $rootScope, $location, $window) {
//            $rootScope.$on('broadcastLogin', function() {
//                $rootScope.login = Adservice.getLogin();
//            });                  
            return {
                request: function (config) {
                    return config || $q.when(config);
                },
                requestError: function(request){
                    return $q.reject(request);
                },
                response: function (response) {
                    // alert(JSON.stringify(response));
                    return response || $q.when(response);
                },
                responseError: function (response) {
                    if (response && response.status === 0) {
                        // alert(JSON.stringify(response));
                        var appPath = $location.absUrl();
//                        alert($window.location.href);
//                        alert("The login url is: "+$rootScope.login);
                        $window.location.href = $rootScope.login + "?server=" + encodeURIComponent(appPath);
                    }
                    if (response && response.status === 404) {
                        alert(response.status);
                    }
                    if (response && response.status === 302) {
                        alert(response.status);
                    }
                    if (response && response.status >= 500) {
                    }
                    // alert(response.status);
                    return $q.reject(response);
                },
                setLogin: function(login) {
                    $rootScope.login = login;
                    // $rootScope.$broadcast('broadcastLogin');
                },
                getLogin: function() {
                    return $rootScope.login;
                }
            };
    }])
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('casservice');    
    }]);

