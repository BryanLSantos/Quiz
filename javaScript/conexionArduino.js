//Inicializacion de la conexion de la base de datos mysql
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Elkomander",
  database: "quiz"
});

var con2 = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Elkomander",
    database: "quiz"
});

//Inicializacion de la conexion de la base de datos mysql

//Variable que contiene el numero del boton de arduino que se enviara a la pagina
let mensaje = "";
//Libreria para conexion de arduino
var five = require("johnny-five"),
//Definicion de la placa y boton en Johnny Five
board, button;
//Objeto de placa para Johny five
board = new five.Board();
//Funcion que se ejecutara cuando la placa este lista
board.on("ready", function() {
// Crear una nuevas instancia de 'button' de hardware.
buttonA = new five.Button(2);
buttonB = new five.Button(3);
buttonC = new five.Button(4);
buttonD = new five.Button(5);
// Inyecta el hardware 'boton' dentro
// el Repl de la instancia del contexto;
// Permite acceso de linea de comando directo
board.repl.inject({
    buttonA: button,
    buttonB: button,
    buttonC: button,
    buttonD: button
});

/* El boton A en este caso es presionado y se envia la señal a la pagina 
con informacion que el boton 1 fue presionado
*/
buttonA.on("up", function() {
    mensaje = "boton1";
    io.emit('respuesta', mensaje );
});
/* El boton B en este caso es presionado y se envia la señal a la pagina
con informacion que el boton 2 fue presionado
*/
buttonB.on("up", function() {
    mensaje = "boton2";
    io.emit('respuesta', mensaje );
});
/* El boton C en este caso es presionado y se envia la señal a la pagina
con informacion que el boton 3 fue presionado
*/
buttonC.on("up", function() {
    mensaje = "boton3";
    io.emit('respuesta', mensaje );
});
/* El boton D en este caso es presionado y se envia la señal a la pagina
con informacion que el boton 4 fue presionado
*/
buttonD.on("up", function() {
    mensaje = "boton4";
    io.emit('respuesta', mensaje );
});
});

//Creacion de objeto express y server para la creacion de un server con protocolo http
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

//Creacion de objeto io para comunicacion de arduino con html y javascript
const { Server } = require("socket.io");
const io = new Server(server);

// app.use(express.static(__dirname+'/publico'));
// app.get('/public', express.static('public'));
// app.use('/static', express.static('dist'));
// app.use(express.static('public'));
// app.use('C:/xampp/htdocs/Quiz/Quiz/publico/src', express.static('public'));
// const path = require('path');
// app.use('/publico', express.static(path.join(__dirname, 'public')));

//Funcion que automaticamente redirige a la pagina index
app.get('/', (req, res) => {
    res.sendFile('C:/xampp/htdocs/Quiz/Quiz/index.html');
});

