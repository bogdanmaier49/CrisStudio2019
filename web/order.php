<?php

include_once __DIR__ . '/headers.php';
include_once __DIR__ . '/service/WebUtils.php';
include_once __DIR__ . '/service/order/OrderService.php';
include_once __DIR__ . '/service/database/Database.php';



Web::HttpMethod ('POST', function ($token, $data) {
    if ($token != null) {

        $db = new Database ();
        $service = new OrderService($db);
        $requestUser = Web::getUserFromToken($token);

        if ($requestUser->role->id > 1) {
            try {
                $service->createOrder($data);
                echo Web::response(201, null, 'Created');
                return;
            } catch (Exception $e) {
                echo Web::response(500, null, $e->getMessage());
                return;
            }
        }

    }

    echo Web::response(402, null, 'Unauthorized');
    return;
});

Web::HttpMethod ('GET', function ($token, $data) {
    if ($token != null) {
        $db = new Database ();
        $service = new OrderService($db);

        $requestUser = Web::getUserFromToken($token);

        if ($requestUser->role->id == 2) {
            try {

                if (isset($_GET['id'])) {
                    $data = $service->getOrderById($_GET['id']);
                    echo Web::response(200, $data, null);
                    return;
                } else {
                    $data = $service->getAllOrders();
                    echo Web::response(200, $data, null);
                    return;
                }
            } catch (Exception $e) {
                echo Web::response(500, null, $e->getMessage());
                return;
            }
        }
    }
    echo Web::response(402, null, 'Unauthorized');
    return;
});

Web::HttpMethod('PATCH', function ($token, $data) {

    $db = new Database ();
    $service = new OrderService($db);

    try {
        if (isset($_GET['id'])) {
            $service->updateOrder($_GET['id']);
            echo Web::response(202, null, "Success");
            return;
        } else {
            echo Web::response(500,null, 'Id null');
            return;
        }
    } catch (Exception $e) {
        echo Web::response(500, null, $e->getMessage());
        return;
    }
        

    echo Web::response(402, null, 'Unauthorized');
    return;
});

Web::HttpMethod ('DELETE', function ($token, $data) {
    if ($token != null) {

        $requestUser = Web::getUserFromToken($token);

        if ($requestUser->role->id == 2) {
            $db = new Database ();
            $service = new OrderService($db);

            try {
                if (isset($_GET['id'])) {
                    $order = $service->deleteOrder($_GET['id']);
                    echo Web::response(200, $order, null);
                    return;
                }
            } catch (Exception $e) {
                echo Web::response(500, null, $e->getMessage());
                return;
            }
        }
    }

    echo Web::response(402, null, 'Unauthorized');
    return;
});

?>