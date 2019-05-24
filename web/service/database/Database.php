<?php 

class Database {

    // private $servername = "localhost";
    // private $database = "r53281cris_db";
    // private $username = "r53281cris_c";
    // private $password = "Amparola2806!";

    private $servername = "localhost";
    private $database = "CRISSTUDIO";
    private $username = "root";
    private $password = "";

    public $conn = null;

    public function __construct () {
        $this->conn = new PDO("mysql:host=$this->servername;dbname=$this->database", $this->username, $this->password);
        $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    public function getConnection () {
        return $this->conn;
    }

}

?>