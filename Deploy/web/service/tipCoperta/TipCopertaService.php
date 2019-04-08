<?php

class TipCoperta {
    public $id = null;
    public $nume = null;
    public $imagine = null;  
    public $descriere = null;

    public static $tablename = 'TIP_COPERTA';
}

class TipCopertaMapper {
    public static function toService ($row) {
        $tip = new TipCoperta();
        $tip->id = $row['ID'];
        $tip->nume = $row['NUME'];
        $tip->imagine = $row['IMAGINE'];
        $tip->descriere = $row['DESCRIERE'];
        return $tip;
    }

    public static function toInsertQuery ($tip, $conn) {
        $stmt = $conn->prepare ('INSERT INTO ' . TipCoperta::$tablename . 
            '(NUME, DESCRIERE, IMAGINE) VALUES
             (:name, :description, :image)');
        
        $stmt->bindParam(':name',  $tip->nume, PDO::PARAM_STR);
        $stmt->bindParam(':image', $tip->imagine, PDO::PARAM_STR);
        $stmt->bindParam(':description', $tip->descriere, PDO::PARAM_STR);

        return $stmt;
    }

    public static function toUpdateQuery ($tip, $conn) {
        $stmt = $conn->prepare ('UPDATE ' . TipCoperta::$tablename . ' 
        SET NUME = :name, IMAGINE = :image, DESCRIERE = :description
        WHERE ID = :id');

        $stmt->bindParam(':name', $tip->nume, PDO::PARAM_STR);
        $stmt->bindParam(':image', $tip->imagine, PDO::PARAM_STR);
        $stmt->bindParam(':description', $tip->descriere, PDO::PARAM_STR);
        $stmt->bindParam(':id', $tip->id, PDO::PARAM_INT);

        return $stmt;
    }

    public static function toDeleteQuery ($id, $conn) {
        $stmt = $conn->prepare ('DELETE FROM ' . TipCoperta::$tablename . ' WHERE ID = :id');
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);

        return $stmt;
    }
}

class TipCopertaService {

    private $conn;

    public function __construct ($db) {
        $this->conn = $db->conn;
    }

    public function getAll () {
        $stmt = $this->conn->prepare ('SELECT * FROM ' . TipCoperta::$tablename);

        if ($stmt->execute()) {
            $result = array();

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $tip = TipCopertaMapper::toService($row);
                $result[] = $tip;
            }

            return $result;
        }

        return null;
    }

    public function getById ($id) {
        $stmt = $this->conn->prepare ('SELECT * FROM ' . TipCoperta::$tablename . ' WHERE ID = :id');
        $stmt->bindParam (':id', $id, PDO::PARAM_INT);

        if ($stmt->execute()) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($row != null) {
                return TipCopertaMapper::toService($row);
            }
        }

        return null;
    }

    public function getByName ($name) {
        $stmt = $this->conn->prepare ('SELECT * FROM ' . TipCoperta::$tablename . ' WHERE NUME = :name');
        $stmt->bindParam (':name', $name, PDO::PARAM_STR);

        if ($stmt->execute()) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($row != null) {
                return TipCopertaMapper::toService($row);
            }
        }

        return null;
    }

    public function create ($tip) {

        if (! property_exists($tip, 'nume')) {
            throw new Exception ('nume inexistent');
        }

        if ($this->getByName($tip->nume) != null) {
            throw new Exception ('numele exista deja');
        }

        if (! property_exists($tip, 'imagine')) {
            throw new Exception ('imagine inexistenta');
        }

        $stmt = TipCopertaMapper::toInsertQuery($tip, $this->conn);

        if ($stmt->execute ()) {
            $id = $this->conn->lastInsertId();
            $tipCreated = $this->getById($id);
            return $tipCreated;
        }

        return null;
    }

    public function update ($tip) {

        if (! property_exists($tip, 'id')) {
            throw new Exception ('id inexistent');
        }

        if (! property_exists($tip, 'nume')) {
            throw new Exception ('nume inexistent');
        }

        if (! property_exists($tip, 'imagine')) {
            throw new Exception ('imagine inexistenta');
        }

        // Verifica daca exista un alt tip decoperta cu acelasi nume.
        $tipuri = $this->getAll();
        foreach ($tipuri as $_tip) {
            if ($_tip->id != $tip->id && $_tip->nume == $tip->nume) {
                throw new Exception ('exista deja un tip de coperta cu numele ' . $tip->nume);
            }
        }

        $stmt = TipCopertaMapper::toUpdateQuery($tip, $this->conn);
        
        if ($stmt->execute()) {
            return $this->getById($tip->id);
        }

        return null;
    }

    public function delete ($id) {

        $tip = $this->getById($id);
        if ($tip == null) {
            throw new Exception ('tipul de coperta cu id ' . $id . ' nu exista');
        }

        $stmt = $this->conn->prepare ('DELETE FROM ' . TipCoperta::$tablename . ' WHERE ID = :id');
        $stmt->bindParam (':id', $id, PDO::PARAM_INT);

        if ($stmt->execute()) {
            return $tip;
        }

        return null;

    }

}

?>