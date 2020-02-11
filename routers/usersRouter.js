const express = require("express");
const usersController = require("@controllers/usersController");
const userMiddleware = require("@middlewares/userMiddleware");
const rolesController = require("@controllers/rolesController");

const router = express.Router();

router.route("/").get(userMiddleware.getUserParams, usersController.getUsers);
router
    .route("/roles")
    .get(rolesController.getRoles)
    .patch(userMiddleware.getUserParams, rolesController.addRole);

router.route("/:userId/roles/:role").delete(userMiddleware.getUserParams, usersController.deleteRole);

router
    .route("/:userId")
    .patch(userMiddleware.getUserParams, usersController.changeUserParameter)
    .delete(userMiddleware.getUserParams, usersController.deleteUser);

router.route("/user/logs").post(userMiddleware.getUserParams, usersController.getUserLogs);

module.exports = router;
