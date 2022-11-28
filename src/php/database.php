<?php
    header('Access-Control-Allow-Origin: *');
    /**
     * Direccion de la base de datos.
     */
    $conexion = @mysqli_connect(
        'localhost',
        'root', //Nombre de Usuario de db
        '12345678a', //Contraseña de usuario
        'quiz' //Nombre de db
    );

    /**
     * NOTA: si la conexión falló $conexion contendrá false
     **/
    if(!$conexion) {
        die('Error, la db no conectó!');
    }
?>