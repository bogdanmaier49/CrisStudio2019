<?php 

include_once __DIR__ . '/headers.php';
include_once __DIR__ . '/service/WebUtils.php';

Web::HttpMethod('GET', function () {

    if (isset($_GET['folder'])) {
        $images = array();

        foreach ( new DirectoryIterator(__DIR__ . '/../Images/' . $_GET['folder'] . '/Icons' ) as $file) {
            if ($file->isFile()) {
                $ext = pathinfo($file->getFilename(), PATHINFO_EXTENSION);
                if ($ext == 'jpg') {
                    $images[] = $file->getFilename();
                }
            }
        }

        echo Web::response(200, $images, null);
        return;
    }

    echo Web::response(404, null, 'Folder nespecificat');
    return;

});

?>