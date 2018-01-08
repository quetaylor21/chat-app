// io initiates a request and create connection
var socket = io();
socket.on('connect', function() {
  console.log('Connected to server');
});
socket.on('disconnect', function() {
  console.log('disconnected from server');
});

socket.on('newMessage', function(message) {
  var li = $('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  $('#messages').append(li);
  console.log('New Message', message);
});

$('#message-form').submit(function(ev) {
  ev.preventDefault();
  var text = $('#message').val();
  socket.emit(
    'createMessage',
    {
      from: 'Quin',
      text
    },
    function(message) {
      $('#message').val('');
      console.log(message);
    }
  );
});
