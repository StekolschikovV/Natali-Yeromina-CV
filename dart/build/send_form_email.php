<?php
header('Access-Control-Allow-Origin: *');

if($_POST) {
    $message = '';
    foreach ($_POST as $key => $value)
        $message .= htmlspecialchars($key).": ".htmlspecialchars($value)."\r\n";
    mail('NataliyaYeromina@gmai.com', 'From your site', $message);
}

?>