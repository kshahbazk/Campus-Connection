var db = require('../database')

var University = db.model('University', {
    name: String
})

module.exports = University
