const express = require("express");
const registratinController = require("@controllers/registrationController.js");

const router = express.Router();

router.route("/").post(registratinController.newUserCreation);

module.exports = router;
