var mongoose = require('mongoose');

var url = process.env.MONGOLAB_URI || 'mongodb://ccUser:SlatfatfSsih2c2t@campusconnection.us:27017/campusconnection';
//'mongodb://localhost::27017/campusconnection';
	//
mongoose.connect(url);

