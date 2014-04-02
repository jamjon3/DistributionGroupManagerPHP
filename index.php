<?php
    require_once "UsfAcDistributionManagerServices.php";
    $params = json_decode(file_get_contents('php://input'), true);
    $distributionManagerServices = new DistributionManagerServices("AD Group Manager", "CAS","itActivedirGroupmanager",TRUE);
    // Invoke the services module in case there's a service request
    error_log(file_get_contents('php://input'));
    //CHeck Authorization
    if(! $distributionManagerServices->isAuthorized()) {
            echo 'Unauthorized Access!';
            exit;
    }
    $distributionManagerServices->invokeService($params);    
?>
<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html ng-app='distributionGroupManager'>
    <head>
        <meta charset="UTF-8">
        <title>Distribution Group Manager</title>
        <link href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap-theme.min.css" rel="stylesheet">
        <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.14/angular.js"></script>
        <!-- <script type='text/javascript' src='https://www.google.com/jsapi'></script> -->
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
        <script language='javascript' src='js/application.js' type='text/javascript'></script>
    </head>
    <body>
        <form name="group_form" method="POST">
            <div ng-controller="distributionGroupCtrl">
                <select id="active_group" name="group" ng-model="selectedGroup" ng-options="group.value as group.label for group in groups" ng-change="change(selectedGroup)">
                     <option value="">Select Group</option>
                </select>
                {{selectedGroup.label}}
                <div id="add_user_line">
                    <label for="add_user">Add NetID: </label><input type="text" name="add_user" id="add_user" ng-model="user.name" required ng-minlength="3" ng-maxlength="10">
                    <input type="submit" value="Add" />
                </div>   
                <div id="group_members" style="width: 550px; border: 1px solid black; margin: 10px; padding: 10px;" ng-controller="getAdGroupMembersCtrl"> 
                    I have {{members.length}} Members. They are:
                    <span name="members" ng-repeat="member in members">
                        <input type="checkbox" name="remove_member[]" value="{{member}}" />
                        <span ng-controller="getAdAccountDetailsCtrl" >{{member}} ({{member_details.cn[0]}})</span>
                    </span>
                </div>
                <input type="submit" value="Remove Users" />
            </div>
        </form>
        <?php
            error_log("Will this show up");
            // put your code here
        ?>
        <script src="//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>
    </body>
</html>
