var contador = 1;
var errores = 0;
var aciertos = 0;
var score = 0;
function contar() {
    $.ajax({
        url: 'http://localhost/quiz/src/php/contar.php',
        type: 'GET',
        success: function (response) {
            var conteo = JSON.parse(response);
            // console.log(conteo);

            var idpregunta = Math.floor(Math.random() * (conteo['conteo'])) + 1;

            // console.log(idpregunta);
            document.getElementById("numPregunta").innerHTML = "Pregunta " + contador;

            getPregunta(idpregunta);
        }
    });
}

function getPregunta(id) {
    $.ajax({
        type: 'POST',
        url: 'http://localhost/quiz/src/php/getPregunta.php',
        data:
        {
            idpregunta: id
        },
        success: function (response) {
            // console.log(response);
            var pregunta = JSON.parse(response);
            // console.log(pregunta);

            document.getElementById("pregunta").innerHTML = pregunta['pregunta'];
            let imagen = document.getElementById('imagen');
            imagen.setAttribute('src', 'src/img/' + pregunta['rutaImagen']);

            getRespuesta(id);
        }
    });
}

function getRespuesta(id) {
    $.ajax({
        type: 'POST',
        url: 'http://localhost/quiz/src/php/getRespuesta.php',
        data:
        {
            idpregunta: id
        },
        success: function (response) {
            // console.log(response);
            var respuesta = JSON.parse(response);

            var res1 = document.getElementById("respuesta1").innerHTML = respuesta[0]['respuesta'];
            var res2 = document.getElementById("respuesta2").innerHTML = respuesta[1]['respuesta'];
            var res3 = document.getElementById("respuesta3").innerHTML = respuesta[2]['respuesta'];
            var res4 = document.getElementById("respuesta4").innerHTML = respuesta[3]['respuesta'];
        }
    });
}

