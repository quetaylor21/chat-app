// io initiates a request and create connection
var socket = io();
socket.on('connect', function() {
  console.log('Connected to server');
});
socket.on('disconnect', function() {
  console.log('disconnected from server');
});

socket.on('newMessage', function(message) {
  const formattedTime = moment(message.createdAt).format('h:mm a');
  var li = $('<li></li>');
  li.text(`${message.from} ${formattedTime}: ${message.text}`);
  $('#messages').append(li);
  console.log('New Message', message);
});

socket.on('newLocationMessage', function(message) {
  const formattedTime = moment(message.createdAt).format('h:mm a');
  var li = $('<li></li>');
  var a = $('<a target="_blank">My Current Location</a>');
  li.text(`${message.from} ${formattedTime}: `);
  a.attr('href', message.url);
  li.append(a);
  $('#messages').append(li);
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
    }
  );
});

var locationButton = $('#sendlocation');

locationButton.on('click', function() {
  if (!navigator.geolocation) {
    return alert('Geoloaction not supported by your browser');
  }
  locationButton.attr('disabled', 'disabled').text('Sending Location');

  var location = navigator.geolocation.getCurrentPosition(
    function(position) {
      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
      locationButton.removeAttr('disabled').text('Send Location');
    },
    function() {
      locationButton.removeAttr('disabled').text('Send Location');
      alert('Unable to fetch location');
    }
  );
});
