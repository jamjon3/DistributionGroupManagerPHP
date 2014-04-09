<?php
    require_once "UsfAcDistributionManagerServices.php";
    require_once "/usr/local/etc/USF_connections.php";
    $params = json_decode(file_get_contents('php://input'), true);
    if (isset($params['service'])?($params['service'] == "casLoginUrl"):false) {
        global $CAS_SERVER,$CAS_PORT;
        header('Content-type: application/json');
        echo json_encode((object) array('login' => "https://".$CAS_SERVER.":".$CAS_PORT."/login"));
        exit();
    } else {
        $distributionManagerServices = new DistributionManagerServices("AD Group Manager", "CAS","itActivedirGroupmanager",TRUE);
        // Invoke the services module in case there's a service request
        error_log(file_get_contents('php://input'));
        //CHeck Authorization
        if(! $distributionManagerServices->isAuthorized()) {
                echo 'Unauthorized Access!';
                exit;
        }
        $distributionManagerServices->invokeService($params);    
    }
?>
