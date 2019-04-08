<?php

include_once __DIR__ . '/headers.php';
include_once __DIR__ . '/service/WebUtils.php';
include_once __DIR__ . '/scripts/ImportMateriale.php';
include_once __DIR__ . '/scripts/ImportTipuri.php';

Web::HttpMethod ('GET', function ($token) {
    if ($token != null) {

        $db = new Database ();
        $service = new MaterialeCopertaService ($db);

        $requestUser = Web::getUserFromToken($token);

        if ($requestUser->role->id == 2) {
            if (isset($_GET['import'])) {
                if ($_GET['import'] == 'mat') {
                    $mats = ImportMateriale();
                    echo Web::response(202, $mats, null);
                    return;
                } else if ($_GET['import'] == 'tip') {
                    $tips = ImportTipuri();
                    echo Web::response(202, $tips, null);
                    return;
                }
            }

            echo Web::response(502, null, 'import neprecizat');
            return;
        }

    }

    echo Web::response(402, null, 'Unauthorized');
    return;
});

?>