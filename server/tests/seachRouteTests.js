var request = require('supertest')
	, express = require('express');
var chai = require('chai');
var assert = chai.assert;

var app = require('../../server');

describe('Testing User Routes', function() {

	it("Can search for ads", function(done) {
		request(app)
			.get('/search/?search=xbox')
			// end handles the response
			.end(function(err, res) {
				if (err) {
					throw err;
				}
				assert.equal(res.status, 200);
				console.log(res.body);
				done();
			});
	})
});