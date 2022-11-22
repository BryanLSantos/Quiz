<?php
    header('Access-Control-Allow-Origin: *');
    include_once __DIR__ . "/database.php";

    $data = array(
        'status'  => 'Error'
    );

    if (isset($_POST['id'])) {
        $id = $_POST['id'];

        // $sql = "SELECT * FROM `pregunta` WHERE idrespuesta = (SELECT id FROM `respuesta` WHERE respuesta = '{$id}')";

        $sql = "UPDATE pregunta SET answered = 0 WHERE id = $id";

        if($result = $conexion->query($sql)){
            $data['status'] = 'Hecho';
        } else {
            die('Query Error: '.mysqli_error($conexion));
        }

        $conexion->close();
    }

    if (isset($_POST['idrespuesta'])) {
        $id = $_POST['idrespuesta'];

        // $sql = "SELECT * FROM `pregunta` WHERE idrespuesta = (SELECT id FROM `respuesta` WHERE respuesta = '{$id}')";

        $sql = "UPDATE pregunta SET answered = 0 WHERE id =(SELECT respuesta.idpregunta from respuesta WHERE respuesta.id = $id)";

        if($result = $conexion->query($sql)){
            $data['status'] = 'Hecho';
        } else {
            die('Query Error: '.mysqli_error($conexion));
        }

        $conexion->close();
    }
    
    echo json_encode($data, JSON_PRETTY_PRINT);
?>