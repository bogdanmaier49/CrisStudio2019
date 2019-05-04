<?php

include_once __DIR__ . '/../user/UserService.php';

include_once __DIR__ . '/../dimensiuneCoperta/DimensiuniService.php'; 
include_once __DIR__ . '/../materialCoperta/MaterialeService.php'; 
include_once __DIR__ . '/../tipCoperta/TipCopertaService.php'; 
include_once __DIR__ . '/../user/UserService.php'; 

include_once __DIR__ . '/../ServiceUtils.php';

class OrderMapper {

    public static function orderToService ($row, $album, $user) {
        $obj = array();

        $obj['id'] = $row['ID'];
        $obj['dataPlasare'] = $row['DATA_PLASARE'];
        $obj['dataTerminare'] = $row['DATA_TERMINARE'];
        $obj['album'] = $album;
        $obj['user'] = $user;
        $obj['numarBucati'] = $row['NUMAR_BUCATI'];
        $obj['cutieAlbum'] = $row['CUTIE_ALBUM'];
        $obj['faceOff'] = $row['FACE_OFF'];
        $obj['paspartou'] = $row['PASPARTOU'];
        $obj['machetare'] = $row['MACHETARE'];
        $obj['materialTablou'] = $row['MATERIAL_TABLOU'];
        $obj['dimensiuneTablou'] = $row['DIMENSIUNI_TABLOU'];
        $obj['numarTablouri'] = $row['NUMAR_TABLOURI'];
        $obj['cutieStick'] = $row['CUTIE_STICK'];
        $obj['mapaStick'] = $row['MAPA_STICK'];
        $obj['copertaBuretata'] = $row['COPERTA_BURETATA'];
        $obj['mentiuni'] = $row['MENTIUNI'];

        return $obj;
    }

    public static function albumToService ($row, $tipCoperta, $materialCoperta, $dimensiuni) {
        $obj = array();

        $obj['id'] = $row['ID'];

        $obj['tipCoperta'] = $tipCoperta;
        $obj['materialCoperta'] = $materialCoperta;
        $obj['dimensiuniCoperta'] = $dimensiuni;

        $obj['linkPoze'] = $row['LINK_POZE'];
        $obj['numarPagini'] = $row['NUMAR_PAGINI'];
        $obj['textCoperta'] = $row['TEXT_COPERTA'];
        $obj['coltareMetal'] = $row['COLTARE_METAL'];

        return $obj;
    }

    public static function orderToHTML ($obj) {
        $dataplasare = isset($obj->dataPlasare) ? $obj->dataPlasare : 'nedefinit';
        $template = '<ul>';
        $template .= '<li> Data Plasare: '.$dataplasare.' </li>'; 
        $template .= '<li> Configuratie Album: '.OrderMapper::albumToHTML($obj->album).' </li>';
        $template .= '<li> Client: '. UserMapper::toHTML($obj->user) .' </li>';
        $template .= '<li> Mai multe detalii despre comanda: <a href="http://www.crisstudio.ro/admin"> http://www.crisstudio.ro/admin </a> </li>';
        $template .= '</ul>';

        return $template;
    }

    public static function albumToHTML ($obj) {

        $linkPoze = isset($obj->linkPoze) ? $obj->linkPoze : 'nedefinit';

        $template = '<ul>';
        $template .= '<li> Tip Coperta: '.$obj->tipCoperta->nume.' </li>';
        $template .= '<li> Material Coperta: '.$obj->materialCoperta->nume.' </li>';
        $template .= '<li> Dimensiuni Coperta: '.$obj->dimensiuniCoperta->dimensiuni.' </li>';
        $template .= '<li> Link Poze: '.$linkPoze.' </li>';
        $template .= '<li> Text Coperta: '.$obj->textCoperta.' </li>';
        $template .= '<li> Coltare Metal: '.$obj->coltareMetal.' </li>';
        $template .= '</ul>';

        return $template;
    }

}

class OrderService {

    private $conn;

    private $dimensiuniService = null;
    private $materialeService = null;
    private $tipCopertaService = null;
    private $userService = null;

    public function __construct ($db) {
        $this->conn = $db->conn;

        $this->dimensiuniService = new DimensiuneCopertaService($db);
        $this->materialeService = new MaterialeCopertaService($db);
        $this->tipCopertaService = new TipCopertaService($db);
        $this->userService = new UserService($db);
    }

