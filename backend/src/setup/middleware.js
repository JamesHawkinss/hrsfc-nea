const express = require("express");
const cors = require("cors");

module.exports = {
  setupMiddleware(app) {
    // parse bodies
    app.use(express.json());

    if (process.env.CORS.length > 0)
      app.use(cors({
        origin: process.env.CORS.split(" "),
        credentials: true
      }))
  },
  setupAfterware(app) {
    app.use((err, _, res, next) => {
      if (err instanceof SyntaxError && err.status === 400 && 'body' in err)
        return res.status(400).send({ status: false, error: { name: "malformedJSONInput" }});
      next();
    });
  }
};
