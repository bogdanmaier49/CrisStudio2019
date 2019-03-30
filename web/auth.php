<?php

include_once __DIR__ . '/headers.php';
include_once __DIR__ . '/service/WebUtils.php';
include_once __DIR__ . '/service/database/Database.php';
include_once __DIR__ . '/service/user/UserService.php';
include_once __DIR__ . '/service/php-jwt-master/src/JWT.php';
use \Firebase\JWT\JWT;

Web::HttpMethod('POST', function ($token, $data){

    if (! property_exists($data, 'email')) {
        echo Web::response(400, null, 'Emailul este obligatoriu');
        return;
    }

    if (! Web::validEmail($data->email)) {
        echo Web::response(400, null, 'Adresa de email invalida');
        return;
    }

    if (! property_exists($data, 'password')) {
        echo Web::response(400, null, 'Parola este obligatorie');
        return;
    }

    $db = new Database();
    $userService = new UserService ($db);

    $user = $userService->getByEmail($data->email);

    if ($user != null) {
        if (password_verify($data->password, $user->password)) {
            $token = array(
                "iss" => "localhost",
                "aud" => "localhost",
                "id" => $user->id,
            );
            
            $jwt = JWT::encode($token, JWT_KEY);

            echo Web::response(200, $jwt, null);
            return;
        }
    }

    echo Web::response(401, null, 'Email sau parola gresite');
});

Web::HttpMethod ('GET', function ($token) {
    if ($token != null) {
        $db = new Database ();
        $userService = new UserService($db); 

        $requestUser = Web::getUserFromToken($token, $userService);
        if ($requestUser != null) {
            echo Web::response(200, $requestUser, null);
            return;
        } else {
            echo Web::response(500, null, 'Failed to fetch user from token');
            return;
        }
    }

    echo Web::response(401, null, 'Unauthorized');
    return;
});

?>