<?php
    header('Access-Control-Allow-Origin: *');
    include_once __DIR__ . "/database.php";

    $data = array();

    if (isset($_POST['idpregunta'])) {
        $id = $_POST['idpregunta'];

        $sql = "SELECT * FROM `respuesta` WHERE respuesta = '$id'";

        if($result = $conexion->query($sql)){
            $rows = $result->fetch_array(MYSQLI_ASSOC);

            if(!is_null($rows)) {
                // SE CODIFICAN A UTF-8 LOS DATOS Y SE MAPEAN AL ARREGLO DE RESPUESTA
                foreach($rows as $num => $row) {
                    $data[$num] = ($row);
                    // foreach($row as $key => $value) {
                    //     $data[$num][$key] = utf8_encode($value);
                    // }
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