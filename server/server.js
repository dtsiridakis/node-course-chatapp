const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

//We  shorten the path with the above method
const publicPath = path.join(__dirname + '/../public');
const port = process.env.PORT || 3000;
const app = express();

const server = http.createServer(app); //Create a server
const io = socketIO(server); // We pass the server that we want to use.

app.use(express.static(publicPath));


// Register a BUILT IN "listen event" for a new connection with a client
io.on('connection', (socket) => {
	console.log('New user connected');

// Register a CUSTOM "emit event" to send to our client
 	socket.emit('newMessage', {
 		from: 'james',
 		text: 'Are you here ?',
 		createdAt: 123
 	});

// Register a CUSTOM 'listen event' from pure created data from client's
	socket.on('createMessage', (newMessage) => {
		console.log('createMessage', newMessage);
	});

// Register a BUILT IN "listen event" when the client log's out.
	socket.on('disconnect', () => {
		console.log('User disconnected');
	});
});


server.listen(port, () => { // Instead app.listen 
	console.log(`Server is up on port ${port}`);
});


