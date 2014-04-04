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