    public function createAlbum ($dimensiuneId, $materialId, $tipCopertaId, $linkPoze, $numarPagini, $textCoperta, $coltare) {

        // Verifica daca materialul, dimsniunile si tipul de coperta exista
        // Continua doar daca toate 3 exista altfel arunca exceptie.

        $dim = $this->dimensiuniService->getById($dimensiuneId);
        $mat = $this->materialeService->getById($materialId);
        $tip = $this->tipCopertaService->getById($tipCopertaId);

        if ($mat == null)
            throw new Exception ('materialul cu id ' . $materialId . ' nu exista');

        if ($dim == null)
            throw new Exception ('dimensiunile cu id ' . $dimensiuneId . ' nu exista');

        if ($tip == null)
            throw new Exception ('tipul de coperta cu id ' . $tipCopertaId . ' nu exista');

        if (! filter_var($numarPagini, FILTER_VALIDATE_INT) || $numarPagini < 0) {
            throw new Exception('numar de pagini invalid (' . $numarPagini . ')');
        }

        if (!isset($linkPoze) || ! filter_var($linkPoze, FILTER_VALIDATE_URL)) {
            throw new Exception('link poze invalid');
        }

        if (!isset($textCoperta) || strlen($textCoperta) == 0) {
            throw new Exception('link poze invalid');
        }

        if (!isset($coltare)) {
            throw new Exception('coltare metal nespecificata');
        }

        // Pregateste query-ul pentru insert in baza de date 
        $stmt = $this->conn->prepare ('INSERT INTO ALBUME 
            (FK_DIMENSIUNI_COPERTA, FK_MATERIAL_COPERTA, FK_TIP_COPERTA, LINK_POZE, NUMAR_PAGINI, TEXT_COPERTA, COLTARE_METAL) VALUES 
            (:fk_dimensiuni, :fk_material, :fk_tip, :link_poze, :numar_pagini, :text_coperta, :coltare_metal)');

        $stmt->bindParam('fk_dimensiuni', $dimensiuneId);
        $stmt->bindParam('fk_material', $materialId);
        $stmt->bindParam('fk_tip', $tipCopertaId);
        $stmt->bindParam('link_poze', $linkPoze);
        $stmt->bindParam('numar_pagini', $numarPagini);
        $stmt->bindParam('text_coperta', $textCoperta);
        $stmt->bindParam('coltare_metal', $coltare);

        if ($stmt->execute()) {
            $id = $this->conn->lastInsertId();
            return $id;
        }

        return -1;
    }

    // Returns Database ROW !!!
    public function getAlbumById ($id) {
        $stmt = $this->conn->prepare ('SELECT * FROM ALBUME WHERE ID = :id');
        $stmt->bindParam (':id', $id, PDO::PARAM_INT);

        if ($stmt->execute()) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($row != null) {
                return $row;
            }
        }

        return null;
    }

