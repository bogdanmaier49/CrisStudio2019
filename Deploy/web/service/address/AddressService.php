<?php

class Address {

    public $id;
    public $country;
    public $region;
    public $city;
    public $street;

    public static $tablename = 'ADDRESSES';
}

class AddressMapper {

    public static function toService ($row) {
        $address = new Address();
        $address->id = $row['ID'];
        $address->country = $row['COUNTRY'];
        $address->region = $row['REGION'];
        $address->city = $row['CITY'];
        $address->street = $row['STREET'];
        return $address;
    }

    public static function toInsertQuery ($address, $conn) {
        $stmt = $conn->prepare('INSERT INTO ' . Address::$tablename . ' (COUNTRY, REGION, CITY, STREET)
            VALUES (:country, :region, :city, :street)');

        $stmt->bindParam(':country',    $address->country,  PDO::PARAM_STR);
        $stmt->bindParam(':region',     $address->region,   PDO::PARAM_STR);
        $stmt->bindParam(':city',       $address->city,     PDO::PARAM_STR);
        $stmt->bindParam(':street',     $address->street,   PDO::PARAM_STR);

        return $stmt;
    }

    public static function toUpdateQuery ($address, $conn) {
        $stmt = $conn->prepare('UPDATE ' . Address::$tablename . ' SET
            COUNTRY = :country, REGION = :region, CITY = :city, STREET = :street
            WHERE ID = :id');
            
        $stmt->bindParam(':id',         $address->id,       PDO::PARAM_INT);
        $stmt->bindParam(':country',    $address->country,  PDO::PARAM_STR);
        $stmt->bindParam(':region',     $address->region,   PDO::PARAM_STR);
        $stmt->bindParam(':city',       $address->city,     PDO::PARAM_STR);
        $stmt->bindParam(':street',     $address->street,   PDO::PARAM_STR);

        return $stmt;
    }

    public static function toDeleteQuery ($id, $conn) {
        $stmt = $conn->prepare('DELETE FROM ' . Address::$tablename . ' WHERE ID = :id');
        $stmt->bindParam(':id',         $id,       PDO::PARAM_INT);
        return $stmt;
    }

}

class AddressService {

    private $conn;

    public function __construct ($db) {
        $this->conn = $db->conn;
    }

    public function getById ($id) {
        $stmt = $this->conn->prepare('SELECT * FROM ' . Address::$tablename . ' WHERE ID = ?'); 
        $stmt->execute([$id]);

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($row) {
            return AddressMapper::toService($row);
        }

        return null;
    }

    public function create ($address) {
        if (! $this->isValid($address)) {
            throw new Exception ('Adresa invalida');
        }

        $stmt = AddressMapper::toInsertQuery($address, $this->conn);
        if ($stmt->execute()) {
            $id = $this->conn->lastInsertId();
            return $this->getById($id);
        }
    }

    public function delete ($id) {

        if ($this->getById($id) == null) {
            throw new Exception ('Adresa nu exista');
        }

        $stmt = AddressMapper::toDeleteQuery($id, $this->conn);
        return $stmt->execute();
    }

    public function update ($address) {

        if ($this->getById($address->id) == null) {
            throw new Exception ('Adresa nu exista');
        }

        if (! $this->isValid($address)) {
            throw new Exception ('Adresa invalida');
        }

        $stmt = AddressMapper::toUpdateQuery($address, $this->conn);
        return $stmt->execute();
    }

    public function isValid ($address) {
        return strlen($address->country) != 0 && 
            strlen($address->region) != 0 && 
            strlen($address->city) != 0 &&
            strlen($address->street) != 0;
    }

}

?>