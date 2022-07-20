const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String
  },
  img: {
    type: String,
    default: ''
  },
  subscribers: {
    type: Number,
    default: 0
  },
  subscribedUsers: {
    type: [String],
    default: []
  },
  fromGoogle: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });


module.exports = mongoose.model('User', UserSchema);