'use strict';

angular.module('distributionGroupManagerApp')
    .controller('CasauthorizedCtrl', function ($scope,Adservice,casservice) {
        Adservice.casLoginUrl().then(function(data){
            $scope.login = data.login;
            Adservice.setLogin(data.login);
            casservice.setLogin(data.login);
        },function(errorMessage) {
            $scope.error=errorMessage;
        });
        $scope.awesomeThings = [
          'HTML5 Boilerplate',
          'AngularJS',
          'Karma'
        ];
    });
