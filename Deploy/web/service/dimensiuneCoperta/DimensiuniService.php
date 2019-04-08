<?php

class DimensiuneCoperta {
    public $id = null;
    public $dimensiuni = null;

    public static $tablename = 'DIMENSIUNI_COPERTA';
}

class DimensiuneCopertaMapper {

    public static function toService ($row) {
        $dim = new DimensiuneCoperta ();
        $dim->id = $row['ID'];
        $dim->dimensiuni = $row['DIMENSIUNI'];
        return $dim;
    }

}

class DimensiuneCopertaService {

    private $conn;

    public function __construct ($db) {
        $this->conn = $db->conn;
    }

    public function getById ($id) {
        $stmt = $this->conn->prepare('SELECT * FROM ' . DimensiuneCoperta::$tablename . ' WHERE ID = :id');
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);

        if ($stmt->execute()) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($row != null) {
                return DimensiuneCopertaMapper::toService($row);
            }
        }

        return null;
    }

    public function getAll () {
        $stmt = $this->conn->prepare ('SELECT * FROM ' . DimensiuneCoperta::$tablename);

        if ($stmt->execute()) {
            $result = array();

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $tip = DimensiuneCopertaMapper::toService($row);
                $result[] = $tip;
            }

            return $result;
        }

        return null;
    }

    public function create ($album) {

    }

    public function update ($dim) {

    }

    public function delete ($id) {

    }

}

?>