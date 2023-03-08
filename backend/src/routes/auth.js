const express = require("express");
const passport = require("passport");
const { User } = require("../models/User");
const router = express.Router();
const bcrypt = require('bcrypt')
const config = require('../config');

async function registerUser({ username, password, studentId }) {
  // Check if all the required fields have been passed in
  if (!username || !password || !studentId)
    return "missingFields"
    
  // Check if the username is a string
  if (typeof username !== 'string')
    return "invalidUsername"

  // Check if the password is a string
  if (typeof password !== 'string')
    return "invalidPassword"

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, config.saltRounds);

  // Create a new user object
  const newUser = new User({
    username,
    password: hashedPassword,
    studentId
  });

  // Try to save the user to the database
  try {
    await newUser.save();
  } catch (err) {
    console.error(err);
    return "unknownError";
  }

  // Return true if the user was saved successfully
  return true;
}

router.post(
  "/register",
  async (req, res) => {
    try {
      // Save the new user to the database
      const result = await registerUser({ username: req.body.username, password: req.body.password, studentId: req.body.studentId });
      
      // Return error if registration failed
      if (result !== true)
        return res.status(400).json({ status: false, errors: result })

      // Save the new user object to the current session
      const newUser = await User.findOne({ username: req.body.username.trim().toLowerCase() })
      await new Promise((resolve, reject) => {
        req.login(newUser, (err) => {
          if (err) reject(err);
          resolve(newUser)
        })
      })

      // Return success
      res.json({ status: true })
    } catch (err) {
      // Return an error if anything failed
      console.error("Failed to register", err);
      res.status(500).json({
        status: false,
        error: err
      })
    }
  }
);

router.post(
  "/login",
  (req, res, next) => {
    // Authenticate using the provided username and password
    passport.authenticate('local', function (err, user) {
      if (err) return res.status(500).json({ status: false, error: err })
      if (!user) return res.status(400).json({ status: false })

      req.logIn(user, function (err) {
        if (err) return res.json({ status: false, error: err })
        
        // If successful, move onto the next stage of middleware
        return next();
      });
    })(req, res, next);
  },
  (_, res) => {
    res.json({
      status: true
    })
  }
);

router.post(
  "/logout",
  (req, res) => {
    // Destroy session
    req.logout();
    res.json({ status: true });
  }
);

module.exports = router;
