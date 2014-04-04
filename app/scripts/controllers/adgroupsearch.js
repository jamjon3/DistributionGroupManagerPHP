'use strict';

angular.module('distributionGroupManagerApp')
  .controller('AdgroupsearchCtrl', function ($scope,Adservice) {      
        Adservice.distributionGroupService().then(function(data){
            $scope.groups = $.map(data.groups,function(v,k) {
                return [{ value: k,label: v }];
            });
        },function(errorMessage) {
            $scope.error=errorMessage;
        });
        $scope.change = function(selectedGroup) {
            alert("My selected group is "+JSON.stringify(selectedGroup));
            Adservice.getAdGroupMembers(selectedGroup).then(function(data){
                $scope.members = (data.members === 0)?[]:data.members;
                alert(JSON.stringify($scope.members));
                Adservice.setMembers($scope.members);
            },function(errorMessage) {
                $scope.error=errorMessage;
            });
        };
//      
//    $scope.awesomeThings = [
//      'HTML5 Boilerplate',
//      'AngularJS',
//      'Karma'
//    ];
  });
