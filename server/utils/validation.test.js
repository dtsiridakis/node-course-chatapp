const expect = require('expect');
const {isRealString} = require('./validation');

describe('isRealString', () => {
	it('Should reject non-string values', () => {
		var num = 5;
		var res = isRealString(num);
		expect(res).toBe(false);
	});

	it('Should reject string with only spaces', () => {
		var spaces = "         ";
		var res = isRealString(spaces);
		expect(res).toBe(false);
	});

	it('Should allow string with non spacing characters', () => {
		var char = "     OMG    ";
		var res = isRealString(char);
		expect(res).toBe(true);
	});
});