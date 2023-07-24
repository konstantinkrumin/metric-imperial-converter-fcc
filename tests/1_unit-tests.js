// const chai = require('chai');
// let assert = chai.assert;
// const ConvertHandler = require('../controllers/convertHandler.js');

// let convertHandler = new ConvertHandler();

// suite('Unit Tests', () => {
// 	const isNumber = convertedValue => {
// 		assert.isNotNull(convertedValue, 'converted value is not null');
// 		assert.isDefined(convertedValue, 'converted value is not undefined');

// 		assert.isNumber(convertedValue, 'converted value is a number');
// 	};

// 	suite('Parsing input numbers', () => {
// 		test('Test - a whole number input can be correctly processed', () => {
// 			const spelledResult = convertHandler.split('3mi');
// 			const num = convertHandler.getNum(spelledResult?.num);

// 			isNumber(num);
// 			assert.strictEqual(num, 3, 'a whole input number is a whole number');
// 		});

// 		test('Test - a decimal number input can be correctly processed', () => {
// 			const spelledResult = convertHandler.split('3.7L');
// 			const num = convertHandler.getNum(spelledResult?.num);

// 			isNumber(num);
// 			assert.strictEqual(num, 3.7, 'a decimal input number is a decimal number');
// 		});

// 		test('Test - a fractional number input can be correctly processed', () => {
// 			const spelledResult = convertHandler.split('1/2gal');
// 			const num = convertHandler.getNum(spelledResult?.num);

// 			isNumber(num);
// 			assert.strictEqual(num, 0.5, 'a fractional input number is processed correctly');
// 		});

// 		test('Test - a fractional number with a decimal input can be correctly processed', () => {
// 			const spelledResult = convertHandler.split('3/2.5kg');
// 			const num = convertHandler.getNum(spelledResult?.num);

// 			isNumber(num);
// 			assert.strictEqual(
// 				num,
// 				1.2,
// 				'a fractional input number with a decimal is processed correctly'
// 			);
// 		});

// 		test('Test - a double fraction number is returned as null', () => {
// 			const spelledResult = convertHandler.split('3/2/3km');
// 			const num = convertHandler.getNum(spelledResult?.num);

// 			assert.isNull(num, 'a double fraction input number is processed as null');
// 		});

// 		test('Test - a default number is shown when no input number is provided', () => {
// 			const spelledResult = convertHandler.split('lbs');
// 			const num = convertHandler.getNum(spelledResult?.num);

// 			isNumber(num);
// 			assert.strictEqual(num, 1, 'input number defaults to 1 when no input is provided');
// 		});
// 	});

// 	suite('Parsing input units', () => {
// 		test('Test - a input unit can be correctly processed', () => {
// 			const spelledResult = convertHandler.split('3MI');
// 			const unit = convertHandler.getUnit(spelledResult?.unit);

// 			assert.isString(unit, 'input unit is a string');
// 			assert.strictEqual(unit, 'mi', 'a valid input is read correctly');
// 		});

// 		test('Test - an incorrect input unit should return null', () => {
// 			const spelledResult = convertHandler.split('5aBc');
// 			const unit = convertHandler.getUnit(spelledResult?.unit);

// 			assert.isNull(unit, 'an incorrect input unit returns null');
// 		});
// 	});

// 	suite('Parsing return units', () => {
// 		test('Test - a return unit can be correctly processed', () => {
// 			const spelledResult = convertHandler.split('8gal');
// 			const initUnit = convertHandler.getUnit(spelledResult?.unit);
// 			const returnUnit = convertHandler.getReturnUnit(initUnit);

// 			assert.isString(returnUnit, 'return unit is a string');
// 			assert.strictEqual(returnUnit, 'L', 'gal correctly converts to L');
// 		});
// 	});

// 	suite('Processing spelled out units', () => {
// 		test('Test - a unit can be correctly spelled out', () => {
// 			const spelledResult = convertHandler.split('12km');
// 			const initUnit = convertHandler.getUnit(spelledResult?.unit);
// 			const returnUnit = convertHandler.getReturnUnit(initUnit);

// 			const initUnitSpelledOut = convertHandler.spellOutUnit(initUnit);
// 			const returnUnitSpelledOut = convertHandler.spellOutUnit(returnUnit);

// 			assert.isString(initUnitSpelledOut, 'initial spelled out unit is a string');
// 			assert.isString(returnUnitSpelledOut, 'return spelled out unit is a string');

// 			assert.strictEqual(
// 				initUnitSpelledOut,
// 				'kilometers',
// 				'km is correctly spelled out as kilometers'
// 			);
// 			assert.strictEqual(
// 				returnUnitSpelledOut,
// 				'miles',
// 				'mi is correctly spelled out as miles'
// 			);
// 		});
// 	});

// 	suite('Conversions', () => {
// 		test('Test - gallons to litres conversion is working', () => {
// 			const convertedValue = convertHandler.convert(2, 'gal');

// 			isNumber(convertedValue);
// 			assert.strictEqual(convertedValue, 7.57082, 'gal to L conversion is working');
// 		});

