var db = require('../database')
var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
	username: {type: String, lowercase:true, unique:true},
	hash: String,
	salt: String,
	email: {type: String, required: true, unique: true},
	verified: {type:Boolean, default: false},
	//universityPointer: {type: db.Schema.Types.ObjectId, ref: 'University'},
	//userPointer: {type: db.Schema.Types.ObjectId, ref: 'Users'},
	firstName: {type: String, required: true},
	lastName: {type: String, required: true},
	createdAt: {type: Date, required: true, default: Date.now},
	photo: String
});


UserSchema.methods.setPassword = function (password) {
	this.salt = crypto.randomBytes(16).toString('hex');

	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.validPassword = function (password) {
	var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');

	return this.hash === hash;
};

UserSchema.methods.generateJWT = function() {

	// set expiration to 60 days
	var today = new Date();
	var exp = new Date(today);
	exp.setDate(today.getDate() + 60);


	return jwt.sign({
		_id: this._id,
		username: this.username,
		exp: parseInt(exp.getTime() / 1000)
	}, 'SECRET');
};

mongoose.model('User', UserSchema);