<?php

include_once __DIR__ . '/headers.php';
include_once __DIR__ . '/service/WebUtils.php';
include_once __DIR__ . '/service/materialCoperta/MaterialeService.php';
include_once __DIR__ . '/service/database/Database.php';

Web::HttpMethod ('GET', function ($token) {
    $db = new Database ();
    $service = new MaterialeCopertaService ($db);

    if (isset($_GET['id'])) {
        echo Web::response(200, $service->getById($_GET['id']), null);
        return;
    }

    echo Web::response(200, $service->getAll(), null);
});

//
// Authorize only for admin
//
Web::HttpMethod ('POST', function ($token, $data) {
    $db = new Database ();
    $service = new MaterialeCopertaService ($db);

    if ($token != null) {
        $requestUser = Web::getUserFromToken($token);

        if ($requestUser->role->id == 2) {
            try {
                $mat = $service->create($data);
                if ($mat != null) {
                    echo Web::response(201, $mat, null);
                    return;
                } else {
                    echo Web::response(500, null, 'Materielu nu poate fii creat');
                    return;
                }
            } catch (Exception $e) {
                echo Web::response(500, null, 'Materielu nu poate fii creat deoarece: ' . $e->getMessage());
                return;
            }
        }

    }

    echo Web::response(401, null, 'Unauthorized');
    return;

});

//
// Authorize only for admin
//
Web::HttpMethod ('PATCH', function ($token, $data) {
    $db = new Database ();
    $service = new MaterialeCopertaService ($db);

    if ($token != null) {
        $requestUser = Web::getUserFromToken($token);

        if ($requestUser->role->id == 2) {
            try {
                $mat = $service->update($data);
                if ($mat != null) {
                    echo Web::response(201, $mat, null);
                    return;
                } else {
                    echo Web::response(500, null, 'Materielu nu poate fii updatat');
                    return;
                }
            } catch (Exception $e) {
                echo Web::response(500, null, 'Materielu nu poate fii updatat deoarece: ' . $e->getMessage());
                return;
            }
        }

    }

    echo Web::response(401, null, 'Unauthorized');
    return;

});

//
// Authorize only for admin
//
Web::HttpMethod ('DELETE', function ($token) {
    $db = new Database ();
    $service = new MaterialeCopertaService ($db);

    if ($token != null) {
        $requestUser = Web::getUserFromToken($token);

        if ($requestUser->role->id == 2) {

            if (isset($_GET['id'])) {
                try {
                    $mat = $service->delete($_GET['id']);
                    if ($mat != null) {
                        echo Web::response(200, $mat, null);
                        return;
                    } else {
                        echo Web::response(500, null, 'Materielu nu poate fii sters');
                        return;
                    }
                } catch (Exception $e) {
                    echo Web::response(500, null, 'Materielu nu poate fii sters deoarece: ' . $e->getMessage());
                    return;
                }
            } else {
                echo Web::response(402, null, 'Bad request, must specify the id');
                return;
            }
        }

    }

    echo Web::response(401, null, 'Unauthorized');
    return;

});

?>