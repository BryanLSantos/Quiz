<?php
    header('Access-Control-Allow-Origin: *');
    include_once __DIR__ . "/database.php";

    $data = array(
        'status'  => 'Error',
        'message' => 'La Insercion Fallo'
    );

    $data2_1 = array(
        'status'  => 'Error',
        'message' => 'La Insercion Fallo'
    );

    $data2_2 = array(
        'status'  => 'Error',
        'message' => 'La Insercion Fallo'
    );

    $data2_3 = array(
        'status'  => 'Error',
        'message' => 'La Insercion Fallo'
    );

    $data2_4 = array(
        'status'  => 'Error',
        'message' => 'La Insercion Fallo'
    );

    $data3 = array(
        'status'  => 'Error',
        'message' => 'La Insercion Fallo'
    );

    if (isset($_POST['pregunta'])) {
        $pregunta = $_POST['pregunta'];
        $respuesta1 = $_POST['respuesta1'];
        $respuesta2 = $_POST['respuesta2'];
        $respuesta3 = $_POST['respuesta3'];
        $respuesta4 = $_POST['respuesta4'];
        $imagen = $_POST['imagen'];
        $res = $_POST['res'];

        $sql = "INSERT INTO pregunta VALUES (NULL, '{$pregunta}', NULL, 0, '{$imagen}');";

        $sql2_1 = "INSERT INTO respuesta VALUES (NULL, '{$respuesta1}', (SELECT id FROM pregunta WHERE id = (SELECT MAX(id) from pregunta)));";
        $sql2_2 = "INSERT INTO respuesta VALUES (NULL, '{$respuesta2}', (SELECT id FROM pregunta WHERE id = (SELECT MAX(id) from pregunta)));";
        $sql2_3 = "INSERT INTO respuesta VALUES (NULL, '{$respuesta3}', (SELECT id FROM pregunta WHERE id = (SELECT MAX(id) from pregunta)));";
        $sql2_4 = "INSERT INTO respuesta VALUES (NULL, '{$respuesta4}', (SELECT id FROM pregunta WHERE id = (SELECT MAX(id) from pregunta)));";
        // $sql2_1 = 'INSERT INTO respuesta VALUES (NULL, \"{$respuesta1}\", (SELECT id FROM pregunta WHERE id = (SELECT MAX(id) from pregunta)));';
        // $sql2_2 = 'INSERT INTO respuesta VALUES (NULL, \"{$respuesta2}\", (SELECT id FROM pregunta WHERE id = (SELECT MAX(id) from pregunta)));';
        // $sql2_3 = 'INSERT INTO respuesta VALUES (NULL, \"{$respuesta3}\", (SELECT id FROM pregunta WHERE id = (SELECT MAX(id) from pregunta)));';
        // $sql2_4 = 'INSERT INTO respuesta VALUES (NULL, \"{$respuesta4}\", (SELECT id FROM pregunta WHERE id = (SELECT MAX(id) from pregunta)));';
        
        if ($res == 1) {
            $sql3 = "UPDATE pregunta SET idrespuesta = (SELECT (MIN(id)) FROM respuesta WHERE respuesta.idpregunta = (SELECT MAX(id) from pregunta)) WHERE id = (SELECT MAX(id) from pregunta)";
        }
        if ($res == 2) {
            $sql3 = "UPDATE pregunta SET idrespuesta = (SELECT (MIN(id) + 1) FROM respuesta WHERE respuesta.idpregunta = (SELECT MAX(id) from pregunta)) WHERE id = (SELECT MAX(id) from pregunta)";
        }
        if ($res == 3) {
            $sql3 = "UPDATE pregunta SET idrespuesta = (SELECT (MAX(id) - 1) FROM respuesta WHERE respuesta.idpregunta = (SELECT MAX(id) from pregunta)) WHERE id = (SELECT MAX(id) from pregunta)";
        }
        if ($res == 4) {
            $sql3 = "UPDATE pregunta SET idrespuesta = (SELECT (MAX(id)) FROM respuesta WHERE respuesta.idpregunta = (SELECT MAX(id) from pregunta)) WHERE id = (SELECT MAX(id) from pregunta)";
        }

        // PRIMER QUERY
        if($conexion->query($sql)){
            $data['status'] = 'OK';
            $data['message'] = 'Query hecho!';
        }
    
        echo json_encode($data);

        // SEGUNDO QUERY
        if($conexion->query($sql2_1)){

            $data2_1['status'] = 'OK';
            $data2_1['message'] = 'Query hecho!';
        }
        echo json_encode($data2_1);
        
        if($conexion->query($sql2_2)){
            $data2_2['status'] = 'OK';
            $data2_2['message'] = 'Query hecho!';
        }
    
        echo json_encode($data2_2);

        if($conexion->query($sql2_3)){
            $data2_3['status'] = 'OK';
            $data2_3['message'] = 'Query hecho!';
        }
    
        echo json_encode($data2_3);

        if($conexion->query($sql2_4)){
            $data2_4['status'] = 'OK';
            $data2_4['message'] = 'Query hecho!';
        }
    
        echo json_encode($data2_4);

        // TERCER QUERY
        if($conexion->query($sql3)){
            $data3['status'] = 'OK';
            $data3['message'] = 'Query hecho!';
        }
        $conexion->close();
    
        echo json_encode($data3);
    }
?>