    public function deleteAlbum ($id) {

        if ($this->getAlbumById($id) != null) {
            $stmt = $this->conn->prepare ('DELETE FROM ALBUME WHERE ID = :id');
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);

            $stmt->execute();
        }

    }

    public function createOrder ($order) {
        if (! property_exists($order, 'album')) {
            throw new Exception ('informatii album neprecizate');
        }

        if (! property_exists($order, 'user')) {
            throw new Exception ('user neprecizat');
        }

        if ($this->userService->getById($order->user->id) == null) {
            throw new Exception('user inexistent');
        }

        try {
            $album = $order->album;

            $albumId = $this->createAlbum(
                $album->dimensiuniCoperta->id, 
                $album->materialCoperta->id, 
                $album->tipCoperta->id, 
                $album->linkPoze, 
                $album->numarPagini, 
                $album->textCoperta, 
                $album->coltareMetal
            );

            $currentDate = date("Y-m-d h:i:sa");

            $stmt = $this->conn->prepare ('INSERT INTO ORDER_ALBUM 
                (DATA_PLASARE, FK_ALBUM, FK_USER, NUMAR_BUCATI, CUTIE_ALBUM, FACE_OFF, COPERTA_BURETATA, PASPARTOU, MACHETARE, MATERIAL_TABLOU, DIMENSIUNI_TABLOU, NUMAR_TABLOURI, CUTIE_STICK, MAPA_STICK, MENTIUNI) VALUES 
                (:DATA_PLASARE, :FK_ALBUM, :FK_USER, :NUMAR_BUCATI, :CUTIE_ALBUM, :FACE_OFF, :COPERTA_BURETATA, :PASPARTOU, :MACHETARE, :MATERIAL_TABLOU, :DIMENSIUNI_TABLOU, :NUMAR_TABLOURI, :CUTIE_STICK, :MAPA_STICK, :MENTIUNI)'); 

            $stmt->bindParam (':DATA_PLASARE', $currentDate, PDO::PARAM_STR);
            $stmt->bindParam (':FK_ALBUM', $albumId, PDO::PARAM_INT);
            $stmt->bindParam (':FK_USER', $order->user->id, PDO::PARAM_INT);
            $stmt->bindParam (':NUMAR_BUCATI', $order->numarBucati, PDO::PARAM_INT);
            $stmt->bindParam (':CUTIE_ALBUM', $order->cutieAlbum, PDO::PARAM_STR);
            $stmt->bindParam (':FACE_OFF', $order->faceOff, PDO::PARAM_STR);
            $stmt->bindParam (':COPERTA_BURETATA', $order->copertaBuretata, PDO::PARAM_STR);
            $stmt->bindParam (':PASPARTOU', $order->paspartou, PDO::PARAM_STR);
            $stmt->bindParam (':MACHETARE', $order->machetare, PDO::PARAM_STR);
            $stmt->bindParam (':MATERIAL_TABLOU', $order->materialTablou, PDO::PARAM_STR);
            $stmt->bindParam (':DIMENSIUNI_TABLOU', $order->dimensiuneTablou, PDO::PARAM_STR);
            $stmt->bindParam (':NUMAR_TABLOURI', $order->numarTablouri, PDO::PARAM_INT);
            $stmt->bindParam (':CUTIE_STICK', $order->cutieStick, PDO::PARAM_STR);
            $stmt->bindParam (':MAPA_STICK', $order->mapaStick, PDO::PARAM_STR);
            $stmt->bindParam (':MENTIUNI', $order->mentiuni, PDO::PARAM_STR);

            if ($stmt->execute()) {
                $id = $this->conn->lastInsertId();
                return $id;
            }
            
        } catch (Exception $e) {
            throw new Exception ($e->getMessage());
        }

    }

    public function getAllOrders () {
        $stmt = $this->conn->prepare ('SELECT * FROM ORDER_ALBUM ');

        if ($stmt->execute()) {
            $result = array();

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $albumDB = $this->getAlbumById($row['FK_ALBUM']);

                $albumMapped = OrderMapper::albumToService(
                    $albumDB, 
                    $this->tipCopertaService->getById($albumDB['FK_TIP_COPERTA']),
                    $this->materialeService->getById($albumDB['FK_MATERIAL_COPERTA']),
                    $this->dimensiuniService->getById($albumDB['FK_DIMENSIUNI_COPERTA'])
                );

                $order = OrderMapper::orderToService($row, $albumMapped, $this->userService->getById($row['FK_USER']));

                $result[] = $order;
            }

            return $result;
        }

        return null;
    }

    public function getOrderById ($id) {
        $stmt = $this->conn->prepare ('SELECT * FROM ORDER_ALBUM WHERE ID = :id');
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);

        if ($stmt->execute()) {

            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($row != null){
                $albumDB = $this->getAlbumById($row['FK_ALBUM']);

                $albumMapped = OrderMapper::albumToService(
                    $albumDB, 
                    $this->tipCopertaService->getById($albumDB['FK_TIP_COPERTA']),
                    $this->materialeService->getById($albumDB['FK_MATERIAL_COPERTA']),
                    $this->dimensiuniService->getById($albumDB['FK_DIMENSIUNI_COPERTA'])
                );

                $order = OrderMapper::orderToService($row, $albumMapped, $this->userService->getById($row['FK_USER']));

                return $order;
            }

        }

        return null;
    }

    public function getOrdersByUserId ($id) {
        $stmt = $this->conn->prepare ('SELECT * FROM ORDER_ALBUM WHERE FK_USER = ' . $id);

        if ($stmt->execute()) {
            $result = array();

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $albumDB = $this->getAlbumById($row['FK_ALBUM']);

                $albumMapped = OrderMapper::albumToService(
                    $albumDB, 
                    $this->tipCopertaService->getById($albumDB['FK_TIP_COPERTA']),
                    $this->materialeService->getById($albumDB['FK_MATERIAL_COPERTA']),
                    $this->dimensiuniService->getById($albumDB['FK_DIMENSIUNI_COPERTA'])
                );

                $order = OrderMapper::orderToService($row, $albumMapped, $this->userService->getById($row['FK_USER']));

                $result[] = $order;
            }

            return $result;
        }

        return null;
    }

    public function deleteOrder ($id) {

        $order = $this->getOrderById($id);
        if ($order == null) {
            throw new Exception ('comanda cu id ' . $id . ' nu exista');
        }

        $stmt = $this->conn->prepare ('DELETE FROM ORDER_ALBUM WHERE ID = :id');
        $stmt->bindParam (':id', $id, PDO::PARAM_INT);

        if ($stmt->execute()) {

            try {
                $album = $order['album'];
                $this->deleteAlbum($album['id']);
            } catch (Exception $e) {
                throw new Exception ($e->getMessage());
            }

            return $order;
        }

        return null;


    }

    public function updateOrder ($id) {
        $order = $this->getOrderById($id);
        if ($order == null) {
            throw new Exception ('comanda cu id ' . $id . ' nu exista');
        }
        
        $finish = date("Y-m-d h:i:sa");

        $stmt = $this->conn->prepare ('UPDATE ORDER_ALBUM
            SET DATA_TERMINARE = :finish WHERE ID = :id');        
        $stmt->bindParam (':id', $id, PDO::PARAM_INT);
        $stmt->bindParam (':finish', $finish, PDO::PARAM_STR);

        $stmt->execute();
    }
}

?>