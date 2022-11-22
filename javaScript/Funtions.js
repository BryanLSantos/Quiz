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

            var idpregunta = Math.floor(Math.random() * (conteo['conteo'])) + 1;

            getPregunta(idpregunta, conteo);
        }
    });
}

function reset() {
    console.log("REINICIO");
    contador = 1;
    errores = 0;
    aciertos = 0;
    score = 0;
    document.getElementById("score").innerHTML = 'Score: ' + score + "&nbsp&nbsp&nbsp&nbsp&nbsp Aciertos: " + aciertos + '&nbsp&nbsp&nbsp&nbsp&nbsp Fallos: ' + errores;
    document.getElementById("numPregunta").innerHTML = "Pregunta " + contador;
    // $.ajax({
    //     url: 'http://localhost/quiz/src/php/reset.php',
    //     type: 'GET',
    //     success: function (response) {
    //         console.log(response);
    //     }
    // });
}

function getPregunta(id, conteo) {

    if (aciertos == 5) {
        document.getElementById('exampleModalLabel').innerHTML = 'FELICIDADES';
        document.getElementById('exampleModalLabelBody').innerHTML = 'Felicidades, ganaste el Quiz, eres un Genio 😎👍🔥 \n YOU SCORE: ' + score;
        $('#exampleModal').modal('show');
    }
    else if (errores == 3) {
        document.getElementById('exampleModalLabel').innerHTML = 'LO SIENTO';
        document.getElementById('exampleModalLabelBody').innerHTML = 'No eres tan listo como esperabamos 🥺😞👌';
        $('#exampleModal').modal('show');
    }
    else if (contador == 8) {
        document.getElementById('exampleModalLabel').innerHTML = 'LO SIENTO';
        document.getElementById('exampleModalLabelBody').innerHTML = 'Llegaste al final y se acabo 🥺😞👌';
        $('#exampleModal').modal('show');
    }

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

            while (pregunta.length == 0) {

                idpregunta = Math.floor(Math.random() * (conteo['conteo'])) + 1;

                getPregunta(idpregunta, conteo)
            }

            document.getElementById("pregunta").innerHTML = pregunta['pregunta'];
            let imagen = document.getElementById('imagen');
            imagen.setAttribute('src', 'src/img/' + pregunta['rutaImagen']);

            getRespuesta(pregunta['id']);
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
            var respuesta = JSON.parse(response);
            // console.log(respuesta);

            document.getElementById("respuesta1").innerHTML = respuesta[0]['respuesta'];
            document.getElementById("label1").innerHTML = respuesta[0]['id'];

            document.getElementById("respuesta2").innerHTML = respuesta[1]['respuesta'];
            document.getElementById("label2").innerHTML = respuesta[1]['id'];

            document.getElementById("respuesta3").innerHTML = respuesta[2]['respuesta'];
            document.getElementById("label3").innerHTML = respuesta[2]['id'];

            document.getElementById("respuesta4").innerHTML = respuesta[3]['respuesta'];
            document.getElementById("label4").innerHTML = respuesta[3]['id'];

            document.getElementById("score").innerHTML = 'Score: ' + score + "&nbsp&nbsp&nbsp&nbsp&nbsp Aciertos: " + aciertos + '&nbsp&nbsp&nbsp&nbsp&nbsp Fallos: ' + errores;
            document.getElementById("numPregunta").innerHTML = "Pregunta " + contador;

        }
    });
}

function answered(id) {
    
    if (contador < 8 && errores < 3 && aciertos < 5) {
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
                // console.log(response);
                var pregunta = JSON.parse(response);
                // console.log(pregunta);

                if (pregunta.length == 0) {
                    contador++;
                    errores++;
                    // console.log('RESPUESTA ERRONEA');

                    update(0, value);

                    $.ajax({
                        url: 'http://localhost/quiz/src/php/contar.php',
                        type: 'GET',
                        success: function (response) {
                            var conteo = JSON.parse(response);
                            // console.log(conteo);

                            var idpregunta = Math.floor(Math.random() * (conteo['conteo'])) + 1;

                            getPregunta(idpregunta, conteo);
                        }
                    });
                }
                else {
                    let id = pregunta['id'];
                    contador++;
                    aciertos++;
                    score = score + 150;

                    update(id);

                    $.ajax({
                        url: 'http://localhost/quiz/src/php/contar.php',
                        type: 'GET',
                        success: function (response) {
                            var conteo = JSON.parse(response);
                            // console.log(conteo);

                            var idpregunta = Math.floor(Math.random() * (conteo['conteo'])) + 1;

                            getPregunta(idpregunta, conteo);
                        }
                    });
                }
            }
        });
    }
}

function update(id) {
    // console.log("update");
    // $.ajax({
    //     type: 'POST',
    //     url: 'http://localhost/quiz/src/php/update.php',
    //     data:
    //     {
    //         id: id
    //     },
    //     success: function (response) {
    //         console.log(response);
    //         // var pregunta = JSON.parse(response);
    //     }
    // });
}

function update(id, idrespuesta) {
    // $.ajax({
    //     type: 'POST',
    //     url: 'http://localhost/quiz/src/php/update.php',
    //     data:
    //     {
    //         idrespuesta: idrespuesta
    //     },
    //     success: function (response) {
    //         // console.log(response);
    //         // var pregunta = JSON.parse(response);
    //     }
    // });
}
// ---------- EJECUCION
$(document).ready(function () {
    // console.log( "ready!" );
    document.getElementById("score").innerHTML = 'Score: ' + score;
    contar();
});