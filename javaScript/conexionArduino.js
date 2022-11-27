//Mensaje que se enviara a la pagina
let mensaje = "";
//libreria de conexion de arduino
var five = require("johnny-five"),
//Definicion de la placa y boton en Johnny Five
board, button;
//Objeto de placa para Johny five
board = new five.Board();
//Funcion que se hara cuando la placa este lista
board.on("ready", function() {
// Crear una nueva instancia de 'button' de hardware.
buttonA = new five.Button(2);
buttonB = new five.Button(3);
buttonC = new five.Button(4);
buttonD = new five.Button(5);
// Inyecta el hardware 'boton' dentro
// el Repl de la instancia del contexto;
// permite acceso de linea de comando directo
board.repl.inject({
    buttonA: button,
    buttonB: button,
    buttonC: button,
    buttonD: button
});

// "up" el boton A en este caso es presionado
buttonA.on("up", function() {
    console.log("up 1");
    mensaje = "up 1";
    mensaje = "boton1";
    io.emit('respuesta', mensaje );
});
// "up" el boton B en este caso es presionado
buttonB.on("up", function() {
    console.log("up 2");
    mensaje = "up 2";
    mensaje = "boton2";
    io.emit('respuesta', mensaje );
});
// "up" el boton C en este caso es presionado
buttonC.on("up", function() {
    console.log("up 3");
    mensaje = "up 3";
    mensaje = "boton3";
    io.emit('respuesta', mensaje );
});
// "up" el boton D en este caso es presionado
buttonD.on("up", function() {
    console.log("up 4");
    mensaje = "up 4";
    mensaje = "boton4";
    io.emit('respuesta', mensaje );
});
});

//Creacion de objeto para comunicacion de arduino con html y javascript
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

//Funcion que automaticamente redigige a una pagina
app.get('/', (req, res) => {
    res.sendFile('E:/Github/Quiz/Quiz/index.html');
});

//Funcion que hace cuando se detecta conexion
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

//Funcion que escucha el puerto 3200 o 8080
server.listen(3200, () => {
  console.log('listening on *:3200 or 8080');
});

