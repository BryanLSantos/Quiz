<?php
    header('Access-Control-Allow-Origin: *');
    /**
     * Direccion de la base de datos
     */
    include_once __DIR__ . "/database.php";

    $data = array();

    /**
     * Si se envia la variable id se activa el if
     */
    if (isset($_POST['id'])) {
        $id = $_POST['id'];

        $sql = "SELECT * FROM `pregunta` WHERE idrespuesta = (SELECT id FROM `respuesta` WHERE id = '{$id}')";

        if($result = $conexion->query($sql)){
            $rows = $result->fetch_array(MYSQLI_ASSOC);

            if(!is_null($rows)) {
                // SE CODIFICAN A UTF-8 LOS DATOS Y SE MAPEAN AL ARREGLO DE RESPUESTA
                foreach($rows as $num => $row) {
                    $data[$num] = ($row);

                }
            }
            // echo $result;
            $result->free();
        } else {
            die('Query Error: '.mysqli_error($conexion));
        }

        $conexion->close();
    }
    
    echo json_encode($data, JSON_PRETTY_PRINT);
?>