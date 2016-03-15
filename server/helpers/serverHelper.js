var fs = require("fs");
String.prototype.capitalize = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
};

module.exports.getModelNames = function(cb) {
	fs.readdir('server/models',function(err,files){//files is a string array of the names of the files(??)
		if(err) {
			console.log(err.message)
			throw err;
		}
		var modelNames = [];
		files.forEach(function(file){
			var name = file.slice(0, file.length - 3)//removes .js
			modelNames.push(name.capitalize());
		});
		cb(modelNames);

	});
};

