const express = require("express");
const passport = require("passport");
const { User } = require("../models/User");
const router = express.Router();
const bcrypt = require('bcrypt')
const config = require('../config');

async function registerUser({ username, password, studentId }) {
  if (typeof username !== 'string')
    return "invalidUsername"

  if (typeof password !== 'string')
    return "invalidPassword"

  const hashedPassword = await bcrypt.hash(password, config.saltRounds);

  const newUser = new User({
    username,
    password: hashedPassword,
    studentId
  });

  try {
    await newUser.save();
  } catch (err) {
    console.error(err);
    return "unknownError";
  }

  return true;
}

router.post(
  "/register",
  async (req, res) => {
    try {
      const result = await registerUser({ username: req.body.username, password: req.body.password, studentId: req.body.studentId });
      if (result !== true)
        return res.status(400).json({ status: false, errors: result })

      const newUser = await User.findOne({ username: req.body.username.trim().toLowerCase() })
      await new Promise((resolve, reject) => {
        req.login(newUser, (err) => {
          if (err) reject(err);
          resolve(newUser)
        })
      })

      res.json({ status: true })
    } catch (err) {
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
    passport.authenticate('local', function (err, user) {
      if (err) return res.status(500).json({ status: false, error: err })
      if (!user) return res.status(400).json({ status: false })

      req.logIn(user, function (err) {
        if (err) return res.json({ status: false, error: err })
          
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
    req.logout();
    res.json({ status: true });
  }
);

module.exports = router;
