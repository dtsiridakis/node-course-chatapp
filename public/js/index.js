var socket = io(); // This method comes from the above library initiates a new web socket persistent open connection.
		
// Register a BUILT IN "listen event" for a new connection from the client side.
socket.on('connect', function () { //We dont' pass any argument
	console.log('Connected to server');

// Register a BUILT IN "emit event" when the client creates data.
	// socket.emit('createMessage', {
	// 	from: 'Mara',
	// 	text: 'Yes i am available!',
	// });
});

// Register a BUILT IN "listen event" when server is down.
socket.on('disconnect', function () {
	console.log('Disconnected from server');
});

//Register a custom 'listen event' when server sends data
socket.on('newMessage', function (message) {
	console.log('You have new message', message);

	var li = $('<li></li>').text(`${message.from}: ${message.text}`);
	$('#messages').append(li);
});

//jQuery DOM manip. with submit event listener and event arg.
$('#message-form').submit(function (event) {
	event.preventDefault();

	socket.emit('createMessage', {
		from: 'User',
		text: $('[name="message"]').val(), // We select via input attribute
	}, function () {}); // Aknowledgement setup
});