'use strict';

angular.module('distributionGroupManagerApp')
  .controller('GetadgroupmembersCtrl', function ($scope,Adservice) {      
        if(typeof $scope.selectedGroup !== 'undefined' && $scope.selectedGroup !== 'null') {
            alert("Here's my group" + (typeof $scope.selectedGroup !== 'undefined')?"undefined":$scope.selectedGroup);
            Adservice.getAdGroupMembers($scope.selectedGroup).then(function(data){
                $scope.members = (data.members === 0)?[]:data.members;
                alert(JSON.stringify($scope.members));
            },function(errorMessage) {
                $scope.error=errorMessage;
            });
        } else {
            $scope.members = [];
        }
        $scope.$on('handleBroadcast', function() {
            $scope.message = Adservice.getMembers();
        });      
//    $scope.awesomeThings = [
//      'HTML5 Boilerplate',
//      'AngularJS',
//      'Karma'
//    ];
  });
