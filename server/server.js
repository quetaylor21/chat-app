    const path = require('path');
    const http = require('http');
    const express = require('express');
    const socketIO = require('socket.io');
    const publicPath = path.join(__dirname, '../public');

    const port = process.env.PORT || 3000;
    var app = express();
    var server = http.createServer(app);
    // takes one argument... the server
    var io = socketIO(server);
    //lets you register a listener
    io.on('connection', (socket) => {
      console.log('new user connected');
      //emit is creating an event
      socket.emit('newEmail', {
        from: "Drew@me.com",
        text: "Hello there Quin",
        date: 12/3/17
      });

      socket.emit('newMessage', {
        from: "Sam",
        text: "Hello there Quin",
        date: new Date().toString()
      });

      socket.on('createEmail', (data) => {
        console.log('createEmail', data);
      })

      socket.on('createMessage', (message) => {
        console.log('createMessage', message);
      })

      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });



    app.use(express.static(publicPath));

    // is calling http.createServer()
    server.listen(port, () => {
      console.log(`Server up on ${port}`);
    })
