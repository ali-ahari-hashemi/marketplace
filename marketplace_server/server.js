var express = require('express');
var http = require('http')
var socketio = require('socket.io');

var app = express();
var server = http.Server(app);
var io = socketio(server);

const port = 8080;

server.listen(port, () => console.log('listening on *:8080'));

// The event will be called when a client is connected.
io.on('connection', (socket) => {
  console.log('A client just joined on', socket.id);

  // Validate login
  socket.on("validateLogin", (data) => {
    // This is where java program to validate login will be called
    console.log(data.username);
    console.log(data.password);

    // Send user ID to client if valid
    const validUserLogin = true; // TODO set this based on java program
    const userID = 1; // TODO set this based on java program

    if (validUserLogin) { socket.emit("validUser", userID); }
    else { socket.emit("invalidUser")}
  });

  // Getting cards for client
  socket.on("getCards", (userID) => {
    const cards = require('./testFiles/cards.json'); // TODO set this based on java program
    socket.emit("sendCards", cards);
  });

  // Socket Disconnected
  socket.on("disconnect", () => {
    console.log("A client just disconnected", socket.id);
  });
});
