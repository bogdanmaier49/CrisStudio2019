<?php

class ServiceUtils {

    public static function objectHasPropertyes ($object, $props) {
        foreach ($props as $prop) {
            if (! property_exists($object, $prop)) {
                throw new Exception ($prop . ' nu este setat');
            }
        }
    }

}

?>