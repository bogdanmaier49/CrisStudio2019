<?php

include_once __DIR__ . '/headers.php';
include_once __DIR__ . '/service/WebUtils.php';
include_once __DIR__ . '/service/dimensiuneCoperta/DimensiuniService.php';
include_once __DIR__ . '/service/database/Database.php';

Web::HttpMethod ('GET', function ($token) {
    $db = new Database ();
    $service = new DimensiuneCopertaService($db);

    if (isset($_GET['id'])) {
        echo Web::response(200, $service->getById($_GET['id']), null);
        return;
    }

    echo Web::response(200, $service->getAll(), null);
});


?>