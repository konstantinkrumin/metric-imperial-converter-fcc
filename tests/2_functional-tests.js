const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {
	test('Test - Convert 10L by requesting GET /api/convert', done => {
		chai.request(server)
			.keepOpen()
			.get('/api/convert?input=10L')
			.end((err, res) => {
				assert.equal(res.status, 200);
				assert.equal(res.body.returnNum, 2.64172);
				assert.equal(res.body.returnUnit, 'gal');
				done();
			});
	});

	test('Test - Converting invalid unit such as 32g by requesting GET /api/convert should result in error message', done => {
		chai.request(server)
			.keepOpen()
			.get('/api/convert?input=32g')
			.end((err, res) => {
				assert.equal(res.status, 200);
				assert.equal(res.text, 'invalid unit');
				done();
			});
	});

	test('Test - Converting invalid number such as 3/7.2/4kg by requesting GET /api/convert should result in error message', done => {
		chai.request(server)
			.keepOpen()
			.get('/api/convert?input=3/7.2/4kg')
			.end((err, res) => {
				assert.equal(res.status, 200);
				assert.equal(res.text, 'invalid number');
				done();
			});
	});

	test('Test - Converting invalid number and unit such as 3/7.2/4kilomegagram by requesting GET /api/convert should result in error message', done => {
		chai.request(server)
			.keepOpen()
			.get('/api/convert?input=3/7.2/4kilomegagram')
			.end((err, res) => {
				assert.equal(res.status, 200);
				assert.equal(res.text, 'invalid number and unit');
				done();
			});
	});

	test('Test - Convert kg (with no number) by requesting GET /api/convert', done => {
		chai.request(server)
			.keepOpen()
			.get('/api/convert?input=kg')
			.end((err, res) => {
				assert.equal(res.status, 200);
				assert.equal(res.body.returnNum, 2.20462);
				assert.equal(res.body.returnUnit, 'lbs');
				done();
			});
	});
});
