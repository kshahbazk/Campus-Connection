var mongoose = require('mongoose');

var PpvCacheSchema = new mongoose.Schema({
    productName: String,
    quality: Number,
    location: String,
    ppv: Number,
    createdAt: {type: Date, required: true, default: Date.now}
});

module.exports =  mongoose.model('Ppvcache', PpvCacheSchema);