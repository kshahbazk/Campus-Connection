var request = require('supertest')
	, express = require('express');
var chai = require('chai');
var assert = chai.assert;

var app = require('../../server');

describe.skip('Testing User Routes', function() {

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
				assert.equal(res.body.message, "An email has been sent to you. Please check it to verify your account.");
				done();
			});
	});

	it("does not allow to have same email as a temp user", function(done) {
		var tu = {
			username: "enriqueenrique",
			password: "testing",
			email: "enrique.padilla@sjsu.edu",
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
				assert.equal(res.status, 400);
				assert.equal(res.body.message, "You have already signed up. Please check your email to verify your account.");
				done();
			});
	});

	it("does not allow to have same email as a current user", function(done) {
		var tu = {
			username: "testing",
			password: "testing",
			email: "john.franklin@sjsu.edu",
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
				assert.equal(res.status, 400);
			//assert.equal(res.body.message, "Email already exists");
				done();
			});
	});

	it("does not allow to have same username as a current user", function(done) {
		var tu = {
			username: "john",
			password: "testing",
			email: "enrique.padilla@sjsu.edu",
			firstName: "john",
			lastName: "franklin",
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
				assert.equal(res.status, 400);
				//assert.equal(res.body.message, "Username already exists");
				done();
			});
	});

	it("Needs to be an .edu email to succesfully register", function(done) {
		var tu = {
			username: "enriquepad",
			password: "testing",
			email: "enriquepadilla@gmail.com",
			firstName: "Enrique",
			lastName: "Enrique",
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
				assert.equal(res.status, 400);
				assert.equal(res.body.message, "Email must end with edu");
				done();
			});
	});

	it("logins needs correct password", function(done) {
		var tu = {
			username: "madmonk12345",
			password: "test"
		};
		request(app)
			.post('/user/login')
			.send(tu)
			// end handles the response
			.end(function(err, res) {
				if (err) {
					throw err;
				}
				assert.equal(res.status, 401);
				done();
			});
	})

	it("logins works with username and password", function(done) {
		var tu = {
			username: "madmonk12345",
			password: "lockpicks"
		};
		request(app)
			.post('/user/login')
			.send(tu)
			// end handles the response
			.end(function(err, res) {
				if (err) {
					throw err;
				}
				assert.equal(res.status, 200);
				done();
			});
	})
});