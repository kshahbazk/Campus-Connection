/**
 * Created by johnfranklin on 3/13/16.
 */
var db = require('../database');
var ad = db.model('Ppvcache', {
    productName: String,
    quality: Number,
    location: String,
    ppv: Number,
    createdAt: {type: Date, required: true, default: Date.now}
})

module.exports = ad
