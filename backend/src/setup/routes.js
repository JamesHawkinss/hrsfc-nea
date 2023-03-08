const testRouter = require('../routes/test');
const userRouter = require('../routes/user');
const authRouter = require('../routes/auth');
const timetableRouter = require('../routes/timetable');
const sharedTimetableRouter = require('../routes/sharedTimetable');
const friendRouter = require('../routes/friends');

const express = require("express");
const apiVersion = "v1";

module.exports = (app) => {
  // Create a new router, parse bodies as json
  const router = express.Router();
  router.use(express.json());
  
  // Define routes, pass traffic to individual routers
  router.use('/users', userRouter);
  router.use('/auth', authRouter);
  router.use('/timetable', timetableRouter);
  router.use('/timetable/shared', sharedTimetableRouter);
  router.use('/friends', friendRouter);

  // All routes fall under /api/v1
  app.use(`/api/${apiVersion}`, router);

  // Setup 404 route for all unknown traffic
  app.use((_, res) => {
    res.status(404).json({
      error: "Unknown endpoint"
    });
  });
};
