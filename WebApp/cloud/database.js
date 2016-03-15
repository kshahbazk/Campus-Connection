
var mongoose = require('mongoose');

var url = process.env.MONGOLAB_URI || 'mongodb://user:SlatfatfSsih2c2t@campusconnection.us:27017/campusconnection';
mongoose.connect(url);
console.log("Connected to MongoDB");
module.exports = mongoose;