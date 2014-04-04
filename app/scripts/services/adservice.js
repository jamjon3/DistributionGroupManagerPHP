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
            setMembers: function(members) {
                this.members = members;
                $rootScope.$broadcast('handleBroadcast');
                // $rootScope.$emit('handleBroadcast');
            },
            getMembers: function() {
                return this.members;
            }
            
        };
    });
