const express = require("express");
const cors = require("cors");

module.exports = {
  setupMiddleware(app) {
    // Parse request bodies to make readable json
    app.use(express.json());

    // If CORS domains defined, allow requests from those origins
    if (process.env.CORS.length > 0)
      app.use(cors({
        origin: process.env.CORS.split(" "),
        credentials: true
      }))
  },
  setupAfterware(app) {
    app.use((err, _, res, next) => {
      // If request malformed, or incorrectly parsed, return
      if (err instanceof SyntaxError && err.status === 400 && 'body' in err)
        return res.status(400).send({ status: false, error: { name: "malformedJSONInput" }});
      next();
    });
  }
};
