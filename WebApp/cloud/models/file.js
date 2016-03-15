/**
 * Created by johnfranklin on 3/13/16.
 */
var db = require('../database');
var file = db.model('File', {
    fileType: {type: String, required: true},
    encoding: {type: String, required: true},
    fileContent: {type: String, required: true},
    createdAt: {type: Date, required: true, default: Date.now}
})
module.exports = file;