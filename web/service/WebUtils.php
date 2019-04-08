<?php

include_once __DIR__ . '/user/UserService.php';
include_once __DIR__ . '/database/Database.php';
include_once __DIR__ . '/php-jwt-master/src/JWT.php';
use \Firebase\JWT\JWT;

define("JWT_KEY", "crisstudio2018_jwttokenkey");
// define("DOMAIN_LINK", "http://localhost:8080/CrisStudio");
define("DOMAIN_LINK", "http://www.crisstudio.ro/");

class ResponseEntity {
    public $code;
    public $body;
    public $message;
}

class Web {

    public static function response ($code, $body, $message) {
        $response = new ResponseEntity ();

        $response->code = $code;
        $response->body = $body;
        $response->message = $message;

        return json_encode ($response, JSON_NUMERIC_CHECK, JSON_UNESCAPED_SLASHES);
    }

    public static function getPostData () {
        $rawData = file_get_contents("php://input");
        return json_decode($rawData);
    }

    public static function getUserFromToken ($token) {
        $db = new Database ();
        $userService = new UserService ($db);

        try {
            $decoded = JWT::decode($token, JWT_KEY, array('HS256'));
            $user = $userService->getById($decoded->id);
            return $user;
        }catch (Exception $e){
            throw new Exception($e->getMessage());
        }
    }
    
    public static function getToken () {
        $headers = apache_request_headers();
        $token = null;
    
        if(isset($headers['Authorization'])){
            $token = $headers['Authorization'];
        } 
    
        return $token;
    }

    public static function HttpMethod ($method, $function) {
        $_method = $_SERVER['REQUEST_METHOD'];
        if ($method == $_method) {
            $function (Web::getToken(), Web::getPostData());
        }
    }

    public static function validEmail ($email) {
        return filter_var($email, FILTER_VALIDATE_EMAIL);
    }

}

?>