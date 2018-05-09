const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {
	var users;

	beforeEach(() => {
		users = new Users;
		users.users = [{
			id: '1',
			name: 'Dimitrios',
			room: 'Node course'
		},{
			id: '2',
			name: 'Mara',
			room: 'React course'
		},{
			id: '3',
			name: 'Vangelis',
			room: 'Node course'
		}];
	});


	it('Should create new users and rooms', () => {
		var users = new Users;
		var user = {
			id: '123abc',
			name: 'james',
			room: 'work'
		};
		var resUser = users.addUser(user.id, user.name, user.room);

		expect(users.users).toEqual([user]);
	});

	it('Should return the names contained on room', () => {
		var resUser = users.getUserList('Node course');

		expect(resUser).toEqual(['Dimitrios', 'Vangelis']);
	});

	it('Should return and delete user from array', () => {
		var resUser = users.removeUser('2');
		expect(users.users.length).toBe(2);
		expect(resUser.id).toBe('2');
	});

	it('Should not delete user with wrong id', () => {
		var resUser = users.removeUser('22222');
		expect(users.users.length).toBe(3);
		expect(resUser).toNotExist();	
	});

	it('Should find user with id', () => {
		var resUser = users.getUser('1');
		expect(resUser).toEqual(users.users[0]);	
	});

	it('Should not find user with wrong id', () => {
		var resUser = users.getUser('232');
		expect(resUser).toNotExist();	
	});

});