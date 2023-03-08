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
      // Get matching user from database
      username = username.trim().toLowerCase();
      const user = await User.findOne({ username });
      
      // Fail if one doesn't exist
      if (!user) {
        return done(null, false);
      }

      // Does password match database?
      const isCorrectPass = await bcrypt.compare(pass, user.password);
      // Fail if incorrect password
      if (!isCorrectPass) {
        return done(null, false);
      }

      // Return user object
      return done(null, user);
    } catch (err) {
      // Fail on error
      return done(err);
    }
  }
);

// Serialize user into user id
function loginSerialize(user, done) {
  return done(null, user._id.toString());
}

// Deserialize by fetching user from database
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