// 		test('Test - litres to gallons conversion is working', () => {
// 			const convertedValue = convertHandler.convert(5, 'L');

// 			isNumber(convertedValue);
// 			assert.strictEqual(convertedValue, 1.32086, 'L to gal conversion is working');
// 		});

// 		test('Test - miles to kilometers conversion is working', () => {
// 			const convertedValue = convertHandler.convert(26.21, 'mi');

// 			isNumber(convertedValue);
// 			assert.strictEqual(convertedValue, 42.1808, 'mi to km conversion is working');
// 		});

// 		test('Test - kilometers to miles conversion is working', () => {
// 			const convertedValue = convertHandler.convert(42.195, 'km');

// 			isNumber(convertedValue);
// 			assert.strictEqual(convertedValue, 26.21882, 'km to mi conversion is working');
// 		});

// 		test('Test - pounds to kilograms conversion is working', () => {
// 			const convertedValue = convertHandler.convert(224, 'lbs');

// 			isNumber(convertedValue);
// 			assert.strictEqual(convertedValue, 101.60461, 'lbs to kg conversion is working');
// 		});

// 		test('Test - kilograms to pounds conversion is working', () => {
// 			const convertedValue = convertHandler.convert(155.77, 'kg');

// 			isNumber(convertedValue);
// 			assert.strictEqual(convertedValue, 343.41435, 'kg to lbs conversion is working');
// 		});
// 	});
// });

const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
	test('whole number input validation', function () {
		assert.equal(convertHandler.getNum('2mi'), 2);
		assert.equal(convertHandler.getNum('100kg'), 100);
	});

	test('decimal number input validation', function () {
		assert.equal(convertHandler.getNum('1.99l'), 1.99);
		assert.equal(convertHandler.getNum('2.5kg'), 2.5);
	});

	test('fractional number input validation', function () {
		assert.equal(convertHandler.getNum('1/12lbs'), 1 / 12);
		assert.equal(convertHandler.getNum('3/4gal'), 3 / 4);
	});

	test('fractional number with a decimal input validation', function () {
		assert.equal(convertHandler.getNum('3.4/12km'), 3.4 / 12);
		assert.equal(convertHandler.getNum('3/4.1mi'), 3 / 4.1);
	});

	test('double fraction input validation', function () {
		assert.notEqual(convertHandler.getNum('2/3/4miles'), '2/3/4');
		assert.notEqual(convertHandler.getNum('4/3/4liters'), '4/3/4');
	});

	test('no number defaults to 1', function () {
		assert.equal(convertHandler.getNum('kg'), 1);
		assert.equal(convertHandler.getNum('mi'), 1);
	});

	test('valid input metric & imperial units', function () {
		assert.equal(convertHandler.getUnit('KG'), 'kg');
		assert.equal(convertHandler.getUnit('MI'), 'mi');
		assert.equal(convertHandler.getUnit('KM'), 'km');
		assert.equal(convertHandler.getUnit('GAL'), 'gal');
		assert.equal(convertHandler.getUnit('GAL'), 'gal');
		assert.equal(convertHandler.getUnit('L'), 'L');
		assert.equal(convertHandler.getUnit('LBS'), 'lbs');
	});

	test('test for invalid input units', function () {
		assert.equal(convertHandler.getUnit('CM'), null);
		assert.equal(convertHandler.getUnit('RPM'), null);
	});

	test('test for conversion return units', function () {
		assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
		assert.equal(convertHandler.getReturnUnit('mi'), 'km');
		assert.equal(convertHandler.getReturnUnit('km'), 'mi');
		assert.equal(convertHandler.getReturnUnit('gal'), 'L');
		assert.equal(convertHandler.getReturnUnit('L'), 'gal');
		assert.equal(convertHandler.getReturnUnit('lbs'), 'kg');
	});

	test('test for units spelled out', function () {
		assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms');
		assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds');
		assert.equal(convertHandler.spellOutUnit('km'), 'kilometers');
		assert.equal(convertHandler.spellOutUnit('mi'), 'miles');
		assert.equal(convertHandler.spellOutUnit('gal'), 'gallons');
		assert.equal(convertHandler.spellOutUnit('L'), 'litres');
	});

	test('test for converting kg to lbs', function () {
		assert.equal(convertHandler.convert(2, 'kg'), 4.40925);
		assert.equal(convertHandler.convert(5.567, 'kg'), 12.27314);
	});
	test('test for converting lbs to kg', function () {
		assert.equal(convertHandler.convert(40, 'lbs'), 18.14368);
	});
	test('test for converting km to mi', function () {
		assert.equal(convertHandler.convert(90, 'km'), 55.92355);
	});
	test('test for converting mi to km', function () {
		assert.equal(convertHandler.convert(100, 'mi'), 160.934);
		assert.equal(convertHandler.convert(4 / 5, 'mi'), 1.28747);
	});
	test('test for converting gal to litres', function () {
		assert.equal(convertHandler.convert(4, 'gal'), 15.14164);
	});
	test('test for converting litres to gal', function () {
		assert.equal(convertHandler.convert(5, 'L'), 1.32086);
	});
});
