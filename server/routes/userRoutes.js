var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var jwt = require('express-jwt');
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});
var nev = require("email-verification")(mongoose);
var _ = require("lodash");

var User = require("../models/User");

var router = express.Router();

nev.configure({
	verificationURL: 'http://campusconnection.us/user/email-verification/${URL}',
	persistentUserModel: User,
	tempUserCollection: 'tempusers',

	transportOptions: {
		service: 'Gmail',
		auth: {
			user: 'campusconnectionsjsu@gmail.com',
			pass: 'ccseja2016'
		}
	},
	verifyMailOptions: {
		from: 'Do Not Reply <campusconnectionSJSU@gmail.com>',
		subject: 'Please confirm account',
		html: 'Click the following link to confirm your account:</p><p>${URL}</p>',
		text: 'Please confirm your account by clicking the following link: ${URL}'
	}
});

// generating the model, pass the User model defined earlier
nev.generateTempUserModel(User);




router.post('/register', function(req, res){
	if(!req.body.username ||
		!req.body.password ||
		!req.body.email ||
		!req.body.firstName ||
		!req.body.lastName){
		 res.status(400).json({msg: 'Please fill out all fields'});
	}

	var user = new User();
	//Check if email ends with .edu
	if (req.body.email.slice(req.body.email.length - 3) != "edu") {
		  res.status(400).json({msg: 'Email must end with edu'});
	}


	user.username = req.body.username;
	user.email = req.body.email;
	user.firstName = req.body.firstName;
	user.email = req.body.email;
	user.lastName = req.body.lastName;
	user.location = req.body.location;


	user.setPassword(req.body.password);

	nev.createTempUser(user, function(err, newTempUser) {
		if (err) {
			 res.status(404).send('ERROR: creating temp user FAILED');
		}

		// new user created
		if (newTempUser) {
			var URL = newTempUser[nev.options.URLFieldName];
			console.log("going to send email");
			nev.sendVerificationEmail(newTempUser.email, URL, function(err, info) {
				if (err) {
					 res.status(404).send('ERROR: sending verification email FAILED');
				}
				console.log("Sent email");
				 res.status(200).json({
					msg: 'An email has been sent to you. Please check it to verify your account.',
					info: info
				});

			});
			// user already exists in temporary collection!
		} else {
			 res.status(400).json({
				msg: 'You have already signed up. Please check your email to verify your account.'
			});
		}
	});
});

router.post('/login',
	passport.authenticate('local'),
	function(req, res){
		if(req.user){
			user = req.user;
			res.send({_id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email, location: user.location, token: user.generateJWT()});
		}
	});

router.get('/email-verification/:URL', function(req, res) {
	var url = req.params.URL;
	console.log("Verifying user");
	nev.confirmTempUser(url, function(err, user) {
		if (user) {
			nev.sendConfirmationEmail(user.email, function(err, info) {
				if (err) {
					return res.status(404).send('ERROR: sending confirmation email FAILED');
				}
				console.log("User Verified");
				res.json({
					msg: 'CONFIRMED!',
					info: info
				});
			});
		} else {
			return res.status(404).send('ERROR: confirming temp user FAILED');
		}
	});
});


module.exports = router;