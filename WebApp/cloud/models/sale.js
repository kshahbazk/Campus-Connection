/**
 * Created by johnfranklin on 2/19/16.
 */
var db = require('../database');
var sale = db.model('Sale', {
    createdAt: {type: Date, required: true, default: Date.now}
})

module.exports = sale;