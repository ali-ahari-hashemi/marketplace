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

    var exec = require('child_process').exec, child;
    child = exec('java -jar ./lib/test.jar',
      function (error, stdout, stderr){
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if(error !== null){
          console.log('exec error: ' + error);
        }
    });

    // Send user ID to client if valid
    const validUserLogin = true; // TODO set this based on java program
    const userID = 1; // TODO set this based on java program

    if (validUserLogin) { socket.emit("validUser", userID); }
    else { socket.emit("invalidUser")}
  });

  // Get user object associated with given userID
  socket.on("getUser", (userID) => {
    const user = require('./testFiles/user.json'); // TODO set this based on java program
    socket.emit("sendUser", user);
  });


  // Add Card
  socket.on("addCard", (data) => {

  });

  // Get cards for client
  socket.on("getCards", (userID) => {
    const cards = require('./testFiles/cards.json'); // TODO set this based on java program
    socket.emit("sendCards", cards);
  });

  // Get conversations of client
  socket.on("getConversations", (userID) => {
    const conversations = require('./testFiles/conversations.json'); // TODO set this based on java program
    socket.emit("sendConversations", conversations);
  });

  // Get messages for the given userID data: {userID1, userID2}
  socket.on("getMessages", (data) => {
    const messages = require('./testFiles/messages.json'); // TODO set this based on java program
    socket.emit("sendMessages", messages);
  });

  // Client sends message to other user. Data in the form {userID1, userID2, message}
  socket.on("sendMessage", (data) => {
    console.log(data.userID1, data.userID2, data.message);
    // TODO sendMessage java program call here to update messages for both users on database
  });

  // Socket Disconnected
  socket.on("disconnect", () => {
    console.log("A client just disconnected", socket.id);
  });
});
