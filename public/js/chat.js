var socket = io(); // This method comes from the above library initiates a new web socket persistent open connection.

// Custom Scrolling function
function scrollToBottom () {
	//Selectors
	var messages   = $('#messages'); // The order list
	var newMessage = messages.children('li:last-child');
	//Heights
	var clientHeight = messages.prop('clientHeight');
	var scrollTop = messages.prop('scrollTop');
	var scrollHeight = messages.prop('scrollHeight');
	var newMessageHeight = newMessage.innerHeight();
	//.prev() selects the previews of this
	var lastMessageHeight = newMessage.prev().innerHeight();

	if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
		messages.scrollTop(scrollHeight);
		console.log(`${clientHeight} + ${scrollTop} + ${newMessageHeight} + ${lastMessageHeight} >= ${scrollHeight} `);
	} else {
		console.log(`${clientHeight} + ${scrollTop} + ${newMessageHeight} + ${lastMessageHeight} <= ${scrollHeight} `);
	};
};



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
	var formattedTime = moment(message.createdAt).format('HH:mm');
	// Selecting the script template and keep the html files
	var template = $('#message-template').html();
	// Use it on Moustache method
	var html = Mustache.render(template, {
		text: message.text,
		from: message.from,
		createdAt: formattedTime
	});

	$('#messages').append(html);
	scrollToBottom();


	// var formattedTime = moment(message.createdAt).format('HH:mm');

	// var li = $('<li></li>').text(`${message.from} ${formattedTime}: ${message.text}`);
	// $('#messages').append(li);
});

//Register a custom 'listen event' when server sends data
socket.on('newLocationMessage', function (locationMessage) {
	var formattedTime = moment(locationMessage.createdAt).format('HH:mm');
	// Selecting the script template
	var template = $('#location-message-template').html();
	// Use it on Moustache method
	var html = Mustache.render(template, {
		from: locationMessage.from,
		url: locationMessage.url,
		createdAt: formattedTime
	});

	$('#messages').append(html);
	scrollToBottom();

	// var li = $('<li></li>');
	// var a = $('<a target= "_blank">Check my location</a>');

	// li.text(`${locationMessage.from} ${formattedTime}: `);
	// a.attr('href', locationMessage.url);
	// li.append(a);

	// $('#messages').append(li);
});

//jQuery DOM manip. with submit event listener and event arg.
$('#message-form').submit(function (event) {
	event.preventDefault();

	var messageTextbox = $('[name="message"]');
	socket.emit('createMessage', {
		from: 'User',
		text: messageTextbox.val(), // We select via input attribute
	}, function () {  // Aknowledgement 
		messageTextbox.val('');
	});
});

//jQuery DOM manip. to set the geolocation button
var locationButton = $('#send-location');

locationButton.on('click', function () {
	if(!navigator.geolocation) { // Global on all browser the geolocation object
		return alert('Your Browser is not supported by your browser');
	}

	locationButton.attr('disabled', 'disabled').text('Sending location...');
	// This function takes 2 functions as args for success and handling according MDN docs.
	navigator.geolocation.getCurrentPosition(function (position) {
		locationButton.removeAttr('disabled').text('Send location');
		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});
	}, function () {
		locationButton.attr('disabled', 'disabled');
		alert('Unable to fetch location');
	});
});

