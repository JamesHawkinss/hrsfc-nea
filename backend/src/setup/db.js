const mongoose = require('mongoose');

// Create the connection to the database
function connectDb() {
  return new Promise((resolve, reject) => {
    // Connect to the database
    mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: process.env.ADD_INDEXES == "true"
    });

    // Get the connection
    const db = mongoose.connection;
    
    // Listen for errors, and reject if found
    db.on('error', (err) => {
      console.error("connection error: ", err);
      reject(err);
    });

    // Listen for a successful open event, and return
    db.once('open', function() {
      resolve(true);
    });
  });
}

// Return a setup function, which waits for a successful connection
module.exports = {
  async setupDb() {
    await connectDb();
  },
}
