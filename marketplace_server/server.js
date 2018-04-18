var express = require('express');
var http = require('http')
var socketio = require('socket.io');

var app = express();
var server = http.Server(app);
var io = socketio(server);

var jre = require('node-jre');
const port = 8080;

server.listen(port, () => console.log('listening on *:8080'));

// The event will be called when a client is connected.
io.on('connection', (socket) => {
  console.log('A client just joined on', socket.id);

  // Validate login
  socket.on("validateLogin", (data) => {
    var output = jre.spawnSync(
      ['./lib/Login.jar'],
      'authentication.Login',
      [data.username, data.password],
      { encoding: 'utf8' }
    ).stdout.trim();
    console.log(output);
    var userID = parseInt(output);

    if (userID != -1) { socket.emit("validUser", userID); }
    else { socket.emit("invalidUser")}
  });

  // Validate Signup
  socket.on("validateSignup", (data) => {
    console.log(data);
    var output = jre.spawnSync(
      ['./lib/SignUp.jar'],
      'authentication.SignUp',
      [data.username, data.password],
      { encoding: 'utf8' }
    ).stdout.trim();
    console.log(output);
    var userID = parseInt(output);

    if (userID != -1) { socket.emit("validUser", userID); }
    else { socket.emit("invalidUser")}
  });

  // Get user object associated with given userID
  socket.on("getUser", (userID) => {
    console.log(userID);
    var output = jre.spawnSync(
      ['./lib/GetUser.jar'],
      'user.GetUser',
      [userID],
      { encoding: 'utf8' }
    ).stdout.trim();
    console.log(output);
    const user = JSON.parse(output);
    socket.emit("sendUser", user);
  });


  // Add Card
  socket.on("addCard", (data) => {

  });

  // Get cards for client
  socket.on("getCards", (userID) => {
    var output = jre.spawnSync(
      ['./lib/GetCards.jar'],
      'cards.GetCards',
      [userID],
      { encoding: 'utf8' }
    ).stdout.trim();
    //console.log(output);

    const cards = JSON.parse(output);
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

  // Update bio
  socket.on("updateBio", (data) => {
    var userJsonString = JSON.stringify(data.user);
    console.log(userJsonString);
    var userJsonStringForInput = userJsonString.replace(/"/g, '\"');

    var output = jre.spawnSync(
      ['./lib/UpdateBio.jar'],
      'user.UpdateBio',
      [data.userID, userJsonStringForInput],
      { encoding: 'utf8' }
    ).stderr.trim();
    console.log(output);

  });

  // Socket Disconnected
  socket.on("disconnect", () => {
    console.log("A client just disconnected", socket.id);
  });
});
