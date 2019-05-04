<?php

include_once __DIR__ . '/scripts/ImportMateriale.php';
include_once __DIR__ . '/scripts/ImportTipuri.php';
include_once __DIR__ . '/scripts/ImportClientsFromCSV.php';


// ImportMateriale();
// ImportTipuri();
// ImportClientsFromCSV ('Client.csv');

include_once __DIR__ . '/service/mailer/MailService.php';
echo 'Trying to send email...';
$service = new MailService();
$service->sendHTMLEmail('bogdanmaier49@gmail.com', 'TEST', '<a> TEST </a>');

?>