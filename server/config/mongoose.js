mongoose = require('mongoose');

var url = //"mongodb://localhost:27017/campusconnection" ||
    process.env.MONGOLAB_URI || 'mongodb://ccUser:SlatfatfSsih2c2t@campusconnection.us:27017/campusconnection';
//'mongodb://localhost::27017/campusconnection';
	//
mongoose.connect(url);
console.log("DB live at "+ url)

