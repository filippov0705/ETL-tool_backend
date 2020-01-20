const path = require("path");
const env = require("dotenv").config({path: path.resolve(__dirname, "../.env")});

module.exports = {
    ROUTING_MAIL: env.parsed.routingMail,
    ROUTING_MAIL_PASSWORD: env.parsed.routingMailPassword,
    CLIENT_ID: env.parsed.client_id,
    CLIENT_SECRET: env.parsed.client_secret
};
