/**
 * Iniciacion de variables.
*/
var contador = 1;
var errores = 0;
var aciertos = 0;
var score = 0;

/**
 * Funcion para generar un numero entre el numero de preguntas existentes en la base de datos.
 */
function contar() {
    /**
     * Cuenta las preguntas de la Base de datos.
     */
    $.ajax({
        url: 'http://localhost/quiz/src/php/contar.php',
        type: 'GET',
        success: function (response) {
            /**
             * Retorna el numero de preguntas existentes.
             */
            var conteo = JSON.parse(response);

            /**
             * Genera un numero aleatorio en el rango de 1 y el maximo de preguntas existentes.
             */
            var idpregunta = Math.floor(Math.random() * (conteo['conteo'])) + 1;

            /**
             * Llama a la funcion getPregunta.
             */
            getPregunta(idpregunta, conteo);
        }
    });
}

/**
 * Funcion para reiniciar el Quiz.
 */
function reset() {
    console.log("REINICIO");

    /**
     * Reinicializa las variables.
     */
    contador = 1;
    errores = 0;
    aciertos = 0;
    score = 0;
    document.getElementById("score").innerHTML = 'Score: ' + score + "&nbsp&nbsp&nbsp&nbsp&nbsp Aciertos: " + aciertos + '&nbsp&nbsp&nbsp&nbsp&nbsp Fallos: ' + errores;
    document.getElementById("numPregunta").innerHTML = "Pregunta " + contador;

    /**
     * Reinicia la Base de Datos.
     */
    // $.ajax({
    //     url: 'http://localhost/quiz/src/php/reset.php',
    //     type: 'GET',
    //     success: function (response) {
    //         console.log(response);
    //     }
    // });
}

/**
 * Funcion para obtener una pregunta.
 * @param {int} id 
 * @param {int} conteo 
 */
function getPregunta(id, conteo) {

    /**
     * Si Alguna de las variables llega a su maximo muestra el modal emergente.
     */
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

    /**
     * Obtiene una pregunta
     */
    $.ajax({
        type: 'POST',
        url: 'http://localhost/quiz/src/php/getPregunta.php',
        /**
         * ID de pregunta a obtener
         */
        data:
        {
            idpregunta: id
        },
        success: function (response) {
            var pregunta = JSON.parse(response);

            /**
             * Si la pregunta no existe (El array es null) vuelve a llamar a la funcion.
             */
            while (pregunta.length == 0) {

                idpregunta = Math.floor(Math.random() * (conteo['conteo'])) + 1;

                getPregunta(idpregunta, conteo)
            }

            /**
             * Sustituye los valores del arreglo dentro del documento.
             */
            document.getElementById("pregunta").innerHTML = pregunta['pregunta'];
            let imagen = document.getElementById('imagen');
            imagen.setAttribute('src', 'src/img/' + pregunta['rutaImagen']);

            /**
             * Obtiene las respuestas de la pregunta.
             */
            getRespuesta(pregunta['id']);
        }
    });
}

/**
 * Funcion para obtener respuestas.
 * @param {int} id 
 */
function getRespuesta(id) {
    $.ajax({
        type: 'POST',
        url: 'http://localhost/quiz/src/php/getRespuesta.php',
        /**
         * ID de pregunta para obtener respuestas
         */
        data:
        {
            idpregunta: id
        },
        success: function (response) {
            var respuesta = JSON.parse(response);

            /**
             * Sustituye todas las respuestas obtenidas dentro del documento.
             */
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

/**
 * Actualiza preguntas respondidas.
 * @param {int} id 
 */
function answered(id) {
    /**
     * Limite para obtener preguntas.
     */
    if (contador < 8 && errores < 3 && aciertos < 5) {
        var value = document.getElementById(id).innerHTML;
        /**
         * Actualiza bases de datos.
         */
        $.ajax({
            type: 'POST',
            url: 'http://localhost/quiz/src/php/answer.php',
            /**
             * ID de pregunta para actualizar
             */
            data:
            {
                id: value
            },
            success: function (response) {
                var pregunta = JSON.parse(response);
                /**
                 * Si la respuesta es erronea actualiza y genera nueva pregunta.
                 */
                if (pregunta.length == 0) {
                    /**
                     * Aumenta contadores.
                     */
                    contador++;
                    errores++;

                    /**
                     * Actualiza el estado de las preguntas.
                     */
                    update(0, value);

                    /**
                     * Obtiene nueva pregunta.
                     */
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
                /**
                 * Si la respuesta es correcta actualiza y genera nueva pregunta.
                 */
                else {
                    /**
                     * Aumenta contadores.
                     */
                    let id = pregunta['id'];
                    contador++;
                    aciertos++;
                    score = score + 150;

                    /**
                     * Actualiza estado de preguntas.
                     */
                    update(id);

                    /**
                     * Obtienen pergunta nueva.
                     */
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

/**
 * Funcion para actualizar las preguntas (Correctas).
 * @param {int} id 
 */
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

/**
 * Funcion para actualizar las preguntas (Incorrectas).
 * @param {int} id 
 * @param {int} idrespuesta 
 */
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
    document.getElementById("score").innerHTML = 'Score: ' + score;
    contar();
});