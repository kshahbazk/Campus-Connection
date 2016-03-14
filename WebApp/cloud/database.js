
var mongoose = require('mongoose');

var url = process.env.MONGOLAB_URI || 'mongodb://localhost/campusconnection';
mongoose.connect(url);
console.log("Connected to MongoDB");
module.exports = mongoose;