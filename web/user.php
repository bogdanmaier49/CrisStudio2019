<?php

include_once __DIR__ . '/headers.php';
include_once __DIR__ . '/service/WebUtils.php';
include_once __DIR__ . '/service/user/UserService.php';
include_once __DIR__ . '/service/database/Database.php';
include_once __DIR__ . '/service/role/RoleService.php';

/**
 * @Authorize - Logged in
 */
Web::HttpMethod('GET', function ($token) {
    if ($token != null) {
        $db = new Database ();
        $userService = new UserService($db);        

        if (isset($_GET['id']) && $_GET['id'] != null && is_numeric ($_GET['id']) && $_GET['id'] >= 0 ) {
            $user = $userService->getById($_GET['id']);
            if ($user == null) {
                echo Web::response(404, null, 'Userul nu exista');
                return;
            } else {
                echo Web::response(200, $user, null);
                return;
            }
        } else {
            $requestUser = Web::getUserFromToken($token);

            if ($requestUser->role->id == 2) {
                $users = $userService->getAll();
                echo Web::response(200, $users, null);
                return;
            }
        }
    }

    echo Web::response(401, null, 'Unauthorized');
});

Web::HttpMethod('POST', function ($token, $data) {

    $db = new Database ();
    $userService = new UserService($db);   
    
    if (! Web::validEmail($data->email)) {
        echo Web::response(400, null, 'Adresa de email invalida');
        return;
    }

    $data->phone = str_replace(' ','',$data->phone);
    $str = substr($data->phone, 0, 4) . ' ' . substr($data->phone, 4, 3) . ' ' . substr($data->phone, 7, strlen($data->phone));
    $data->phone = $str;

    try {
        $roleService = new RoleService($db);
        $data->role = $roleService->getById(1);

        $user = $userService->create($data);
        if ($user != null) {
            echo Web::response(201, $user, null);
            return;
        }
    } catch (Exception $e) {

        echo Web::response(500, null, 'User nu poate fii creat: ' . $e->getMessage());
        return;
        
    }

});

/**
 * @Authorize - Logged in (ADMIN only)
 */
Web::HttpMethod('PATCH', function ($token, $data) {
    if ($token != null) {

        $db = new Database ();
        $userService = new UserService($db); 

        $requestUser = Web::getUserFromToken($token);

        if ($requestUser->role->id == 2) {
                       
            $data->phone = str_replace(' ','',$data->phone);
            $str = substr($data->phone, 0, 4) . ' ' . substr($data->phone, 4, 3) . ' ' . substr($data->phone, 7, strlen($data->phone));
            $data->phone = $str;

            try {
                $updatedUser = $userService->update($data);

                if ($updatedUser != null) {
                    echo Web::response(202, $updatedUser, null);
                    return;
                } else {
                    echo Web::response(500, null, 'Userul nu poate fi modificat');
                    return;
                }
            } catch (Exception $e) {
                echo Web::response(500, null, $e->getMessage());
                return;
            }

        }
    }

    echo Web::response(401, null, 'Unauthorized');
    return;
});

Web::HttpMethod('DELETE', function ($token) {
    if ($token != null) {
        $db = new Database ();
        $userService = new UserService($db); 

        $requestUser = Web::getUserFromToken($token);

        if ($requestUser->role->id == 2) {

            if (isset($_GET['id'])) {
                try {
                    if ($userService->delete($_GET['id'])) {
                        echo Web::response(200, null, 'Utilizator sters cu success');
                        return;
                    }
                } catch (Exception $e)  {
                    echo Web::response(500, null, 'Userul nu poate fii sters ' . $e->getMessage());
                    return;
                }
            } else {
                echo Web::HttpMethod(400, null, 'Id is required');
                return;
            }

        } 
    }

    echo Web::response(401, null, 'Unauthorized');
    return;
});


?>