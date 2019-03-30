<?php

include_once __DIR__ . '/../address/AddressService.php';
include_once __DIR__ . '/../role/RoleService.php'; 
include_once __DIR__ . '/../ServiceUtils.php';

class User {
    public $id;
    public $first_name;
    public $last_name;
    public $email;
    public $password;
    public $phone;
    public $address;
    public $role;
    public $created_date;

    public static $tablename = 'USERS';
}

class UserMapper {

    public static function toService ($row) {
        $user = new User ();

        $user->id = $row['ID'];
        $user->first_name = $row['FIRST_NAME'];
        $user->last_name = $row['LAST_NAME'];
        $user->email = $row['EMAIL'];
        $user->password = $row['PASSWORD'];
        $user->phone = $row['PHONE'];
        $user->address = $row['FK_ADDRESS'];
        $user->role = $row['FK_ROLE'];
        $user->created_date = $row['CREATED_DATE'];

        return $user;
    }

    public static function toInsertQuery ($user, $conn) {
        $stmt = $conn->prepare ('INSERT INTO ' . User::$tablename . 
            '(FIRST_NAME, LAST_NAME, EMAIL, PASSWORD, CREATED_DATE, PHONE, FK_ADDRESS, FK_ROLE) VALUES
             (:first_name, :last_name, :email, :password, :created_date, :phone, :fk_address, :fk_role)');

        $stmt->bindParam(':first_name', $user->first_name, PDO::PARAM_STR);
        $stmt->bindParam(':last_name', $user->last_name, PDO::PARAM_STR);
        $stmt->bindParam(':email', $user->email, PDO::PARAM_STR);
        $stmt->bindParam(':password', $user->password, PDO::PARAM_STR);
        $stmt->bindParam(':created_date', $user->created_date, PDO::PARAM_STR);
        $stmt->bindValue(':phone', $user->phone, PDO::PARAM_STR);
        $stmt->bindParam(':fk_address', $user->address->id, PDO::PARAM_INT);
        $stmt->bindParam(':fk_role', $user->role->id, PDO::PARAM_INT);

        return $stmt;
    }

    public static function toUpdateQuery ($user, $conn) {
        $stmt = $conn->prepare ('UPDATE ' . User::$tablename . ' 
            SET FIRST_NAME = :first_name, LAST_NAME = :last_name, PHONE = :phone, FK_ROLE = :fk_role
            WHERE ID = :id');

        $stmt->bindParam(':first_name', $user->first_name, PDO::PARAM_STR);
        $stmt->bindParam(':last_name', $user->last_name, PDO::PARAM_STR);
        $stmt->bindParam(':phone', $user->phone, PDO::PARAM_STR);
        $stmt->bindParam(':fk_role', $user->role->id, PDO::PARAM_INT);
        $stmt->bindParam(':id', $user->id, PDO::PARAM_INT);

        return $stmt;
    }

    public static function toDeleteQuery ($id, $conn) {
        $stmt = $conn->prepare ('DELETE FROM ' . User::$tablename . ' WHERE ID = :id');
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        return $stmt;
    }

}

class UserService {

    private $conn;
    private $roleService = null;
    private $addressService = null;

    public function __construct ($db) {
        $this->conn = $db->conn;

        $this->roleService = new RoleService($db);
        $this->addressService = new AddressService($db);
    }

    public function getById ($id) {
        $stmt = $this->conn->prepare ('SELECT * FROM ' . User::$tablename . ' WHERE ID = :id');
        $stmt->bindParam (':id', $id, PDO::PARAM_INT);

        if ($stmt->execute()) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($row) {
                $user = UserMapper::toService($row);
                $user->address = $this->addressService->getById ($user->address);
                $user->role = $this->roleService->getById ($user->role);
                return $user;
            }
        }

        return null;
    }

    public function getAll () {
        $stmt = $this->conn->prepare ('SELECT * FROM ' . User::$tablename);

        if ($stmt->execute()) {
            $result = array();

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $user = UserMapper::toService($row);
                $user->address = $this->addressService->getById ($user->address);
                $user->role = $this->roleService->getById ($user->role);
                $result[] = $user;
            }

            return $result;
        }

        return null;
    }

    public function getByEmail ($email) {
        $stmt = $this->conn->prepare ('SELECT * FROM ' . User::$tablename . ' WHERE EMAIL = :email');
        $stmt->bindParam (':email', $email, PDO::PARAM_STR);

        if ($stmt->execute()) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($row) {
                $user = UserMapper::toService($row);
                $user->address = $this->addressService->getById ($user->address);
                $user->role = $this->roleService->getById ($user->role);
                return $user;
            }
        }

        return null;
    }

    public function create ($user) {  
        // Check if the email already exists 

        if ($this->getByEmail($user->email) != null) {
            throw new Exception ('emailul ' . $user->email . ' exista deja');
        }

        try {
            $props = ['email', 'password', 'first_name', 'last_name', 'phone', 'address', 'role'];
            ServiceUtils::objectHasPropertyes($user, $props);
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }

        $address = $this->addressService->create($user->address);
        $user->address = $address;

        $role = $this->roleService->getByName ($user->role->name);
        $user->role = $role;

        $user->created_date = date('Y-m-d');

        $hashedPassword = password_hash($user->password, PASSWORD_DEFAULT, ['cost' => 12]);
        $user->password = $hashedPassword;

        $stmt = UserMapper::toInsertQuery($user, $this->conn);    

        if ($stmt->execute ()) {
            $id = $this->conn->lastInsertId();
            $user = $this->getById($id);

            return $user;
        }

        return null;
    }

    public function delete ($id) {
        $user = $this->getById($id);
        if ($user == null) {
            throw new Exception ('Userul cu id ' . $id . ' nu exista');
        }

        $stmt = UserMapper::toDeleteQuery($id, $this->conn); 
        
        if ($stmt->execute()) {
            if ($this->addressService->delete($user->address->id)) {
                return true;
            }
        }

        return false;
    }

    public function update ($user) {
        if ($user->id == null) {
            throw new Exception ('user id neexistent');
        }

        $userToUpdate = $this->getById($user->id);

        if ($userToUpdate == null ) {
            throw new Exception('userul nu exista');
        }

        if ($user->first_name != null) {
            $userToUpdate->first_name = $user->first_name;
        }

        if ($user->last_name != null) {
            $userToUpdate->last_name = $user->last_name;
        }

        if ($user->phone != null) {
            $userToUpdate->phone = $user->phone;
        }

        if ($user->role != null && $user->role->id != null) {
            $userToUpdate->fk_role = $user->role->id;
        }

        $stmt = UserMapper::toUpdateQuery($user, $this->conn);
        if ($stmt->execute()) {
            return $this->getById($user->id);
        }

        return null;
    }

}

?>