'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = app => {
	let convertHandler = new ConvertHandler();

	app.route('/api/convert').get((req, res) => {
		console.log(req.query);

		return res.json({
			result: 'success!'
		});
	});
};
