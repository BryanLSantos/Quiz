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
     * Si se envia la variable id se activa el if.
     */
    if (isset($_POST['id'])) {
        $id = $_POST['id'];

        /**
         * Query a Utilizar
         */
        $sql = "UPDATE pregunta SET answered = 1 WHERE id = $id";

        
        /**
         * Si el Query es exitoso entra el if.
         */
        if($result = $conexion->query($sql)){
            $data['status'] = 'Hecho';
        } else {
            die('Query Error: '.mysqli_error($conexion));
        }

        $conexion->close();
    }

    /**
     * Si se envia la variable idrespuesta se activa el if.
     */
    if (isset($_POST['idrespuesta'])) {
        $id = $_POST['idrespuesta'];

        /**
         * Query a Utilizar
         */
        $sql = "UPDATE pregunta SET answered = 1 WHERE id =(SELECT respuesta.idpregunta from respuesta WHERE respuesta.id = $id)";

        
        /**
         * Si el Query es exitoso entra el if.
         */
        if($result = $conexion->query($sql)){
            $data['status'] = 'Hecho';
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