//Funcion que se ejecuta cuando se detecta conexion con el cliente y lo imprime en consola
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    /*Funcion que se ejecuta cuando se detecta un mensaje con proposito de contar
     y regresa el query de conteo al cliente*/
    socket.on('contar', (msg) => {
        var r = msg;
        console.log("Mensaje que el cliente regreso contar" + msg);
            console.log("Connected!");
            var sql = "SELECT COUNT(id) conteo FROM pregunta";
            con.query(sql, function (err, result,fields) {
            if (err) throw err;
            console.log("se hizo la consulta contestar");
            console.log(result);
            io.emit('contarR', result[0].conteo);
            });
        console.log('contar activado');
    });

    /*Funcion que se ejecuta cuando se detecta un mensaje con proposito de contar 
    y regresa el query de conteo al cliente*/
    socket.on('contar2', (msg) => {
        var r = msg;
        console.log("Mensaje que el cliente regreso contar" + msg);
        // con.connect(function(err) {
            // if (err) throw err;
            console.log("Connected!");
            var sql = "SELECT COUNT(id) conteo FROM pregunta";
            con.query(sql, function (err, result,fields) {
            if (err) throw err;
            console.log("se hizo la consulta contestar");
            console.log(result);
            io.emit('contar2R', result[0].conteo);
            //con.destroy();
            });
        // });
        console.log('contar2 activado');
    });

    /*Funcion que se ejecuta cuando se detecta un mensaje 
    con proposito de getPregunta y regresa el query de preguntas al cliente*/
    socket.on('getPregunta', (msg) => {
        var r = msg;
        console.log("Mensaje que el cliente regreso de id pregunta: " + msg);
        // con2.connect(function(err) {
            // if (err) throw err;
            console.log("Connected!");
            var sql = "SELECT * FROM `pregunta` WHERE id = '" + r +"' AND answered = 0";
            con2.query(sql, function (err, result,fields) {
            if (err) throw err;
            console.log("se hizo la consulta get pregunta");
            console.log(result);
            var resultado = {id: result[0].id, pregunta: result[0].pregunta, idrespuesta: result[0].idrespuesta,
            answered: result[0].answered, rutaImagen: result[0].rutaImagen }
            console.log(resultado);
            io.emit('getPreguntaR', result[0].id, result[0].pregunta, result[0].idrespuesta, result[0].answered,
            result[0].rutaImagen ); 
            //con2.destroy();
            });
        // });
        console.log('get pregunta activado');
    });

    /*Funcion que se ejecuta cuando se detecta un mensaje 
    con proposito de getRespuesta y regresa el query de respuestas al cliente*/
    socket.on('getRespuesta', (msg) => {
        var r = msg;
        console.log("Mensaje que el cliente regreso de id respuesta: " + msg);
        // con2.connect(function(err) {
            // if (err) throw err;
            console.log("Connected!");
            var sql = "SELECT * FROM `respuesta` WHERE idpregunta = '" + msg + "'";
            con2.query(sql, function (err, result,fields) {
            if (err) throw err;
            console.log("se hizo la consulta get respuesta");
            console.log(result);
            var resultado = {id: result[0].id, respuesta: result[0].respuesta, idpregunta: result[0].idpregunta}
            console.log(resultado);
            io.emit('getRespuestaR', 
            result[0].id, result[0].respuesta, result[0].idpregunta,
            result[1].id, result[1].respuesta, result[1].idpregunta, 
            result[2].id, result[2].respuesta, result[2].idpregunta,
            result[3].id, result[3].respuesta, result[3].idpregunta); 
            //con2.destroy();
            });
        // });
        console.log('get pregunta activado');
    });

    /*Funcion que se ejecuta cuando se detecta un mensaje 
    con proposito de answer y regresa el query de respuesta correcta al cliente*/
    socket.on('answer', (msg) => {
        var r = msg;
        console.log("Mensaje que el cliente regreso de id answer: " + r);
        // con2.connect(function(err) {
            // if (err) throw err;
            console.log("Connected!");
            var sql = "SELECT * FROM `pregunta` WHERE idrespuesta = (SELECT id FROM `respuesta` WHERE id = "+ r +")";
            con.query(sql, function (err, result,fields) {
            if(err) {
                return console.log('Error1');
            } else if (!result.length) {     
                io.emit('getAnswerR', 'e','', '', '', '');                                            
                return console.log('Error2');
            } else if (!result[0].id) {
                io.emit('getAnswerR', 'e','', '', '', '');            
                return console.log('Error3');
            }
            else {
                console.log("se hizo la consulta answer");
                console.log(result);
                var resultado = {id: result[0].id, pregunta: result[0].pregunta, idrespuesta: result[0].idrespuesta,
                answered: result[0].answered, rutaImagen: result[0].rutaImagen}
                console.log( "resultado objeto de consulta answer" + resultado);
                io.emit('getAnswerR', 
                result[0].id, result[0].pregunta, result[0].idrespuesta,
                result[0].answered, result[0].rutaImagen);    
            }
            //con2.destroy();
            });
        // });
        console.log('answer activado');
    });
    

});

//Funcion que escucha el server en el puerto 3000 o 8080
server.listen(3000, () => {
  console.log('listening on *:3200 or 8080');
});


