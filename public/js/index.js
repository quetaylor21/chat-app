// io initiates a request and create connection
var socket = io();
socket.on('connect', function() {
  console.log('Connected to server');
});
socket.on('disconnect', function() {
  console.log('disconnected from server');
});

socket.on('newMessage', function(message) {
  document.getElementById('app').innerHTML = message.from;
  console.log('New Message', message);
});

socket.on('');
