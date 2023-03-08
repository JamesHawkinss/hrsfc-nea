const path = require("path");

// Define location of env file
require("dotenv").config({ path: path.join(__dirname, `../.env`) });

// Define required environment variables
const requiredEnv = ["PORT", "MONGO_URL", "SESSION_SECRET", "SALT_ROUNDS"];

// If a required environment variable is not present, exit
requiredEnv.forEach(v => {
    if (!process.env[v] || process.env[v].length == 0) {
        console.error(`Required environment variable missing: ${v}`);
        process.exit(1);
    }
})

// Construct configuration object, parsing variabless
const config = {
    port: parseInt(process.env.PORT),
    sessionSecret: process.env.SESSION_SECRET,
    corsDomains: (process.env.CORS || "").split(" ").filter(v=>v.length>0),
    saltRounds: parseInt(process.env.SALT_ROUNDS),
}

module.exports = config;
