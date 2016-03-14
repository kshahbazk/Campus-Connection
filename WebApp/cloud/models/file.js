/**
 * Created by johnfranklin on 3/13/16.
 */
var file = db.model('File', {
    fileContent: { data: Buffer, contentType: String },
    createdAt: {type: Date, required: true, default: Date.now}
})
module.exports = file;