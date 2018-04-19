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
    var userID = parseInt(output);

    if (userID != -1) { socket.emit("validUser", userID); }
    else { socket.emit("invalidUser")}
  });

  // Validate Signup
  socket.on("validateSignup", (data) => {
    var output = jre.spawnSync(
      ['./lib/SignUp.jar'],
      'authentication.SignUp',
      [data.username, data.password, data.firstname, data.lastname],
      { encoding: 'utf8' }
    ).stdout.trim();
    var userID = parseInt(output);

    if (userID != -1) { socket.emit("validUser", userID); }
    else { socket.emit("invalidUser")}
  });

  // Get user object associated with given userID
  socket.on("getUser", (userID) => {
    console.log("getuser", userID);
    var output = jre.spawnSync(
      ['./lib/GetUser.jar'],
      'user.GetUser',
      [userID],
      { encoding: 'utf8' }
    ).stdout.trim();
    const user = JSON.parse(output);
    socket.emit("sendUser", user);
  });

  // Add Card
  socket.on("addCard", (data) => {
    console.log(data);
    var output = jre.spawnSync(
      ['./lib/AddCard.jar'],
      'cards.AddCard',
      [data.userID, data.card.price, '0', data.card.imageURL, data.card.itemName],
      { encoding: 'utf8' }
    ).stderr.trim();
  });

  // Get cards for client
  socket.on("getCards", (userID) => {
    var output = jre.spawnSync(
      ['./lib/GetCards.jar'],
      'cards.GetCards',
      [userID],
      { encoding: 'utf8' }
    ).stdout.trim();
    const cards = JSON.parse(output);
    socket.emit("sendCards", cards);
  });

  socket.on("swipe", (data) => {
    var output = jre.spawnSync(
      ['./lib/Swipe.jar'],
      'cards.Swipe',
      [data.userID1, data.userID2, data.cardID, data.swipeDirection],
      { encoding: 'utf8' }
    ).stderr.trim();
  });

  // Get conversations of client
  socket.on("getConversations", (userID) => {
    var output = jre.spawnSync(
      ['./lib/GetConversations.jar'],
      'messages.GetConversations',
      [userID],
      { encoding: 'utf8' }
    ).stdout.trim();
    //console.log(output);
    const conversations = JSON.parse(output);
    socket.emit("sendConversations", conversations);
  });

  // Get messages for the given userID
  socket.on("getMessages", (data) => {
    var output = jre.spawnSync(
      ['./lib/GetMessages.jar'],
      'messages.GetMessages',
      [data.userID1, data.userID2],
      { encoding: 'utf8' }
    ).stdout.trim();
    //console.log(output);
    var messages = JSON.parse(output);
    socket.emit("sendMessages", messages);
  });

  // Client sends message to other user. Data in the form {userID1, userID2, message}
  socket.on("sendMessage", (data) => {
    var output = jre.spawnSync(
      ['./lib/SendMessage.jar'],
      'messages.SendMessage',
      [data.userID1, data.userID2, data.cardID, data.timestamp, data.message],
      { encoding: 'utf8' }
    ).stderr.trim();
    //console.log(output);
  });

  // Update bio
  socket.on("updateBio", (data) => {
    var userJsonString = JSON.stringify(data.user);
    var userJsonStringForInput = userJsonString.replace(/"/g, '\"');
    var output = jre.spawnSync(
      ['./lib/UpdateBio.jar'],
      'user.UpdateBio',
      [data.userID, userJsonStringForInput],
      { encoding: 'utf8' }
    ).stdout.trim();
    //console.log(output);
  });

  // Update password
  socket.on("updatePassword", (data) => {
    var output = jre.spawnSync(
      ['./lib/UpdatePass.jar'],
      'user.UpdatePass',
      [data.userID, data.oldPassword, data.newPassword],
      { encoding: 'utf8' }
    ).stdout.trim();
    //console.log(output);
    var result = parseInt(output);
    if (result == 1) { socket.emit("validUpdatePassword"); }
    else { socket.emit("invalidUpdatePassword"); }
  });

  // Socket Disconnected
  socket.on("disconnect", () => {
    console.log("A client just disconnected", socket.id);
  });
});
