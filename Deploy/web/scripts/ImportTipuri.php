<?php

include_once __DIR__ . '/../service/tipCoperta/TipCopertaService.php';
include_once __DIR__ . '/../service/database/Database.php';
include_once __DIR__ . '/../service/WebUtils.php';


function ImportTipuri () {
    $db = new Database ();
    $service = new TipCopertaService ($db);
    $result = array();

    foreach (new DirectoryIterator(__DIR__ . '/../../Images/TipuriCoperta/Icons') as $file) {
        if ($file->isFile()) {
            $ext = pathinfo($file->getFilename(), PATHINFO_EXTENSION);
            if ($ext == 'jpg') {
                $tip = new TipCoperta();
                $tip->nume = preg_replace('/\\.[^.\\s]{3,4}$/', '', $file->getFilename());
                $tip->imagine = $file->getFilename();
                $result[] = $service->create($tip);
            }
        }
    }

    return $result;
}

?>