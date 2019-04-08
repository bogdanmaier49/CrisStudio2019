<?php

class Role {

    public $id;
    public $name;

    public static $tablename = 'ROLES';
}

class RoleMapper {

    public function toService ($row) {
        $role = new Role ();

        $role->id = $row['ID'];
        $role->name = $row['NAME'];

        return $role;
    }

}

class RoleService {

    private $conn;

    public function __construct ($db) {
        $this->conn = $db->conn;
    }

    public function getById ($id) {
        $stmt = $this->conn->prepare('SELECT * FROM ' . Role::$tablename . ' WHERE ID = ?'); 
        $stmt->execute([$id]);

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($row) {
            return RoleMapper::toService($row);
        }

        return null;
    }

    public function getByName ($name) {
        $stmt = $this->conn->prepare('SELECT * FROM ROLES WHERE NAME = :name'); 
        $stmt->bindParam(':name', $name, PDO::PARAM_STR);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($row) {
            return RoleMapper::toService($row);
        }

        return null;
    }


}

?>