var mongoose = require('mongoose');

var PpvCacheSchema = new mongoose.Schema({
    productName: String,
    quality: Number,
    location: String,
    ppv: Number,
    weight: Number,//needed if we want to average based on recent purchases instead of every purchace ever made. easiest definition is previous number of products.
    createdAt: {type: Date, required: true, default: Date.now}
});

module.exports =  mongoose.model('Ppvcache', PpvCacheSchema);