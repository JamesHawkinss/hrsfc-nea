const passport = require("passport");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const { loginStrategy, loginSerialize, loginDeserialize } = require('../utils/auth.js');

module.exports = (app) => {
  // Construct settings for passport
  const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    name: process.env.COOKIE_NAME || "time.session",
    rolling: true,
    // Users will need to reauthenticate after 1 weeks
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
    // Define MongoDB as an authentication store
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
      stringify: false,
    })
  };

  if (process.env.TRUST_PROXY == "true") {
    console.log("enabling proxy trust");
    app.set('trust proxy', 1);
  }

  // setup login strategy
  passport.use(loginStrategy);
  passport.serializeUser(loginSerialize);
  passport.deserializeUser(loginDeserialize);

  // setup express middleware
  app.use(session(sessionOptions));
  app.use(passport.initialize());
  app.use(passport.session());
}
