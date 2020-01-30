const express = require("express");
const registratinController = require("@controllers/registrationController.js");

const router = express.Router();

router.route("/").get(registratinController.testCookie);

module.exports = router;
