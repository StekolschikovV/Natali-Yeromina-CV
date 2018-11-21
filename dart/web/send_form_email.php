<?php
//$to = 'NataliyaYeromina@gmai.com';
//$mess = implode(", ", $_POST);
//$mess = strip_tags($mess);
//$mess = htmlspecialchars($words);
//mail($to, $title, $mess, 'From:' . 'form@yeromina.com');


if($_GET) {
    $message = '';
    foreach ($_GET as $key => $value)
        $message .= htmlspecialchars($key).": ".htmlspecialchars($value)."\r\n";
    $to = 'NataliyaYeromina@gmai.com';
    mail('mou.mail.com@gmail.com', 'From your site', $message);
}

?>