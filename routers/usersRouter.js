const express = require("express");
const usersController = require("@controllers/usersController");
const userMiddleware = require("@middlewares/userMiddleware");

const router = express.Router();

router.route("/").get(userMiddleware.getUserParams, usersController.getUsers);

module.exports = router;
