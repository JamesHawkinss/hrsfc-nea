const { User } = require('../models/User');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local');

const loginStrategy = new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  },
  async (req, username, pass, done) => {
    try {
      username = username.trim().toLowerCase();
      // get user
      const user = await User.findOne({ username });
      if (!user) {
        return done(null, false);
      }

      // check password
      const isCorrectPass = await bcrypt.compare(pass, user.password);
      if (!isCorrectPass) {
        return done(null, false);
      }

      // return user
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
);

// serialize user into user id
function loginSerialize(user, done) {
  return done(null, user._id.toString());
}

// deserialize by fetching user
async function loginDeserialize(id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
}

module.exports = {
    loginDeserialize,
    loginSerialize,
    loginStrategy,
}
