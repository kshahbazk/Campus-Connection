/**
 * Created by johnfranklin on 2/18/16.
 */
var db = require('../database')
var ad = db.model('Ad', {
    title: String,
    description: String,
    price: Number,
    quality: Number,
    productName: String,
    userPointer: {type: db.Schema.Types.ObjectId, ref: 'User'},
    imagePointer: {type: db.Schema.Types.ObjectId, ref: 'File'},
    ppvPointer:{type: db.Schema.Types.ObjectId, ref: 'Ppvcache'},
    searchArray: [String],
    createdAt: {type: Date, required: true, default: Date.now}
})

module.exports = ad
