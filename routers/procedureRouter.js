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

router
    .route("/")
    .get(userMiddleware.getUserParams, procedureController.getAllProcedures)
    .post(userMiddleware.getUserParams, newProcedureController.createNewProcedure);

router
    .route("/:procedureId")
    .delete(userMiddleware.getUserParams, procedureController.deleteProcedure)
    .get(userMiddleware.getUserParams, procedureSchedulesController.getTargetProcedure)
    .patch(editProcedureController.changeProcedureName);

router
    .route("/:procedureId/tasks")
    .get(procedureMiddleware.getProcedureTasks, runProcedureController.runProcedure)
    .post(editProcedureController.addNewTaskToProcedure);

router.route("/tasks").get(taskController.getTasksTypes);

router
    .route("/:procedureId/schedules/:scheduleId")
    .put(procedureSchedulesController.editSchedule)
    .delete(procedureSchedulesController.deleteSchedule);

router.route("/:procedureId/schedules").post(procedureSchedulesController.postNewSchedule);

router.route("/:procedureId/tasks/:taskId").delete(editProcedureController.deleteTaskInProcedure);

router.route("/info").put(procedureInfoController.editTaskSettings);

module.exports = router;
