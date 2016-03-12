var db = require('../database')

var User = db.model('User', {
  email: {type: String, required: true, unique: true},
  verified: {type:Boolean, default: false},
  passwordSaltedHashed: {type: String, required: true},
  universityPointer: {type: db.Schema.Types.ObjectId, ref: 'University'},
  userPointer: {type: db.Schema.Types.ObjectId, ref: 'User'},
  userName: {type: String},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  createdAt: {type: Date, required: true, default: Date.now},
  photo: {type: String},
  })

module.exports = User
