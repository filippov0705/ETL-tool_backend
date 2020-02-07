const procedureService = require("@services/procedureService");
const taskService = require("@services/taskService");
const scheduleService = require("@services/scheduleService");
const schedules = require("@schedules/index");
const scheduleMapper = require("@mappers/scheduleMapper");
const taskMapper = require("@mappers/taskMapper");
const constantsService = require("@services/constantsService");

const {ERROR} = require("@constants/constants");

class ProcedureSchedulesController {
    async getTargetProcedure(req, res) {
        try {
            const {procedureId} = req.params;

            const procedureData = await procedureService.findProcedure(procedureId);
            const tasksData = await taskService.findTasks(procedureData.dataValues.procedure_id);
            const tasks = taskMapper.normalizeTasksForProcedure(tasksData);
            const schedulesData = await scheduleService.getSchedules(procedureId);
            const schedule = await scheduleMapper.transformScheduleData(schedulesData);
            const procedure = {
                name: procedureData.dataValues.procedure_name,
                id: procedureData.dataValues.procedure_id,
                schedule,
                tasks,
            };
            res.status(200).send(procedure);
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