function answered(id) {
    if (contador < 8 || errores < 3 || aciertos < 5) {
        var value = document.getElementById(id).innerHTML;
        // console.log(value);
        $.ajax({
            type: 'POST',
            url: 'http://localhost/quiz/src/php/answer.php',
            data:
            {
                id: value
            },
            success: function (response) {
                console.log(response);
                var respuesta = JSON.parse(response);
                // console.log(pregunta);

                if (respuesta.length == 0) {
                    contador++;
                    errores++;
                    console.log('RESPUESTA ERRONEA');

                    $.ajax({
                        type: 'POST',
                        url: 'http://localhost/quiz/src/php/getResp.php',
                        data:
                        {
                            idpregunta: value
                        },
                        success: function (response) {
                            var respuesta = JSON.parse(response);
                            // console.log(respuesta);
                            var idres = respuesta['idpregunta'];

                            console.log(idres);
                            $.ajax({
                                type: 'POST',
                                url: 'http://localhost/quiz/src/php/update.php',
                                data:
                                {
                                    id: idres
                                },
                                success: function (response) {
                                    // var pregunta = JSON.parse(response);
                                    console.log(response);
                                }
                            });
                        }
                    });

                    $.ajax({
                        url: 'http://localhost/quiz/src/php/contar.php',
                        type: 'GET',
                        success: function (response) {
                            var conteo = JSON.parse(response);
                            // console.log(conteo);

                            var idpregunta = Math.floor(Math.random() * (conteo['conteo'])) + 1;

                            // console.log(idpregunta);
                            // document.getElementById("numPregunta").innerHTML = "Pregunta " + contador;

                            $.ajax({
                                type: 'POST',
                                url: 'http://localhost/quiz/src/php/getPregunta.php',
                                data:
                                {
                                    idpregunta: idpregunta
                                },
                                success: function (response) {
                                    // console.log(response);
                                    var pregunta = JSON.parse(response);
                                    while (pregunta.length == 0) {

                                        idpregunta = Math.floor(Math.random() * (conteo['conteo'])) + 1;

                                        $.ajax({
                                            type: 'POST',
                                            url: 'http://localhost/quiz/src/php/getPregunta.php',
                                            data:
                                            {
                                                idpregunta: idpregunta
                                            },
                                            success: function (response) {
                                                pregunta = JSON.parse(response);
                                            }
                                        });
                                    }
                                    // console.log(pregunta);

                                    document.getElementById("numPregunta").innerHTML = "Pregunta " + contador;
                                    document.getElementById("pregunta").innerHTML = pregunta['pregunta'];
                                    let imagen = document.getElementById('imagen');
                                    imagen.setAttribute('src', 'src/img/' + pregunta['rutaImagen']);

                                    $.ajax({
                                        type: 'POST',
                                        url: 'http://localhost/quiz/src/php/getRespuesta.php',
                                        data:
                                        {
                                            idpregunta: idpregunta
                                        },
                                        success: function (response) {
                                            // console.log(response);
                                            var respuesta = JSON.parse(response);
                                            // console.log(pregunta);
                                            // console.log(respuesta[0]);
                                            // console.log(respuesta[1]);
                                            // console.log(respuesta[2]);
                                            // console.log(respuesta[3]);

                                            document.getElementById("respuesta1").innerHTML = respuesta[0]['respuesta'];
                                            document.getElementById("respuesta2").innerHTML = respuesta[1]['respuesta'];
                                            document.getElementById("respuesta3").innerHTML = respuesta[2]['respuesta'];
                                            document.getElementById("respuesta4").innerHTML = respuesta[3]['respuesta'];
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
                else {
                    contador++;
                    aciertos++;
                    score = score + 150;

                    $.ajax({
                        type: 'POST',
                        url: 'http://localhost/quiz/src/php/getResp.php',
                        data:
                        {
                            idpregunta: value
                        },
                        success: function (response) {
                            var respuesta = JSON.parse(response);
                            // console.log(respuesta);
                            var idres = respuesta['idpregunta'];

                            console.log(idres);
                            $.ajax({
                                type: 'POST',
                                url: 'http://localhost/quiz/src/php/update.php',
                                data:
                                {
                                    id: idres
                                },
                                success: function (response) {
                                    // var pregunta = JSON.parse(response);
                                    console.log(response);
                                }
                            });
                        }
                    });

                    $.ajax({
                        url: 'http://localhost/quiz/src/php/contar.php',
                        type: 'GET',
                        success: function (response) {
                            var conteo = JSON.parse(response);
                            // console.log(conteo);

                            var idpregunta = Math.floor(Math.random() * (conteo['conteo'])) + 1;

                            // console.log(idpregunta);
                            // document.getElementById("numPregunta").innerHTML = "Pregunta " + contador;

                            $.ajax({
                                type: 'POST',
                                url: 'http://localhost/quiz/src/php/getPregunta.php',
                                data:
                                {
                                    idpregunta: idpregunta
                                },
                                success: function (response) {
                                    // console.log(response);
                                    var pregunta = JSON.parse(response);
                                    while (pregunta.length == 0) {

                                        idpregunta = Math.floor(Math.random() * (conteo['conteo'])) + 1;

                                        $.ajax({
                                            type: 'POST',
                                            url: 'http://localhost/quiz/src/php/getPregunta.php',
                                            data:
                                            {
                                                idpregunta: idpregunta
                                            },
                                            success: function (response) {
                                                pregunta = JSON.parse(response);
                                            }
                                        });
                                    }
                                    // console.log(pregunta);

                                    document.getElementById("numPregunta").innerHTML = "Pregunta " + contador;
                                    document.getElementById("pregunta").innerHTML = pregunta['pregunta'];
                                    let imagen = document.getElementById('imagen');
                                    imagen.setAttribute('src', 'src/img/' + pregunta['rutaImagen']);

                                    $.ajax({
                                        type: 'POST',
                                        url: 'http://localhost/quiz/src/php/getRespuesta.php',
                                        data:
                                        {
                                            idpregunta: idpregunta
                                        },
                                        success: function (response) {
                                            // console.log(response);
                                            var respuesta = JSON.parse(response);
                                            // console.log(pregunta);
                                            // console.log(respuesta[0]);
                                            // console.log(respuesta[1]);
                                            // console.log(respuesta[2]);
                                            // console.log(respuesta[3]);

                                            document.getElementById("respuesta1").innerHTML = respuesta[0]['respuesta'];
                                            document.getElementById("respuesta2").innerHTML = respuesta[1]['respuesta'];
                                            document.getElementById("respuesta3").innerHTML = respuesta[2]['respuesta'];
                                            document.getElementById("respuesta4").innerHTML = respuesta[3]['respuesta'];
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            }
        });
    } else if (aciertos >= 5) {
        console.log('YA GANASTE HIJOEPUTA');
    }
    else if (errores >= 3) {
        console.log('YA PERDISTE HIJOEPUTA');
    }
}
// ---------- EJECUCION
$(document).ready(function () {
    // console.log( "ready!" );
    document.getElementById("score").innerHTML = 'Score: ' + score;
    contar();
});