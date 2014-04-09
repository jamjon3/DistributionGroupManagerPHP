'use strict';

angular.module('distributionGroupManagerApp')
    .factory('Adservice', function($http, $q, $rootScope) {
        return {
            distributionGroupService: function() {
                //Creating a deferred object
                var deferred = $q.defer();
                $http({
                    method  : 'POST',
                    url     : 'api/server.php',
                    // data    : $.param($scope.formData),  // pass in data as strings
                    data: { "service": "AdGroupSearch" },
                    headers : { 
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }  // set the headers so angular passing info as form data (not request payload)
                }).success(function(data) {
                    //Passing data to deferred's resolve function on successful completion
                    deferred.resolve(data);
                }).error(function(){
                    //Sending a friendly error message in case of failure
                    deferred.reject("An error occured while fetching items");
                });
                //Returning the promise object
                return deferred.promise;
            },
            getAdGroupMembers: function(selectedGroup) {
                //Creating a deferred object
                var deferred = $q.defer();
                $http({
                    method  : 'POST',
                    url     : 'api/server.php',
                    // data    : $.param($scope.formData),  // pass in data as strings
                    data: { 
                        "service": "getAdGroupMembersWithDetails",
                        "group": selectedGroup
                    },
                    headers : { 
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }  // set the headers so angular passing info as form data (not request payload)
                }).success(function(data) {
                    //Passing data to deferred's resolve function on successful completion
                    deferred.resolve(data);
                }).error(function(){
                    //Sending a friendly error message in case of failure
                    deferred.reject("An error occured while fetching items");
                });
                //Returning the promise object
                return deferred.promise;
            },
            getAdAccountDetails: function(member) {
                // Creating a deferred object
                var deferred = $q.defer();
                $http({
                    method  : 'POST',
                    url     : 'api/server.php',
                    // data    : $.param($scope.formData),  // pass in data as strings
                    data: { 
                        "service": "getAdAccountDetails",
                        "group": member
                    },
                    headers : { 
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }  // set the headers so angular passing info as form data (not request payload)
                }).success(function(data) {
                    //Passing data to deferred's resolve function on successful completion
                    deferred.resolve(data);
                }).error(function(){
                    //Sending a friendly error message in case of failure
                    deferred.reject("An error occured while fetching items");
                });
                //Returning the promise object
                return deferred.promise;                    
            },
            isAuthorized: function() {
                // Creating a deferred object
                var deferred = $q.defer();
                $http({
                    method  : 'POST',
                    url     : 'api/server.php',
                    // data    : $.param($scope.formData),  // pass in data as strings
                    data: { 
                        "service": "isAuthorized"
                    },
                    headers : { 
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }  // set the headers so angular passing info as form data (not request payload)
                }).success(function(data) {
                    //Passing data to deferred's resolve function on successful completion
                    deferred.resolve(data);
                }).error(function(){
                    //Sending a friendly error message in case of failure
                    deferred.reject("An error occured while fetching items");
                });
                //Returning the promise object
                return deferred.promise;                    
            },
            casLoginUrl: function() {
                // Creating a deferred object
                var deferred = $q.defer();
                $http({
                    method  : 'POST',
                    url     : 'api/server.php',
                    // data    : $.param($scope.formData),  // pass in data as strings
                    data: { 
                        "service": "casLoginUrl"
                    },
                    headers : { 
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }  // set the headers so angular passing info as form data (not request payload)
                }).success(function(data) {
                    //Passing data to deferred's resolve function on successful completion
                    deferred.resolve(data);
                }).error(function(){
                    //Sending a friendly error message in case of failure
                    deferred.reject("An error occured while fetching items");
                });
                //Returning the promise object
                return deferred.promise;                    
            },
            setMembers: function(members) {
                this.members = members;
                $rootScope.$broadcast('handleBroadcast');
                // $rootScope.$emit('handleBroadcast');
            },
            getMembers: function() {
                return this.members;
            },
            setLogin: function(login) {
                this.login = login;
                $rootScope.$broadcast('broadcastLogin');
            },
            getLogin: function() {
                return this.login;
            }
            
        };
    });
        
//angular.module('distributionGroupManagerApp')
//    .factory('casInterceptor', function($injector,$q, $rootScope) {
//        var $http; //initialized later because of circular dependency problem
//        $http = $http || $injector.get('$http');
//        return {
//            'response': function(response) {
//                // do something on success
//                return response || $q.when(response);
//            },
//            // optional method
//           'responseError': function(rejection) {
//                // do something on error
//                
//                alert(JSON.stringify(rejection));
//                // Old way (won't work but is a way)
//                // reload entire page - this leads to login page
//                window.location.reload();
//                return $q.reject(rejection);
//            }
//        };
//    })
//    .config(function ($httpProvider) {
//        $httpProvider.interceptors.push('casInterceptor');
//    });
// $httpProvider.interceptors.push('casInterceptor');


/**
* Holds all the requests which failed due to 401 response,
* so they can be re-requested in the future, once login is completed.
*/
//angular.module('distributionGroupManagerApp')
//    .factory('requests302', ['$injector', function($injector) {
//        var buffer = [];
//        var $http; //initialized later because of circular dependency problem
//        function retry(config, deferred) {
//            $http = $http || $injector.get('$http');
//            $http(config).then(function(response) {
//                deferred.resolve(response);
//            });
//        }
//
//        return {
//            add: function(config, deferred) {
//                buffer.push({
//                    config: config,
//                    deferred: deferred
//                });
//            },
//            retryAll: function() {
//                for (var i = 0; i < buffer.length; ++i) {
//                    retry(buffer[i].config, buffer[i].deferred);
//                }
//                buffer = [];
//            }
//        };
//    }])
///**
//* $http interceptor.
//* On 401 response - it stores the request and broadcasts 'event:angular-auth-loginRequired'.
//*/
//    .config(['$httpProvider', function($httpProvider) {
//        var interceptor = function($rootScope, $q, requests302) {
//            function success(response) {
//                return response;
//            }
//
//            function error(response) {
//                var status = response.status;
//                //We're only going to worry about 401s that come back from the ping service
//                if (status == 302 && /.*\/ping/i.test(response.config.url)) {
//                    var deferred = $q.defer();
//                    requests302.add(response.config, deferred);
//                    $rootScope.$broadcast('event:angular-auth-loginRequired');
//                    return deferred.promise;
//                }
//                // otherwise
//                return $q.reject(response);
//            }
//
//            return function(promise) {
//                return promise.then(success, error);
//            };
//
//        };
//        $httpProvider.responseInterceptors.push(['$rootScope', '$q', 'requests302', interceptor]);
//    }]);
