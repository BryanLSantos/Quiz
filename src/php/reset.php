<?php
    header('Access-Control-Allow-Origin: *');
    /**
     * Direccion de la base de datos.
     */
    include_once __DIR__ . "/database.php";

    $data = array(
        'status'  => 'Error'
    );

    /**
     * Query a Utilizar
     */
    $sql = "UPDATE pregunta SET answered = CASE answered WHEN 1 THEN 0 END WHERE answered = 1";

    
    /**
     * Si el Query es exitoso entra el if.
     */
    if($result = $conexion->query($sql)){
        $data['status'] = 'Hecho';
        // echo $result;
        $result->free();
    } else {
        die('Query Error: '.mysqli_error($conexion));
    }

    $conexion->close();
    
    /**
     * Devuelve un array tipo json al documento.
     */
    echo json_encode($data, JSON_PRETTY_PRINT);
?>