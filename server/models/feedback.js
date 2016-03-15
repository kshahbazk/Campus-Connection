/**
 * Created by johnfranklin on 2/22/16.
 */
var mongoose = require('mongoose');

var FeedbackSchema = new mongoose.Schema({
    userPointer: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    recipientPointer: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    transactionType: Boolean,//True: buyer is userPointer, false: seller.
    title: String,
    rating: Number,//
    review: String,
    createdAt: {type: Date, required: true, default: Date.now}
});

module.exports =  mongoose.model('Feedback', FeedbackSchema);