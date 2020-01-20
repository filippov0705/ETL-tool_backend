const express = require("express");
const RegistratinController = require("@controllers/registrationController.js");

const router = express.Router();

router.route("/registration").post(RegistratinController.registration);

module.exports = router;
