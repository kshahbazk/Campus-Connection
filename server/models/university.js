/**
 * Created by mtbsickrider on 3/15/16.
 */
var mongoose = require('mongoose');

var UniversitySchema = new mongoose.Schema({
	name: String
});

module.exports =  mongoose.model('University', UniversitySchema);