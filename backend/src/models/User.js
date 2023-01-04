const mongoose = require('mongoose');

const DaySchema = new mongoose.Schema({
  1: String, // P1
  2: String, // P2
  3: String, // P3
  4: String, // P4
  5: String, // P5
});

const TimetableSchema = new mongoose.Schema({
  1: DaySchema, // Monday
  2: DaySchema, // Tuesday
  3: DaySchema, // Wednesday
  4: DaySchema, // Thursday
  5: DaySchema, // Friday
});

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
    unique: true,
    required: true,
  },
  timetable: TimetableSchema,
  friends: [String], // array of studentIds
});

const User = mongoose.model('user', UserSchema);

module.exports = {
  UserSchema,
  User
};
