var db = require('../database')

var University = db.model('University', {
    name: String,
    createdAt: {type: Date, required: true, default: Date.now}
})

module.exports = University
