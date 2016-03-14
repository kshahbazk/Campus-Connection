/**
 * Created by johnfranklin on 2/19/16.
 */
var db = require('../database')
var product = db.model('Product', {
    name: String,
    createdAt: {type: Date, required: true, default: Date.now}
})

module.exports = product
