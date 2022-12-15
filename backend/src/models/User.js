const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: { // needs to be a hash, of course
    type: String,
    required: true,
  },
  studentId: {
    type: String,
    required: true,
  }
});

const User = mongoose.model('user', UserSchema);

module.exports = {
  UserSchema,
  User
};
