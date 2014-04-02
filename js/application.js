//if (window.google && window.google.load) {
//    google.load('jquery', '2.1');
//    // google.load('jqueryui', '1.8.13');
//} else {
//    document.write('<script type="text/javascript" src="/AccountTools/js/jquery-1.4.2.min.js"></script>');
//    document.write('<script type="text/javascript" src="/AccountTools/js/jquery-ui-1.8.custom.min.js"></script>');
//}
//google.setOnLoadCallback(function () {  
//    angular.bootstrap(document.body, ['my-app']);
//});
if (typeof jQuery !== 'undefined') {
    (function($) {
        $('#spinner').ajaxStart(function() {
            $(this).fadeIn();
        }).ajaxStop(function() {
            $(this).fadeOut();
        });
        // angular.bootstrap(document.body, ['distributionGroupManager']);
        var distributionGroupManager = angular.module('distributionGroupManager', []);
        // AdGroupSearch
//        distributionGroupManager.controller('distributionGroupCtrl', ['$scope', function($scope) {
//            $scope.greeting = 'Hola!';
//        }]);
        distributionGroupManager.factory('distributionRepository', function($http, $q, $rootScope) {
            return { 
                distributionGroupService: function() {
                    //Creating a deferred object
                    var deferred = $q.defer();
                    $http({
                        method  : 'POST',
                        url     : 'index.php',
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
                        url     : 'index.php',
                        // data    : $.param($scope.formData),  // pass in data as strings
                        data: { 
                            "service": "getAdGroupMembers",
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
                        url     : 'index.php',
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
                },
                getMembers: function() {
                    return this.members;
                }
                
            };
        });
        distributionGroupManager.controller('distributionGroupCtrl', function ($scope, $http, distributionRepository) {
            distributionRepository.distributionGroupService().then(function(data){
                $scope.groups = $.map(data.groups,function(v,k) {
                    return [{ value: k,label: v }];
                });
            },function(errorMessage) {
                $scope.error=errorMessage;
            });
            $scope.change = function(selectedGroup) {
                alert("My selected group is "+JSON.stringify(selectedGroup));
                distributionRepository.getAdGroupMembers(selectedGroup).then(function(data){
                    $scope.members = (data.members === 0)?[]:data.members;
                    alert(JSON.stringify($scope.members));
                    distributionRepository.setMembers($scope.members);
                },function(errorMessage) {
                    $scope.error=errorMessage;
                });
            };
        });
        distributionGroupManager.controller('getAdGroupMembersCtrl', function ($scope, $http, distributionRepository) {            
            if(typeof $scope.selectedGroup !== 'undefined' && $scope.selectedGroup !== 'null') {
                alert("Here's my group" + (typeof $scope.selectedGroup !== 'undefined')?"undefined":$scope.selectedGroup);
                distributionRepository.getAdGroupMembers($scope.selectedGroup).then(function(data){
                    $scope.members = (data.members === 0)?[]:data.members;
                    alert(JSON.stringify($scope.members));
                },function(errorMessage) {
                    $scope.error=errorMessage;
                });
            } else {
                $scope.members = [];
            }
            $scope.$on('handleBroadcast', function() {
                $scope.message = distributionRepository.getMembers();
            });
        });
        distributionGroupManager.controller('getAdAccountDetailsCtrl', function ($scope, $http) {
            distributionRepository.getAdAccountDetails($scope.member).then(function(data){
                $scope.member_details = (data.member_details === 0)?[]:data.member_details;
            },function(errorMessage) {
                $scope.error=errorMessage;
            });
        });
    
    })(jQuery);
}
