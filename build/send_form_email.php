<?php
$to = 'NataliyaYeromina@gmai.com';
$mess = implode(", ", $_POST);
$mess = strip_tags($mess);
$mess = htmlspecialchars($words);
mail($to, $title, $mess, 'From:' . 'form@yeromina.com');
?>