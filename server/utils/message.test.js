const expect = require('expect');
const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
	it('should generate the correct message object', () => {
		var from = 'tsirik';
		var text = 'Hi there!';
		var message = generateMessage(from, text);

		expect(message.from).toBe(from);
		expect(message.text).toBe(text);
		expect(message.createdAt).toBeA('number');
	});
});

describe('generateLocationMessage', () => {
	it('Should generate correct location object', () => {
		var message = generateLocationMessage('Admin', 1, 0);

		expect(message.from).toBe('Admin');
		expect(message.createdAt).toBeA('number');
		expect(message.url).toBe('https://www.google.com/maps?q=1,0');
	});
});