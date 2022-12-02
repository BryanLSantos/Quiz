<?php
    header('Access-Control-Allow-Origin: *');
    $conexion = @mysqli_connect(
        'localhost',
        'root', //Nombre de Usuario de db
        'Elkomander', //Contraseña de usuario
        'quiz' //Nombre de db
    );

    /**
     * NOTA: si la conexión falló $conexion contendrá false
     **/
    if(!$conexion) {
        die('Error, la db no conectó!');
    }
?>