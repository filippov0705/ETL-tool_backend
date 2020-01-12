const express = require("express");
const procedureController = require("../controllers/procedureController.js");
const router = express.Router();
 
router.route("/main/:id").get(procedureController.getAllProcedures);
router.route("/new(/:id)?")
    .get(procedureController.getPossibleTasks)
    .post(procedureController.createNewProcedure);
router.route("/schedules/:userId/:procedureId")
    .get(procedureController.getProcedureSchedules)
    .post(procedureController.postNewSchedule)
    .delete(procedureController.deleteSchedule)
    .put(procedureController.editSchedule)
 
module.exports = router;