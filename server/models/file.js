
var mongoose = require('mongoose');

var FileSchema = new mongoose.Schema({
    fileType: {type: String, required: true},
    encoding: {type: String, required: true},
    fileContent: {type: String, required: true},
    createdAt: {type: Date, required: true, default: Date.now}
});

module.exports =  mongoose.model('File', FileSchema);
