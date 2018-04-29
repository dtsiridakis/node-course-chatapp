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

	//socket.emit from: Admin text: Welcome to the chat app
	socket.emit('newMessage', {
		from: 'Admin',
		text: 'Welcom to the Chat app'
	});
	//socket.broadcast.emit from: Admin text: New user joint
	socket.broadcast.emit('newMessage', {
		from: 'Admin',
		text: 'New User JOINT'
	});

// Register a CUSTOM "emit event" to send to our client
 	// socket.emit('newMessage', {
 	// 	from: 'james',
 	// 	text: 'Are you here ?',
 	// 	createdAt: 123
 	// });

// Register a CUSTOM 'listen event' from pure created data from client's
	socket.on('createMessage', (message) => {
		console.log('createMessage', message);
//Here the Server listen's everyone connection.
//Let's now send to every connection the data ALSO AND SAME CLIENT WHO CREATES IT
		io.emit('newMessage', {
			from: message.from,
			text: message.text,
			createdAt: new Date().getTime()
		});
//Let's now send to every connection the data WITHOUT CLIENT WHO CREATES IT!
		// socket.broadcast.emit('newMessage', {
		// 	from: message.from,
		// 	text: message.text,
		// 	createdAt: new Date().getTime()
		// });
	});

// Register a BUILT IN "listen event" when the client log's out.
	socket.on('disconnect', () => {
		console.log('User disconnected');
	});
});


server.listen(port, () => { // Instead app.listen 
	console.log(`Server is up on port ${port}`);
});


