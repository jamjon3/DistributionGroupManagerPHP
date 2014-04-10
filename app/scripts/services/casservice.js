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
                        var modifiedAppPath = appPath.match(/^[^?]+/)[0];
                        if(modifiedAppPath.slice(-2) !== "#/") {
                            appPath = modifiedAppPath + "#/";
                        } else {
                            appPath = modifiedAppPath;
                        }
                        // alert(appPath.match(/^[^?]+/)[0]);
                        alert(appPath);
                        
//                        alert($window.location.href);
//                        alert("The login url is: "+$rootScope.login);
//                        var caspath = $rootScope.login + "?service=" + encodeURIComponent(appPath.match(/^[^\#\?]+/)[0]);
//                        var caspath = $rootScope.login + "?service=" + encodeURIComponent(appPath.match(/^[^?]+/)[0]);
                        var caspath = $rootScope.login + "?service=" + encodeURIComponent(appPath);
                        // var caspath = $rootScope.login + "?service=" + encodeURIComponent(appPath.match(/^[^\#\?]+/)[0] + "api/server.php");
//                        alert(appPath.slice(0, -2));
//                        alert(appPath.match(/^[^\#\?]+/)[0]);
                        alert(appPath);
                        alert(appPath.match(/^[^\#\?]+/)[0]);
                        alert(appPath.match(/^[^?]+/)[0]);
                        alert(caspath);
                        $window.location.assign(caspath);
                        alert($location.absUrl());
                        alert(JSON.stringify($location.search()));
                        var params = $location.search();
                        if(params.ticket) {
                            $rootScope.ticket = params.ticket;
                            alert("I have a ticket! "+$rootScope.ticket);
                        }
                        // $window.location.href = $rootScope.login + "?service=" + encodeURIComponent(appPath);
//                        $window.location.href = $rootScope.login + "?server=" + appPath;
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
                },
                setTicket: function(ticket) {
                    $rootScope.ticket = ticket;
                },
                getTicket: function() {
                    return $rootScope.ticket;
                }
            };
    }])
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('casservice');    
    }]);

