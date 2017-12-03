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
      socket.on('disconnect', () => {
        console.log('Client disconnected');
      })
    });



    app.use(express.static(publicPath));

    // is calling http.createServer()
    server.listen(port, () => {
      console.log(`Server up on ${port}`);
    })
