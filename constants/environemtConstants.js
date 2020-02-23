const path = require("path");
const env = require("dotenv").config({path: path.resolve(__dirname, "../.env")});
const envDatabase = require("dotenv").config({path: path.resolve(__dirname, "../.envDatabase")});

module.exports = {
    ROUTING_MAIL: env.parsed.routingMail,
    ROUTING_MAIL_PASSWORD: env.parsed.routingMailPassword,
    CLIENT_ID: env.parsed.client_id,
    CLIENT_SECRET: env.parsed.client_secret,
    DATA_BASE_NAME: envDatabase.parsed.dataBaseName,
    USER_NAME: envDatabase.parsed.userName,
    PASSWORD: envDatabase.parsed.password,
    DIALECT: envDatabase.parsed.dialect,
    HOST: envDatabase.parsed.host,
    CLIENT_ID: envDatabase.parsed.clientId,
    CLIENT_SECRET: envDatabase.parsed.clientSecret
};
