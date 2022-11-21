let mensaje = "";
var five = require("johnny-five"),
board, button;
board = new five.Board();
board.on("ready", function() {
// Create a new `button` hardware instance.
// This example allows the button module to
// create a completely default instance
buttonA = new five.Button(2);
buttonB = new five.Button(3);
buttonC = new five.Button(4);
buttonD = new five.Button(5);
// Inject the `button` hardware into
// the Repl instance's context;
// allows direct command line access
board.repl.inject({
    buttonA: button,
    buttonB: button,
    buttonC: button,
    buttonD: button
});
// Button Event API
// "down" the button is pressed
// buttonA.on("down", function() {
//     console.log("down");
   
// });
// "hold" the button is pressed for specified time.
//        defaults to 500ms (1/2 second)
//        set
// buttonA.on("hold", function() {
//     console.log("hold");
//     mensaje = "down";
// });
// "up" the button is released
buttonA.on("up", function() {
    console.log("up 1");
    mensaje = "up 1";
    mensaje = "boton1";
    io.emit('respuesta', mensaje );
});
buttonB.on("up", function() {
    console.log("up 2");
    mensaje = "up 2";
    mensaje = "boton2";
    io.emit('respuesta', mensaje );
});
buttonC.on("up", function() {
    console.log("up 3");
    mensaje = "up 3";
    mensaje = "boton3";
    io.emit('respuesta', mensaje );
});
buttonD.on("up", function() {
    console.log("up 4");
    mensaje = "up 4";
    mensaje = "boton4";
    io.emit('respuesta', mensaje );
});
});



const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile('E:/Github/Quiz/Quiz/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    // socket.on('respuesta', (botonenvio) => {
    //   console.log('se recivio del cliente: ' + botonenvio);
    // });
    // io.emit('respuesta', { someProperty: '1', otherProperty: 'other value' }); // This will emit the event to all connected socket
    // // if(botonaux!=boton){
    //     io.emit('respuesta', { respuesta: boton }); // This will emit the event to all connected sockets
    // }
    // socket.on('activador', msg => {
    // //   io.emit('chat message', msg);
    //     //var mensaje = parseInt(boton);
    //     //console.log("boton: " . mensaje);
    //     mensaje = mensaje.toString();
    //     io.emit('respuesta', mensaje );
    // });
});

server.listen(3200, () => {
  console.log('listening on *:3200 or 8080');
});

