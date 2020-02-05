const express = require("express");

const procedureController = require("@controllers/procedureController.js");
const taskController = require("@controllers/taskController.js");
const runProcedureController = require("@controllers/runProcedureController");
const newProcedureController = require("@controllers/newProcedureController");
const procedureSchedulesController = require("@controllers/procedureSchedulesController");
const editProcedureController = require("@controllers/editProcedureController");
const procedureInfoController = require("@controllers/procedureInfoController");
const userMiddleware = require("@middlewares/userMiddleware");
const procedureMiddleware = require("@middlewares/procedureMiddleware");

const router = express.Router();

router.route("/main/:id").get(userMiddleware.getUserParams, procedureController.getAllProcedures);

router
    .route("/:id/:procedureId")
    .get(procedureMiddleware.getProcedureTasks, runProcedureController.runProcedure)
    .delete(userMiddleware.getUserParams, procedureController.deleteProcedure);
router.route("/tasks").get(taskController.getTasksTypes);
router.route("/new/:id").post(userMiddleware.getUserParams, newProcedureController.createNewProcedure);
router
    .route("/target/:userId/:procedureId")
    .get(userMiddleware.getUserParams, procedureSchedulesController.getTargetProcedure);

router
    .route("/:procedureId/schedules/:scheduleId")
    .put(procedureSchedulesController.editSchedule, procedureSchedulesController.getTargetProcedure);

router
    .route("/:procedureId/schedules")
    .post(procedureSchedulesController.postNewSchedule);

router.route("/:procedureId/schedules/:scheduleId").delete(procedureSchedulesController.deleteSchedule);

router.route("/:procedureId").patch(editProcedureController.changeProcedureName);

router.route("/:procedureId/tasks").post(editProcedureController.addNewTaskToProcedure);

router.route("/:procedureId/tasks/:taskId").delete(editProcedureController.deleteTaskInProcedure);

router.route("/info").put(procedureInfoController.editTaskSettings);

module.exports = router;
