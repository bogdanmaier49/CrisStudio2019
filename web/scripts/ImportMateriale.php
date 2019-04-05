<?php

include_once __DIR__ . '/../service/materialCoperta/MaterialeService.php';
include_once __DIR__ . '/../service/database/Database.php';
include_once __DIR__ . '/../service/WebUtils.php';


function ImportMateriale () {
    $db = new Database ();
    $service = new MaterialeCopertaService ($db);

    foreach (new DirectoryIterator(__DIR__ . '/../../Images/MaterialeCoperta/Icons') as $file) {
        if ($file->isFile()) {
            $ext = pathinfo($file->getFilename(), PATHINFO_EXTENSION);
            if ($ext == 'jpg') {
                $material = new MaterialCoperta();
                $material->nume = preg_replace('/\\.[^.\\s]{3,4}$/', '', $file->getFilename());
                $material->imagine = $file->getFilename();

                echo '<br />';
                try {
                    $service->create($material);
                    echo (' SUCCESS => nume: ' . $material->nume . ' | imagine: ' . $material->imagine);
                } catch (Exception $e) {
                    echo (' ! ERROARE LA ADAUGAREA MATERIALULUI => nume: ' . $material->nume . ' | imagine: ' . $material->imagine);
                }
                echo '<br />';
            }
        }
    }
}

?>