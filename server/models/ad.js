/**
 * Created by johnfranklin on 2/18/16.
 */
var mongoose = require('mongoose');


var AdSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    quality: Number,
    productName: String,
    userPointer: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    imagePointer: {type: mongoose.Schema.Types.ObjectId, ref: 'File'},
    ppvPointer:{type: mongoose.Schema.Types.ObjectId, ref: 'Ppvcache'},
    searchArray: [String],
    category: String,
    createdAt: {type: Date, required: true, default: Date.now}
});

module.exports = mongoose.model('Ad', AdSchema);


