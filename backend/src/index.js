const config = require("./config");
const express = require("express");
const app = express();

async function init() {
  // setup database
  await require('./setup/db').setupDb();

  // setup plugins
  const middleware = require('./setup/middleware');
  require('./setup/passport')(app);
  middleware.setupMiddleware(app);
  require('./setup/routes')(app);
  middleware.setupAfterware(app);

  // start server
  app.listen(parseInt(process.env.PORT), () => {
    console.log(`Server listening on port ${process.env.PORT}.`);
  });
}

init().catch(console.error);
