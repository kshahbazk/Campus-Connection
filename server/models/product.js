
var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
        name: String,
    createdAt: {type: Date, required: true, default: Date.now}
});

module.exports =  mongoose.model('Product', ProductSchema);