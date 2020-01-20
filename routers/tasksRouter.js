require('module-alias/register');

const express = require("express");
const taskController = require("@controllers/taskController.js");

const router = express.Router();

router.route("/mailing").get(taskController.mailing);
router.route("/statistics").get(taskController.getStatistics);
router.route("/tasks").get(taskController.getTasksTypes);

module.exports = router;
