/**
 * Created by johnfranklin on 2/22/16.
 */
var feedback = db.model('Feedback', {
    userPointer: {type: db.Schema.Types.ObjectId, ref: 'User'},
    recipientPointer: {type: db.Schema.Types.ObjectId, ref: 'User'},
    name: String,
    rating: Number,
    review: String,
    createdAt: {type: Date, required: true, default: Date.now}
})
module.exports = feedback;