// io initiates a request and create connection
  var socket = io();
  socket.on('connect', function () {
    console.log('Connected to server');
    socket.emit('createEmail', {
      to: "quin@email.com",
      text: "some sample text",
      date: 'today'
    })

    socket.emit('createMessage', {
      from: "Quin",
      text: "Hey there Sam"
    })
  })
  socket.on('disconnect', function () {
    console.log('disconnected from server');
  })

  socket.on('newEmail', function(email) {
    console.log('New Email');
    console.log(email);
  })

  socket.on('newMessage', function(message) {
    document.getElementById('app').innerHTML = message.text
    console.log('New Message', message);
  })

  socket.on('')
