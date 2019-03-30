<?php

include_once __DIR__ . '/headers.php';
include_once __DIR__ . '/service/WebUtils.php';
include_once __DIR__ . '/service/user/UserService.php';
include_once __DIR__ . '/service/database/Database.php';


Web::HttpMethod('GET', function ($token) {
    echo "GET METHOD: " . $token;
});

Web::HttpMethod('POST', function ($token, $data) {
    print_r ($data);
});


?>