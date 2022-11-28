<?php
    header('Access-Control-Allow-Origin: *');
    /**
     * Direccion de la base de datos.
     */
    include_once __DIR__ . "/database.php";

    $data = array();

    /**
     * Query a Utilizar
     */
    $sql = "SELECT COUNT(id) conteo FROM pregunta";

    /**
     * Si el Query es exitoso entra el if.
    */
    if($result = $conexion->query($sql)){
        $rows = $result->fetch_array(MYSQLI_ASSOC);

        if(!is_null($rows)) {
            // SE CODIFICAN A UTF-8 LOS DATOS Y SE MAPEAN AL ARREGLO DE RESPUESTA
            foreach($rows as $num => $row) {
                $data[$num] = utf8_encode($row);
            }
        }
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