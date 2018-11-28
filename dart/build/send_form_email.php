<?php
header('Access-Control-Allow-Origin: *');

if($_POST) {
    $message = '';
    foreach ($_POST as $key => $value)
        $message .= htmlspecialchars($key).": ".htmlspecialchars($value)."\r\n";
    mail('NataliyaYeromina@gmail.com', 'From your site', $message);
}

?>