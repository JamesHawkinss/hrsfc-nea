const path = require("path");
require("dotenv").config({ path: path.join(__dirname, `../.env`) });

const requiredEnv = ["PORT", "MONGO_URL", "SESSION_SECRET", "SALT_ROUNDS"];

requiredEnv.forEach(v => {
    if (!process.env[v] || process.env[v].length == 0) {
        console.error(`Required environment variable missing: ${v}`);
        process.exit(1);
    }
})

const config = {
    port: parseInt(process.env.PORT),
    sessionSecret: process.env.SESSION_SECRET,
    corsDomains: (process.env.CORS || "").split(" ").filter(v=>v.length>0),
    saltRounds: parseInt(process.env.SALT_ROUNDS),
}

module.exports = config;
