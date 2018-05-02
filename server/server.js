const path              = require('path');
const express           = require('express');
const socketIO          = require('socket.io');
const http              = require('http');

const {generateMessage, generateLocationMessage} = require('./utils/message');

//We  shorten the path with the above method
const publicPath        = path.join(__dirname + '/../public');
const port              = process.env.PORT || 3000;
const app               = express();

const server            = http.createServer(app); //Create a server
const io                = socketIO(server); // We pass the server that we want to use.

app.use(express.static(publicPath));


// Register a BUILT IN "listen event" for a new connection with a client
io.on('connection', (socket) => {
	console.log('New user connected');

	// //socket.emit from: Admin text: Welcome to the chat app
	socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat app'));
	// //socket.broadcast.emit from: Admin text: New user joint
	socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));


// Register a CUSTOM 'listen event' from pure created data from client's
	socket.on('createMessage', (message, callback) => {
		console.log('createMessage', message);
//Here the Server listen's everyone connection.
//Let's now send to every connection the data ALSO AND SAME CLIENT WHO CREATES IT
		io.emit('newMessage', generateMessage(message.from, message.text));
		callback('From the server');
	});

	socket.on('createLocationMessage', (coords) => {
		io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
	});

// Register a BUILT IN "listen event" when the client log's out.
	socket.on('disconnect', () => {
		console.log('User disconnected');
	});
});


server.listen(port, () => { // Instead app.listen 
	console.log(`Server is up on port ${port}`);
});


