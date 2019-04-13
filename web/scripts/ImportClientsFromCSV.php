<?php 

include_once __DIR__ . '/../service/user/UserService.php';
include_once __DIR__ . '/../service/database/Database.php';
include_once __DIR__ . '/../service/role/RoleService.php';
include_once __DIR__ . '/../service/address/AddressService.php';

function ImportClientsFromCSV ($filePath) {
    $csv = array_map('str_getcsv', file($filePath));
    $db = new Database();
    $service = new UserService($db);
    $result = array ();
    foreach ($csv as $userAsArray) {
        $user = new User ();
        $user->last_name = $userAsArray[1];
        $user->first_name = $userAsArray[2];
        $user->email = $userAsArray[3];
        $user->password = $userAsArray[4];
        $user->phone = $userAsArray[5];

        $status = $userAsArray[6];
        $role = new Role ();
        if ($status == '1') {
            $role->name = 'fotograf';
        } else {
            $role->name = 'user';
        }
        $user->role = $role;

        $address = new Address ();
        $address->country = 'Romania';
        if (isset($userAsArray[7]) && strlen($userAsArray[7]) > 0)
            $address->region = $userAsArray[7];
        else
            $address->region = 'Nedefinit';
        
        if (isset($userAsArray[8]) && strlen($userAsArray[8]) > 0)
            $address->city = $userAsArray[8];
        else
            $address->city = 'Nedefinit';

        if (isset($userAsArray[9]) && strlen($userAsArray[9]) > 0)
            $address->street = $userAsArray[9];
        else
            $address->street = 'Nedefinit';

        $user->address = $address;

        // echo '<br />';
        // print_r($user);
        // echo '<br />';

        $service->create($user);
    }
}

?>