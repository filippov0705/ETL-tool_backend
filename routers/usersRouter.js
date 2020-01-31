const express = require("express");
const usersController = require("@controllers/usersController");
const userMiddleware = require("@middlewares/userMiddleware");
const rolesController = require("@controllers/rolesController");

const router = express.Router();

router.route("/").get(userMiddleware.getUserParams, usersController.getUsers);
router
    .route("/roles")
    .get(rolesController.getRoles)
    .patch(rolesController.addRole);

module.exports = router;
