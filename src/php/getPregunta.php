<?php
    header('Access-Control-Allow-Origin: *');
    /**
     * Direccion de la base de datos.
     */
    include_once __DIR__ . "/database.php";

    $data = array();

    /**
     * Si se envia la variable idpregunta se activa el if.
     */
    if (isset($_POST['idpregunta'])) {
        $id = $_POST['idpregunta'];

        /**
         * Query a Utilizar
         */
        $sql = "SELECT * FROM `pregunta` WHERE id = '$id' AND answered = 0";

        /**
         * Si el Query es exitoso entra el if.
         */
        if($result = $conexion->query($sql)){
            $rows = $result->fetch_array(MYSQLI_ASSOC);

            if(!is_null($rows)) {
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
    
    /**
     * Devuelve un array tipo json al documento.
     */
    echo json_encode($data, JSON_PRETTY_PRINT);
?>