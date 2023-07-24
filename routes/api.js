'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = app => {
	let convertHandler = new ConvertHandler();

	app.route('/api/convert').get((req, res) => {
		const incomingInput = req.query.input;

		try {
			const spelledResult = convertHandler.spellOutUnit(incomingInput);

			if (!spelledResult) throw 'invalid number and unit';

			const initNum = convertHandler.getNum(spelledResult?.num);
			const initUnit = convertHandler.getUnit(spelledResult?.unit);

			if (!initNum && !initUnit) throw 'invalid number and unit';
			if (!initNum) throw 'invalid number';
			if (!initUnit) throw 'invalid unit';

			const returnNum = convertHandler.convert(initNum, initUnit);
			const returnUnit = convertHandler.getReturnUnit(initUnit);

			const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

			return res.json({
				initNum,
				initUnit,
				returnNum,
				returnUnit,
				string
			});
		} catch (err) {
			return res.send(err);
		}
	});
};
