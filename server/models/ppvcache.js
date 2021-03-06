var mongoose = require('mongoose');
var q = function () { return (new mongoose.Types.ObjectId()).toString()}
var PpvCacheSchema = new mongoose.Schema({
    _id: {type: String, required: true, default: q },//AAAARRRGH! most frustrating thing ever.
    productName: String,
    quality: Number,
    location: String,
    ppv: Number,
    ppvkey: String,
    weight: Number,//needed if we want to average based on recent purchases instead of every purchace ever made. easiest definition is previous number of products.
    createdAt: {type: Date, required: true, default: Date.now}
});
PpvCacheSchema.pre('save', function(next){
    this.ppvkey = this.get('_id')
    next();
})
module.exports =  mongoose.model('Ppvcache', PpvCacheSchema);