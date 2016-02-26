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
  ownerId: {type: String},//will be the same as _id; important to allow modifications of the user table without rewriting functions
  //This will be email here. id = email
  photo: {type: String},
  })

module.exports = User
