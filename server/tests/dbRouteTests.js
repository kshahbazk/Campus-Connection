
var request = require('supertest')
	, express = require('express');
var chai = require('chai');
var assert = chai.assert;
var mongoose = require("mongoose");
var app = require('../../server');

describe.skip('Testing DB Routes', function() {
	//thom
	var id = "571402779caebb3d274b619f";

	it("Should create an ad in the database", function(done) {
		var fileId = "56e89c0376161965130d1b7c";
		var adString = "Old xbox 360 for sale, just bought an xbox 1";
		var ad = {
			title: "Selling an xbox 360",
			description: adString,
			price: 100,
			quality: 1,
			productName: "Xbox 360",
			userPointer: id,
			imagePointer: fileId,
			searchArray: adString.split(" ")
		};
		request(app)
			.post('/api/ad')
			.send(ad)
			// end handles the response
			.end(function(err, res) {
				if (err) {
					throw err;
				}
				assert.equal(res.status, 200);
				done();
			});
	});

	it("Should create a feedback in the database", function(done) {
		var feedback = {
			userPointer: id,
			recipientPointer: "56ed00b14dc74ad1349392d6",
			transactionType: true,//True: buyer is userPointer, false: seller.
			title: "Great Buyer, paid everything we talked about",
			rating: 5,//
			review: "We need more people like him in the world",
		};
		request(app)
			.post('/api/feedback')
			.send(feedback)
			// end handles the response
			.end(function(err, res) {
				if (err) {
					throw err;
				}
				assert.equal(res.status, 200);
				done();
			});
	});

	it("Should create an product in the database", function(done) {
		var product = {
			name: "Iphone 6"
		};
		request(app)
			.post('/api/product')
			.send(product)
			// end handles the response
			.end(function(err, res) {
				if (err) {
					throw err;
				}
				assert.equal(res.status, 200);
				done();
			});
	});

	it("Should create a university in the database", function(done) {
		var uni = {
			name: "Stanford University"
		};
		request(app)
			.post('/api/university')
			.send(uni)
			// end handles the response
			.end(function(err, res) {
				if (err) {
					throw err;
				}
				assert.equal(res.status, 200);
				done();
			});
	});

});

