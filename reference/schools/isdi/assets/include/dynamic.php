<?php
include_once $_SERVER['DOCUMENT_ROOT'].'/assets/include/keydates/connection.php';
if ($_SERVER['HTTP_HOST'] == 'localhost') {
    $domain = 'http://' . $_SERVER['HTTP_HOST'] . '/atlasskilltech/schools/isdi/';
     $ogdomain = 'http://' . $_SERVER['HTTP_HOST'].'/atlasskilltech/';
     $edudomain = 'http://' . $_SERVER['HTTP_HOST'];
} else {
    // auto detect https / http
    $scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? "https" : "http";
    $domain = $scheme . '://' . $_SERVER['HTTP_HOST'] . '/schools/isdi/';
     $ogdomain = $scheme . '://' . $_SERVER['HTTP_HOST']."/" ;
      $edudomain = $scheme . '://' . $_SERVER['HTTP_HOST']."/"; //https://atlasuniversity.edu.in/
    
}

?>

<?php

?>