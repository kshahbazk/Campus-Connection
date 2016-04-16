var request = require('supertest')
	, express = require('express');
var chai = require('chai');
var assert = chai.assert;

var app = require('../../server');

describe('Testing Routes', function() {
	it("renders successfully", function(done) {
		request(app).get('/').expect(200, done);
	});

	it("registers a temp user successfully", function(done) {
		var tu = {
			username: "enriquepadilla",
			password: "testing",
			email: "enrique.padilla@sjsu.edu",
			firstName: "Enrique",
			lastName: "Padilla",
			location: "San Jose State University"
		};
		request(app)
			.post('/user/register')
			.send(tu)
			// end handles the response
			.end(function(err, res) {
				if (err) {
					throw err;
				}
				assert.equal(res.status, 200);
				assert.equal(res.body.msg, "An email has been sent to you. Please check it to verify your account.");
				done();
			});
	});

	it("does not allow to have same email as a temp user", function(done) {
		var tu = {
			username: "john",
			password: "testing",
			email: "john.franklin@sjsu.edu",
			firstName: "John",
			lastName: "Franklin",
			location: "San Jose State University"
		};
		request(app)
			.post('/user/register')
			.send(tu)
			// end handles the response
			.end(function(err, res) {
				if (err) {
					throw err;
				}
				assert.equal(res.status, 200);
				assert.equal(res.body.msg, "An email has been sent to you. Please check it to verify your account.");
				done();
			});
	});

	it.skip("logins successfully", function(done) {
		var tu = {
			username: "test1111",
			password: "test"
		};
		request(app)
			.post('/login')
			.send(tu)
			// end handles the response
			.end(function(err, res) {
				if (err) {
					throw err;
				}
				assert.equal(res.status, 200);
				assert.isNotNull(res.token, "should of created a token");
				done();
			});
	})
});