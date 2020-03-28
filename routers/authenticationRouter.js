const express = require("express");
const registratinController = require("@controllers/registrationController.js");
const accessTokenMiddlvare = require("@middlewares/accessTokenMiddlvare");

const router = express.Router();

router
    .route("/")
    .post(accessTokenMiddlvare.registration, registratinController.newUserCreation)
    .put(registratinController.logOut);

module.exports = router;
