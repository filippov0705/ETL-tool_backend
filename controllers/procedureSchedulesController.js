const procedureRepository = require("@repository/procedureRepository");
const taskRepository = require("@repository/taskRepository");
const scheduleRepository = require("@repository/scheduleRepository");
const scheduleService = require("@services/scheduleService");
const schedules = require("@schedules/index");
const scheduleMapper = require("@mappers/scheduleMapper");
const constantRepository = require("@repository/constantRepository");

const {ERROR} = require("@constants/constants");

class ProcedureSchedulesController {
    async getTargetProcedure(req, res) {
        try {
            const {procedureId} = req.params;

            const procedureData = await procedureRepository.findOne(procedureId);
            const tasksData = await taskRepository.findTasks(procedureData.dataValues.procedure_id);
            const tasks = tasksData.map(item => {
                return {id: item.task_id, name: item.task_name, settings: item.task_settings};
            });
            const schedulesData = await scheduleRepository.getSchedules(procedureId);
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
            await scheduleRepository.deleteSchedule(scheduleId);
            res.status(200).send(200);
        } catch (e) {
            res.status(400).send({message: ERROR});
        }
    }

    async postNewSchedule(req, res) {
        try {
            const {procedureId} = req.params;
            const newSchedule = req.body;
            newSchedule.periodicity = await constantRepository.getConstantId(newSchedule.periodicity);
            await scheduleRepository.createSchedule(procedureId, newSchedule);
            if (scheduleService.isInHourInterval(newSchedule)) {
                await schedules.addProcedureToCron(procedureId, newSchedule);
            }
            res.status(200).send(200);
        } catch (e) {
            res.status(400).send({message: ERROR});
        }
    }

    async editSchedule(req, res, next) {
        try {
            const {scheduleId} = req.params;
            const newSchedule = req.body;
            await schedules.deleteProcedureFromCron(scheduleId);
            await scheduleRepository.editSchedule(scheduleId, newSchedule);

            const procedureId = await scheduleService.findScheduleProcedure(scheduleId);
            if (scheduleService.isInHourInterval(newSchedule)) {
                await schedules.addProcedureToCron(procedureId, newSchedule);
            }
            next();
        } catch (e) {
            res.status(400).send({message: ERROR});
        }
    }
}

module.exports = new ProcedureSchedulesController();
