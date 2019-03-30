<?php

include_once __DIR__ . '/service/database/Database.php';
include_once __DIR__ . '/service/role/RoleService.php';
include_once __DIR__ . '/service/address/AddressService.php';
include_once __DIR__ . '/service/user/UserService.php';

$db = new Database ();
$addressService = new AddressService ($db);
$roleService = new RoleService ($db);

// Address
// $addressService = new AddressService ($db);

// $addressToAdd = new Address();
// $addressToAdd->country = 'Romania';
// $addressToAdd->region = 'Maramures';
// $addressToAdd->city = 'Baia Mare';
// $addressToAdd->street = 'Strada 123';
// $addressToAdd = $addressService->create ($addressToAdd);

// print_r ($addressToAdd);

// $addressToAdd->street = 'Updated Street';
// $addressService->update($addressToAdd);

// print_r ($addressService->getById($addressToAdd->id));

// $addressService->delete($addressToAdd->id);

// Role

// $roleService = new RoleService ($db);
// print_r($roleService->getByName('admin'));
// print_r($roleService->getById(2));

$userService = new UserService ($db);

$testAddress = new Address ();
$testAddress->country = 'Romania';
$testAddress->region = 'Maramures';
$testAddress->city = 'Baia Mare';
$testAddress->street = 'Bilascu';

$testRole = $roleService->getByName('Admin');

$testUser = new User ();
$testUser->email = 'bogdanmaier49@gmail.com';
$testUser->password = '1234';
$testUser->first_name = 'Bogdan';
$testUser->last_name = 'Maier';
$testUser->phone = '0728005330';
$testUser->address = $testAddress;
$testUser->role = $testRole;

$userCreated = null;
try {
    $userCreated = $userService->create($testUser);
} catch (Exception $e) {
    print_r ($e->getMessage());
}

if ($userCreated != null) {
    print_r ($userCreated);

    $userService->delete($userCreated->id);
}

$userToUpdate = $userService->getById(17);
$userToUpdate->phone = '0000000000';
$userToUpdate->role = $roleService->getByName('admin');

try {
    $userService->update($userToUpdate);
} catch (Exception $e) {
    print_r ($e->getMessage());
}

?>