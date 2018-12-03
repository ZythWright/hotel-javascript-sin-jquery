<?php
//header('Content-type:application/javascript');

$cnx = new mysqli("localhost","root","root","dbHotel");

if ($cnx->connect_errno) 
    echo "Fallo al conectar a MySQL: (" . $cnx->connect_errno . ") " . $cnx->connect_error;

?>