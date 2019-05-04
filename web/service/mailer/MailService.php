<?php


require __DIR__ . '/PHPMailer/src/Exception.php';
require __DIR__ . '/PHPMailer/src/PHPMailer.php';
require __DIR__ . '/PHPMailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class MailService {
    
    /**
     * Adresa de email la care se trimit emailuri automate in momentul in care
     * o comanda este plasata.
     */
    public static $supportMail = 'office@crisstudio.ro';

    public function sendHTMLEmail ($to, $subject, $message) {
        
        $mail = new PHPMailer(false);
        
        //Server settings
        $mail->isSMTP();                                            // Set mailer to use SMTP
        $mail->Host       = 'mail.crisstudio.ro';  // Specify main and backup SMTP servers
        $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
        $mail->Username   = 'bogdan@crisstudio.ro';                     // SMTP username
        $mail->Password   = 'Amparola2806!';                               // SMTP password
        $mail->Port       = 26;                                    // TCP port to connect to
    
        //Recipients
        $mail->setFrom(MailService::$supportMail, 'Agentia Cris');
        $mail->addAddress($to);
    
        // Content
        $mail->isHTML(true);                                  // Set email format to HTML
        $mail->Subject = $subject;
        $mail->Body    = $this->buildMessage($message);

        $mail->send();

    }

    private function buildMessage ($message) {
        $template = '<html>';
        $template .= '<body>';
        $template .= '<header>';
        $template .= '<h2> Agentia Cris </h2>'; 
        $template .= '</header>';
        $template .= '<div class="container">';
        $template .= $message;
        $template .= '</div>';
        $template .= '</body>';
        $template .= '</html>';

        return $template;
    }

}


?>