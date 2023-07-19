const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
	suite('Conversions', () => {
		const isNumber = convertedValue => {
			assert.isNotNull(convertedValue, 'converted value is not null');
			assert.isDefined(convertedValue, 'converted value is not undefined');

			assert.isNumber(convertedValue, 'converted value is a number');
		};

		test('Test - gallons to litres conversion is working', () => {
			const convertedValue = convertHandler.convert(2, 'gal');

			isNumber(convertedValue);
			assert.strictEqual(convertedValue, 7.57082, 'gal to L conversion is working');
		});

		test('Test - litres to gallons conversion is working', () => {
			const convertedValue = convertHandler.convert(5, 'L');

			isNumber(convertedValue);
			assert.strictEqual(convertedValue, 1.32086, 'L to gal conversion is working');
		});

		test('Test - miles to kilometers conversion is working', () => {
			const convertedValue = convertHandler.convert(26.21, 'mi');

			isNumber(convertedValue);
			assert.strictEqual(convertedValue, 42.1808, 'mi to km conversion is working');
		});

		test('Test - kilometers to miles conversion is working', () => {
			const convertedValue = convertHandler.convert(42.195, 'km');

			isNumber(convertedValue);
			assert.strictEqual(convertedValue, 26.21882, 'km to mi conversion is working');
		});

		test('Test - pounds to kilograms conversion is working', () => {
			const convertedValue = convertHandler.convert(224, 'lbs');

			isNumber(convertedValue);
			assert.strictEqual(convertedValue, 101.60461, 'lbs to kg conversion is working');
		});

		test('Test - kilograms to pounds conversion is working', () => {
			const convertedValue = convertHandler.convert(155.77, 'kg');

			isNumber(convertedValue);
			assert.strictEqual(convertedValue, 343.41435, 'kg to lbs conversion is working');
		});
	});
});
