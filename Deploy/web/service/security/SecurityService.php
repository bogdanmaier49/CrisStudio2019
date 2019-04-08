<?php

class SecurityService  {

    public static function isAuthorized ($user, $roleId) {
        if ($user->role->id == $roleId) {
            return true;
        }
        return false;
    }

}

?>