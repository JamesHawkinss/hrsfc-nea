const mongoose = require('mongoose');

function connectDb() {
  return new Promise((resolve, reject) => {
    mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: process.env.ADD_INDEXES == "true"
    });

    const db = mongoose.connection;
    db.on('error', (err) => {
      console.error("connection error: ", err);
      reject(err);
    });
    db.once('open', function() {
      resolve(true);
    });
  });
}

module.exports = {
  async setupDb() {
    await connectDb();
  },
}
