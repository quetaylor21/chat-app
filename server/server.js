// path is  built in module
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname, '../public');
const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');

const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
// takes one argument... the server
var io = socketIO(server);
var users = new Users();
//lets you register a listener
io.on('connection', socket => {

  socket.on('join', ({name, room}, callback) => {
    if(!isRealString(name) || !isRealString(room)){
      return callback('Name and room name are required')
    }
    // joins room with name `${name}`
    const user = {
      id: socket.id,
      name,
      room
    }
    socket.join(room);
    users.removeUser(socket.id);
    users.addUser(user);
    io.to(room).emit('updateUserList', users.getUserList(room) )
    // socket.leave(room) would leave the current room

    // io.emit emits to every connected user
    // io.emit => io.to(name)
    // socket.broadcast.emit emits to every other person connected to socket server
    // but the sender
    // socket.broadcast.emit => socket.broadcast.to(name)
    //socket.emit emits an event specifcally to one user

    // welcome the user that just connected
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to Quin\'s chat app'));

    // Let all users know that a new user joined
    // broadcast makes sure that everyone but the sender
    // gets the message
    socket.broadcast.to(room).emit(
      'newMessage',
      generateMessage('Admin', `${name} has joined`)
    );

    callback();
  })

  socket.on('createMessage', ({ text }, callback) => {
    const {name, room} = users.getUser(socket.id);
    // io.emit emits a message to every connection
    if(name && isRealString(text))
    io.to(room).emit('newMessage', generateMessage(name, text));
    callback('This is from the server');
  });

  socket.on('createLocationMessage', ({ latitude, longitude }) => {
    const {name, room} = users.getUser(socket.id);
    if(name)
    io.to(room).emit(
      'newLocationMessage',
      generateLocationMessage(name, latitude, longitude)
    );
  });

  socket.on('disconnect', () => {
    const {name, room} = users.removeUser(socket.id);
    io.to(room).emit('updateUserList', users.getUserList(room))
    io.to(room).emit('newMessage', generateMessage('Admin', `${name} has left.`))
  });
});

app.use(express.static(publicPath));

// is calling http.createServer()
server.listen(port, () => {
  console.log(`Server up on ${port}`);
});
