// path is  built in module
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname, '../public');
const { generateMessage, generateLocationMessage } = require('./utils/message');

const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
// takes one argument... the server
var io = socketIO(server);
//lets you register a listener
io.on('connection', socket => {
  console.log('new user connected');

  // welcome the user that just connected
  socket.emit('newMessage', generateMessage('Admin', 'welcome new user'));

  // Let all users know that a new user joined
  // broadcast makes sure that everyone but the sender
  // gets the message
  socket.broadcast.emit(
    'newMessage',
    generateMessage('Admin', 'new user has joined')
  );

  socket.on('createMessage', ({ from, text }, callback) => {
    console.log('Create Message was called');
    // io.emit emits a message to every connection
    io.emit('newMessage', generateMessage(from, text));
    callback('This is from the server');
  });

  socket.on('createLocationMessage', ({ latitude, longitude }) => {
    io.emit(
      'newLocationMessage',
      generateLocationMessage('Quin', latitude, longitude)
    );
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

app.use(express.static(publicPath));

// is calling http.createServer()
server.listen(port, () => {
  console.log(`Server up on ${port}`);
});
