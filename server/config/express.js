var bodyParser = require('body-parser');
var express = require('express');
var session = require('express-session');
var passport = require('passport');
var jwt = require('express-jwt');
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});
var path =  require('path');

module.exports = function(app) {

	app.use(express.static('public'));
	app.use(bodyParser.json({limit: '50mb'}));
	app.set('view engine',  'ejs');
	app.set('views', 'server');//Screw it. no more confusing views folder in server.
	app.use(session({secret: 'SECRET'}));
	app.use(passport.initialize());
	app.use(session({
		genid: function(req) {return genuuid(); // use UUIDs for session IDs
		},
		secret: 'SECRET'
	}));


};


//app.use(bodyParser.urlencoded({extended: true}))