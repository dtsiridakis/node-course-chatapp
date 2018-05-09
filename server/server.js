const path              = require('path');
const express           = require('express');
const socketIO          = require('socket.io');
const http              = require('http');
const queryString       = require('query-string');

const {Users} = require('./utils/users');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');

//We  shorten the path with the above method
const publicPath        = path.join(__dirname + '/../public');
const port              = process.env.PORT || 3000;
const app               = express();

const server            = http.createServer(app); //Create a server
const io                = socketIO(server); // We pass the server that we want to use.
const users             = new Users;

app.use(express.static(publicPath));


// Register a BUILT IN "listen event" for a new connection with a client
io.on('connection', (socket) => {
	console.log('New user connected');

	socket.on('join', (urlParams, callback) => {
		var params = queryString.parse(urlParams);
		if(!isRealString(params.name) || !isRealString(params.room)) {
			return callback('Name and channel are required');
		}

		socket.join(params.room);
		users.removeUser(socket.id);
		users.addUser(socket.id, params.name, params.room);

		//Emit to all users inside the room
		io.to(params.room).emit('updateUserList', users.getUserList(params.room));
		// socket.leave(params.room) leave us from the room

		//socket.emit from: Admin text: Welcome to the chat app
		socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat app'));
		//socket.broadcast.emit but only at a specific room!
		socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined!`));

		callback();
	});


// Register a CUSTOM 'listen event' from pure created data from client's
	socket.on('createMessage', (message, callback) => {
//Here the Server listen's everyone connection.
//Let's now send to every connection the data ALSO AND SAME CLIENT WHO CREATES IT
		io.emit('newMessage', generateMessage(message.from, message.text));
		callback();
	});

	socket.on('createLocationMessage', (coords) => {
		io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
	});

// Register a BUILT IN "listen event" when the client log's out.
	socket.on('disconnect', () => {
		//The removeUser function return back the removed data
		var user = users.removeUser(socket.id);

		//So if someone has removed we can do 
		if(user) {
			io.to(user.room).emit('updateUserList', users.getUserList(user.room));
			io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
		}
	});
});


server.listen(port, () => { // Instead app.listen 
	console.log(`Server is up on port ${port}`);
});


