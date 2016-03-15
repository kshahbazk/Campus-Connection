var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var jwt = require('express-jwt');
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});
require("../models/User");
var User = mongoose.model('User');

var router = express.Router();


router.post('/register', function(req, res, next){
	if(!req.body.username ||
		!req.body.password ||
		!req.body.email ||
		!req.body.firstName ||
		!req.body.lastName){
		return res.status(400).json({message: 'Please fill out all fields'});
	}

	var user = new User();

	user.username = req.body.username;
	//TODO: Create student verification with regex
	user.email = req.body.email;
	user.firstName = req.body.firstName
	user.email = req.body.email;;
	user.lastName = req.body.lastName;
	user.location = req.body.location;


	user.setPassword(req.body.password);

	user.save(function (err){
		if(err){ return next(err); }

		return res.json({token: user.generateJWT()})
	});
});

router.post('/login', function(req, res, next){
	//console.log(req.body);
	if(!req.body.username || !req.body.password){
		return res.status(400).json({message: 'Please fill out all fields'});
	}

	passport.authenticate('local', function(err, user, info){
		if(err){
			return next(err); }

		if(user){
			console.log({_id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email, location: user.location});
			return res.json({_id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email, location: user.location, token: user.generateJWT()});
		} else {
			console.log(info);
			return res.status(401).json(info);
		}
	})(req, res, next);
});

module.exports = router;