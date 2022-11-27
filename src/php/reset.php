<?php
    header('Access-Control-Allow-Origin: *');
    include_once __DIR__ . "/database.php";

    $data = array(
        'status'  => 'Error'
    );

    $sql = "UPDATE pregunta SET answered = CASE answered WHEN 1 THEN 0 END WHERE answered = 1";

    if($result = $conexion->query($sql)){
        $data['status'] = 'Hecho';
        // echo $result;
        $result->free();
    } else {
        die('Query Error: '.mysqli_error($conexion));
    }

    $conexion->close();
    
    echo json_encode($data, JSON_PRETTY_PRINT);

    // UPDATE pregunta SET answered = CASE answered WHEN 1 THEN 0 END WHERE answered = 1
?>