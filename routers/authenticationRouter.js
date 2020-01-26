const express = require("express");
const registratinController = require("@controllers/registrationController.js");

const router = express.Router();

router.route("/")
    .post(registratinController.registration, registratinController.newUserCreation)
    .put(registratinController.logOut);

module.exports = router;
