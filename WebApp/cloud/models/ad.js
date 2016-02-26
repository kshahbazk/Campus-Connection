/**
 * Created by johnfranklin on 2/18/16.
 */
var db = require('../database')
var ad = db.model('Ad', {
    title: String,
    description: String,
    price: Number,
    productPointer: {type: db.Schema.Types.ObjectId, ref: 'Product'},
    userPointer: {type: db.Schema.Types.ObjectId, ref: 'User'},
    image: String,
    searchArray: [String]

})

module.exports = ad
