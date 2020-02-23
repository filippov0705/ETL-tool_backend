const scheduleService = require("@services/scheduleService");
const schedules = require("@schedules/index");
const constantsService = require("@services/constantsService");
const targetTaskService = require("@services/targetTaskService");

const {ERROR} = require("@constants/constants");

class ProcedureSchedulesController {
    async getTargetProcedure(req, res) {
        try {
            const {procedureId} = req.params;
            const targetProcedure = await targetTaskService.getTargetProcedure(procedureId);
            res.status(200).send(targetProcedure);
        } catch (e) {
            res.status(400).send({message: e});
        }
    }

    async deleteSchedule(req, res) {
        try {
            const {scheduleId} = req.params;
            await schedules.deleteProcedureFromCron(scheduleId);
            await scheduleService.deleteSchedule(scheduleId);
            res.status(200).send(200);
        } catch (e) {
            res.status(400).send({message: ERROR});
        }
    }

    async postNewSchedule(req, res) {
        try {
            const {procedureId} = req.params;
            const newSchedule = req.body;
            newSchedule.periodicity = await constantsService.getConstantId(newSchedule.periodicity);
            await scheduleService.createSchedule(procedureId, newSchedule);
            await schedules.addProcedureToCron(procedureId, newSchedule);
            res.status(200).send(200);
        } catch (e) {
            res.status(400).send({message: ERROR});
        }
    }

    async editSchedule(req, res) {
        try {
            const {scheduleId} = req.params;
            const newSchedule = req.body;
            await schedules.deleteProcedureFromCron(scheduleId);
            await scheduleService.editSchedule(scheduleId, newSchedule);
            const procedureId = await scheduleService.findScheduleProcedure(newSchedule.schedule_id);
            await schedules.addProcedureToCron(procedureId, newSchedule);
            res.status(200).send(200);
        } catch (e) {
            res.status(400).send({message: ERROR});
        }
    }
}

module.exports = new ProcedureSchedulesController();
