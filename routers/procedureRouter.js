const express = require("express");

const procedureController = require("@controllers/procedureController.js");
const taskController = require("@controllers/taskController.js");
const procedureParametersController = require("@controllers/procedureParametersController");
const runProcedureController = require("@controllers/runProcedureController");
const newProcedureController = require("@controllers/newProcedureController");
const procedureSchedulesController = require("@controllers/procedureSchedulesController");
const editProcedureController = require("@controllers/editProcedureController");
const procedureInfoController = require("@controllers/procedureInfoController");
const userMiddleware = require("@middlewares/userMiddleware");

const router = express.Router();

router.route("/main/:id").get(userMiddleware.getUserParams, procedureController.getAllProcedures);

router
    .route("/:id/:procedureId")
    .get(procedureParametersController.getProcedureTasks, runProcedureController.runProcedure)
    .delete(userMiddleware.getUserParams, procedureController.deleteProcedure);
router.route("/tasks").get(taskController.getTasksTypes);
router.route("/new/:id").post(userMiddleware.getUserParams, newProcedureController.createNewProcedure);
router.route("/target/:userId/:procedureId").get(userMiddleware.getUserParams, procedureSchedulesController.getTargetProcedure);
router
    .route("/schedules/:userId/:procedureId")
    .post(procedureSchedulesController.postNewSchedule)
    .delete(procedureSchedulesController.deleteSchedule)
    .put(procedureSchedulesController.editSchedule);

router
    .route("/edit/:userId/:procedureId")
    .put(editProcedureController.changeProcedureName)
    .post(editProcedureController.addNewTaskToProcedure)
    .delete(editProcedureController.deleteTaskInProcedure);

router.route("/info").put(procedureInfoController.editTaskSettings);

module.exports = router;
