var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var jwt = require('express-jwt');
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});
require("../models/Users");
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
	user.firstName = req.body.firstName;
	user.lastName = req.body.lastName;


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
		if(err){ return next(err); }

		if(user){
			return res.json({token: user.generateJWT()});
		} else {
			return res.status(401).json(info);
		}
	})(req, res, next);
});

module.exports = router;