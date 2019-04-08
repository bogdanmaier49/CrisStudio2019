<?php




class MaterialCoperta {
    public $id = null;
    public $nume = null;
    public $imagine = null;  
    public $descriere = null;

    public static $tablename = 'MATERIALE_COPERTA';
}

class MaterialeCopertaMapper {
    public static function toService ($row) {
        $mat = new MaterialCoperta();
        $mat->id = $row['ID'];
        $mat->nume = $row['NUME'];
        $mat->imagine = $row['IMAGINE'];
        $mat->descriere = $row['DESCRIERE'];
        return $mat;
    }

    public static function toInsertQuery ($mat, $conn) {
        $stmt = $conn->prepare ('INSERT INTO ' . MaterialCoperta::$tablename . 
            '(NUME, DESCRIERE, IMAGINE) VALUES
             (:name, :description, :image)');
        
        $stmt->bindParam(':name',  $mat->nume, PDO::PARAM_STR);
        $stmt->bindParam(':image', $mat->imagine, PDO::PARAM_STR);
        $stmt->bindParam(':description', $mat->descriere, PDO::PARAM_STR);

        return $stmt;
    }

    public static function toUpdateQuery ($mat, $conn) {
        $stmt = $conn->prepare ('UPDATE ' . MaterialCoperta::$tablename . ' 
        SET NUME = :name, IMAGINE = :image, DESCRIERE = :description
        WHERE ID = :id');

        $stmt->bindParam(':name', $mat->nume, PDO::PARAM_STR);
        $stmt->bindParam(':image', $mat->imagine, PDO::PARAM_STR);
        $stmt->bindParam(':description', $mat->descriere, PDO::PARAM_STR);
        $stmt->bindParam(':id', $mat->id, PDO::PARAM_INT);

        return $stmt;
    }

    public static function toDeleteQuery ($id, $conn) {
        $stmt = $conn->prepare ('DELETE FROM ' . MaterialCoperta::$tablename . ' WHERE ID = :id');
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);

        return $stmt;
    }
}

class MaterialeCopertaService {

    private $conn;

    public function __construct ($db) {
        $this->conn = $db->conn;
    }

    public function getAll () {
        $stmt = $this->conn->prepare ('SELECT * FROM ' . MaterialCoperta::$tablename);

        if ($stmt->execute()) {
            $result = array();

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $mat = MaterialeCopertaMapper::toService($row);
                $result[] = $mat;
            }

            return $result;
        }

        return null;
    }

    public function getById ($id) {
        $stmt = $this->conn->prepare ('SELECT * FROM ' . MaterialCoperta::$tablename . ' WHERE ID = :id');
        $stmt->bindParam (':id', $id, PDO::PARAM_INT);

        if ($stmt->execute()) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($row != null) {
                return MaterialeCopertaMapper::toService($row);
            }
        }

        return null;
    }

    public function getByName ($name) {
        $stmt = $this->conn->prepare ('SELECT * FROM ' . MaterialCoperta::$tablename . ' WHERE NUME = :name');
        $stmt->bindParam (':name', $name, PDO::PARAM_STR);

        if ($stmt->execute()) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($row != null) {
                return MaterialeCopertaMapper::toService($row);
            }
        }

        return null;
    }

    public function create ($mat) {

        if (! property_exists($mat, 'nume')) {
            throw new Exception ('nume inexistent');
        }

        if ($this->getByName($mat->nume) != null) {
            throw new Exception ('numele exista deja');
        }

        if (! property_exists($mat, 'imagine')) {
            throw new Exception ('imagine inexistenta');
        }

        $stmt = MaterialeCopertaMapper::toInsertQuery($mat, $this->conn);

        if ($stmt->execute ()) {
            $id = $this->conn->lastInsertId();
            $matCreated = $this->getById($id);
            return $matCreated;
        }

        return null;
    }

    public function update ($mat) {

        if (! property_exists($mat, 'id')) {
            throw new Exception ('id inexistent');
        }

        if (! property_exists($mat, 'nume')) {
            throw new Exception ('nume inexistent');
        }

        if (! property_exists($mat, 'imagine')) {
            throw new Exception ('imagine inexistenta');
        }

        // Verifica daca exista un al material cu acelasi nume.
        $materials = $this->getAll();
        foreach ($materials as $material) {
            if ($material->id != $mat->id && $material->nume == $mat->nume) {
                throw new Exception ('exista deja un material cu numele ' . $mat->nume);
            }
        }

        $stmt = MaterialeCopertaMapper::toUpdateQuery($mat, $this->conn);
        
        if ($stmt->execute()) {
            return $this->getById($mat->id);
        }

        return null;
    }

    public function delete ($id) {

        $mat = $this->getById($id);
        if ($mat == null) {
            throw new Exception ('materialul cu id ' . $id . ' nu exista');
        }

        $stmt = $this->conn->prepare ('DELETE FROM ' . MaterialCoperta::$tablename . ' WHERE ID = :id');
        $stmt->bindParam (':id', $id, PDO::PARAM_INT);

        if ($stmt->execute()) {
            return $mat;
        }

        return null;

    }

}

?>