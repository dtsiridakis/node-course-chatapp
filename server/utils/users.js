// data structure 

// [{
// 	id: 'dsa213@#$',
// 	name: 'dimitrios',
// 	room: 'Office place'
// }]

// Four basic methods

// addUser(id, name, room);
// removeUser(id);
// getUser(id);
// getUserList(room);

//ES6 Classes and constructors
// Remember don't need , beetween functions


class Users {
	constructor () {
		this.users = [];
	}
	addUser (id, name, room) {
		var user = {id, name, room};
		this.users.push(user);
		return user;
	}
	removeUser (id) {
		var removedUser = this.getUser(id);
		
		if(removedUser) {
			this.users = this.users.filter((user) => user.id !== id );
		}
		
		return removedUser;
	}
	getUser(id) {
		return this.users.filter((user) => user.id === id )[0];
	}
	getUserList(room) {
		var usersList = this.users.filter((user) => user.room === room );
		var names = usersList.map((user) => user.name);
		return names;
	}

};

module.exports = {Users};