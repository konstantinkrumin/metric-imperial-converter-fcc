const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', () => {
	test('whole number input validation', () => {
		assert.equal(convertHandler.getNum('2mi'), 2);
		assert.equal(convertHandler.getNum('100kg'), 100);
	});

	test('decimal number input validation', () => {
		assert.equal(convertHandler.getNum('1.99l'), 1.99);
		assert.equal(convertHandler.getNum('2.5kg'), 2.5);
	});

	test('fractional number input validation', () => {
		assert.equal(convertHandler.getNum('1/12lbs'), 1 / 12);
		assert.equal(convertHandler.getNum('3/4gal'), 3 / 4);
	});

	test('fractional number with a decimal input validation', () => {
		assert.equal(convertHandler.getNum('3.4/12km'), 3.4 / 12);
		assert.equal(convertHandler.getNum('3/4.1mi'), 3 / 4.1);
	});

	test('double fraction input validation', () => {
		assert.notEqual(convertHandler.getNum('2/3/4miles'), '2/3/4');
		assert.notEqual(convertHandler.getNum('4/3/4liters'), '4/3/4');
	});

	test('no number defaults to 1', () => {
		assert.equal(convertHandler.getNum('kg'), 1);
		assert.equal(convertHandler.getNum('mi'), 1);
	});

	test('valid input metric & imperial units', () => {
		assert.equal(convertHandler.getUnit('KG'), 'kg');
		assert.equal(convertHandler.getUnit('MI'), 'mi');
		assert.equal(convertHandler.getUnit('KM'), 'km');
		assert.equal(convertHandler.getUnit('GAL'), 'gal');
		assert.equal(convertHandler.getUnit('GAL'), 'gal');
		assert.equal(convertHandler.getUnit('L'), 'L');
		assert.equal(convertHandler.getUnit('LBS'), 'lbs');
	});

	test('test for invalid input units', () => {
		assert.equal(convertHandler.getUnit('CM'), null);
		assert.equal(convertHandler.getUnit('RPM'), null);
	});

	test('test for conversion return units', () => {
		assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
		assert.equal(convertHandler.getReturnUnit('mi'), 'km');
		assert.equal(convertHandler.getReturnUnit('km'), 'mi');
		assert.equal(convertHandler.getReturnUnit('gal'), 'L');
		assert.equal(convertHandler.getReturnUnit('L'), 'gal');
		assert.equal(convertHandler.getReturnUnit('lbs'), 'kg');
	});

	test('test for units spelled out', () => {
		assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms');
		assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds');
		assert.equal(convertHandler.spellOutUnit('km'), 'kilometers');
		assert.equal(convertHandler.spellOutUnit('mi'), 'miles');
		assert.equal(convertHandler.spellOutUnit('gal'), 'gallons');
		assert.equal(convertHandler.spellOutUnit('L'), 'litres');
	});

	test('test for converting kg to lbs', () => {
		assert.equal(convertHandler.convert(2, 'kg'), 4.40925, 0.1);
		assert.equal(convertHandler.convert(5.567, 'kg'), 12.27314, 0.1);
	});
	test('test for converting lbs to kg', () => {
		assert.equal(convertHandler.convert(40, 'lbs'), 18.14368, 0.1);
		assert.equal(convertHandler.convert(1, 'lbs'), 0.45359, 0.1);
	});
	test('test for converting km to mi', () => {
		assert.equal(convertHandler.convert(90, 'km'), 55.92355, 0.1);
	});
	test('test for converting mi to km', () => {
		assert.equal(convertHandler.convert(100, 'mi'), 160.934, 0.1);
		assert.equal(convertHandler.convert(4 / 5, 'mi'), 1.28747, 0.1);
	});
	test('test for converting gal to litres', () => {
		assert.equal(convertHandler.convert(4, 'gal'), 15.14164, 0.1);
		assert.equal(convertHandler.convert(1, 'gal'), 3.78541, 0.1);
	});
	test('test for converting litres to gal', () => {
		assert.equal(convertHandler.convert(5, 'L'), 1.32086, 0.1);
	});
});
