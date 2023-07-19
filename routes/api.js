'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = app => {
	let convertHandler = new ConvertHandler();

	app.route('/api/convert').get((req, res) => {
		const incomingInput = req.query.input;

		const initNum = convertHandler.getNum(incomingInput);
		const initUnit = convertHandler.getUnit(incomingInput);

		const returnNum = 'TBH';
		const returnUnit = 'TBH';

		const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

		return res.json({
			initNum,
			initUnit,
			returnNum,
			returnUnit,
			string
		});
	});
};
