const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', () => {
	const isNumber = convertedValue => {
		assert.isNotNull(convertedValue, 'converted value is not null');
		assert.isDefined(convertedValue, 'converted value is not undefined');

		assert.isNumber(convertedValue, 'converted value is a number');
	};

	suite('Parsing input numbers', () => {
		test('Test - a whole number input can be correctly processed', () => {
			const spelledResult = convertHandler.split('3mi');
			const num = convertHandler.getNum(spelledResult?.num);

			isNumber(num);
			assert.strictEqual(num, 3, 'a whole input number is a whole number');
		});

		test('Test - a decimal number input can be correctly processed', () => {
			const spelledResult = convertHandler.split('3.7L');
			const num = convertHandler.getNum(spelledResult?.num);

			isNumber(num);
			assert.strictEqual(num, 3.7, 'a decimal input number is a decimal number');
		});

		test('Test - a fractional number input can be correctly processed', () => {
			const spelledResult = convertHandler.split('1/2gal');
			const num = convertHandler.getNum(spelledResult?.num);

			isNumber(num);
			assert.strictEqual(num, 0.5, 'a fractional input number is a fractional number');
		});

		test('Test - a double fraction number is returned as null', () => {
			const spelledResult = convertHandler.split('3/2/3km');
			const num = convertHandler.getNum(spelledResult?.num);

			assert.isNull(num, 'a double fraction input number is processed as null');
		});

		test('Test - a default number is shown when no input number is provided', () => {
			const spelledResult = convertHandler.split('lbs');
			const num = convertHandler.getNum(spelledResult?.num);

			isNumber(num);
			assert.strictEqual(num, 1, 'input number defaults to 1 when no input is provided');
		});
	});

	suite('Parsing input units', () => {
		test('Test - a input unit can be correctly processed', () => {
			const spelledResult = convertHandler.split('3MI');
			const unit = convertHandler.getUnit(spelledResult?.unit);

			assert.isString(unit, 'input unit is a string');
			assert.strictEqual(unit, 'mi', 'a valid input is read correctly');
		});

		test('Test - an incorrect input unit should return null', () => {
			const spelledResult = convertHandler.split('5aBc');
			const unit = convertHandler.getUnit(spelledResult?.unit);

			assert.isNull(unit, 'an incorrect input unit returns null');
		});
	});

	suite('Parsing return units', () => {
		test('Test - a return unit can be correctly processed', () => {
			const spelledResult = convertHandler.split('8gal');
			const initUnit = convertHandler.getUnit(spelledResult?.unit);
			const returnUnit = convertHandler.getReturnUnit(initUnit);

			assert.isString(returnUnit, 'return unit is a string');
			assert.strictEqual(returnUnit, 'L', 'gal correctly converts to L');
		});
	});

	suite('Processing spelled out units', () => {
		test('Test - a unit can be correctly spelled out', () => {
			const spelledResult = convertHandler.split('12km');
			const initUnit = convertHandler.getUnit(spelledResult?.unit);
			const returnUnit = convertHandler.getReturnUnit(initUnit);

			const initUnitSpelledOut = convertHandler.spellOutUnit(initUnit);
			const returnUnitSpelledOut = convertHandler.spellOutUnit(returnUnit);

			assert.isString(initUnitSpelledOut, 'initial spelled out unit is a string');
			assert.isString(returnUnitSpelledOut, 'return spelled out unit is a string');

			assert.strictEqual(
				initUnitSpelledOut,
				'kilometers',
				'km is correctly spelled out as kilometers'
			);
			assert.strictEqual(
				returnUnitSpelledOut,
				'miles',
				'mi is correctly spelled out as miles'
			);
		});
	});

	suite('Conversions', () => {
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
