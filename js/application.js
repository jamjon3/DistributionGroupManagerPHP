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
        distributionGroupManager.controller('distributionGroupCtrl', function ($scope, $http) {
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
                $scope.groups = $.map(data.groups,function(v,k) {
                    return [{ value: k,label: v }];
                });
                $scope.change = function(selectedGroup) {
                    alert(selectedGroup);
                    alert($scope.selectedGroup);
//                    $scope.$apply(function () {
//                        $scope.group = $scope.selectedGroup;
//                    });
                    $scope.group = $scope.selectedGroup;
                };
                $scope.selectedGroup = $scope.groups[0];
                // alert(JSON.stringify($scope.groups));
            });
        });
        distributionGroupManager.controller('getAdGroupMembersCtrl', function ($scope, $http) {
            $http({
                method  : 'POST',
                url     : 'index.php',
                // data    : $.param($scope.formData),  // pass in data as strings
                data: { 
                    "service": "getAdGroupMembers",
                    "group": $scope.selectedGroup
                },
                headers : { 
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }  // set the headers so angular passing info as form data (not request payload)
            }).success(function(data) {
                $scope.members = (data.members === 0)?[]:data.members;
            });
        });
        distributionGroupManager.controller('getAdAccountDetailsCtrl', function ($scope, $http) {
            $http({
                method  : 'POST',
                url     : 'index.php',
                // data    : $.param($scope.formData),  // pass in data as strings
                data: { 
                    "service": "getAdAccountDetails",
                    "group": $scope.member
                },
                headers : { 
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }  // set the headers so angular passing info as form data (not request payload)
            }).success(function(data) {
                alert(JSON.stringify(data));
                alert($scope.member);
                $scope.member_details = (data.member_details === 0)?[]:data.member_details;
                alert(JSON.stringify($scope.member_details));
//                $scope.groups = $.map(data.groups,function(v,k) {
//                    return [{ value: k,label: v }];
//                });
//                $scope.selectedOption = $scope.groups[0];
                // alert(JSON.stringify($scope.groups));
            });
        });
        // getAdGroupMembers
        // getAdAccountDetails
    
    })(jQuery);
}
