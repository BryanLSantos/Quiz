<?php
    header('Access-Control-Allow-Origin: *');
    /**
     * Direccion de la base de datos.
     */
    include_once __DIR__ . "/database.php";

    $data = array();

    /**
     * Si se envia la variable id se activa el if.
     */
    if (isset($_POST['id'])) {
        $id = $_POST['id'];

        /**
         * Query a utilizar
         */
        $sql = "SELECT * FROM `pregunta` WHERE idrespuesta = (SELECT id FROM `respuesta` WHERE id = '{$id}')";

        /**
         * Si el Query es exitoso entra el if.
         */
        if($result = $conexion->query($sql)){
            $rows = $result->fetch_array(MYSQLI_ASSOC);

            /**
             * Se recuperan los datos obtenidos y se guardan en un array.
             */
            if(!is_null($rows)) {
                foreach($rows as $num => $row) {
                    $data[$num] = ($row);
                }
            }
            $result->free();
        } 
        /**
         * Si el query no es exitoso marca un error.
         */
        else {
            die('Query Error: '.mysqli_error($conexion));
        }

        $conexion->close();
    }
    /**
     * Devuelve un array tipo json al documento.
     */
    echo json_encode($data, JSON_PRETTY_PRINT);
?>