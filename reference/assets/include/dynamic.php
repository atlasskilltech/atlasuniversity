<?php

if ($_SERVER['HTTP_HOST'] == 'localhost') {
    $domain = 'http://' . $_SERVER['HTTP_HOST'] . '/atlasskilltech/';
    $edudomain = 'http://' . $_SERVER['HTTP_HOST'];
} else {
    // auto detect https / http
    $scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? "https" : "http";
    $domain = $scheme . '://' . $_SERVER['HTTP_HOST'] . '/'; //https://atlasuniversity.edu.in/newwebsite2016xyxw034/
    $edudomain = $scheme . '://' . $_SERVER['HTTP_HOST'].'/'; //https://atlasuniversity.edu.in/
}

?>

<?php
include_once $_SERVER['DOCUMENT_ROOT'].'/assets/include/keydates/connection.php';
?>