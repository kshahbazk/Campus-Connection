/**
 * Created by johnfranklin on 2/19/16.
 */
var tag = db.model('Tag', {
    createdAt: {type: Date, required: true, default: Date.now}
})

module.exports = tag;