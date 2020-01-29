const procedureRepository = require("@repository/procedureRepository");
const taskRepository = require("@repository/taskRepository");
const scheduleRepository = require("@repository/scheduleRepository");
const {ERROR} = require("@constants/constants");

class ProcedureSchedulesController {
    async getTargetProcedure(req, res) {
        try {
            const {procedureId} = req.params;

            const procedureData = await procedureRepository.findOne(procedureId);
            const tasksData = await taskRepository.findTasks(procedureData.dataValues.procedure_id);
            tasksData.sort((a, b) => {
                if (a.task_order > b.task_order) return 1;
                if (a.task_order < b.task_order) return -1;
            });
            const tasks = tasksData.map(item => {
                return {id: item.task_id, name: item.task_name, settings: item.task_settings};
            });
            const schedulesData = await scheduleRepository.getSchedules(procedureId);
            const schedule = schedulesData.map(item => {
                const value = [];
                if (item.periodicity === 1) {
                    value.push(item.year, item.month, item.day, item.hour, item.minute);
                } else {
                    if (item.monday) value.push("Mon");
                    if (item.tuesday) value.push("Tue");
                    if (item.wednsday) value.push("Wed");
                    if (item.thursday) value.push("Thu");
                    if (item.friday) value.push("Fri");
                    if (item.saturday) value.push("Sat");
                    if (item.sunday) value.push("Sun");
                    value.push(item.hour, item.minute);
                }
                return {
                    id: item.schedule_id,
                    value,
                    periodicity: item.periodicity === 1 ? "Single" : "Periodically",
                };
            });
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
            await scheduleRepository.deleteSchedule(scheduleId);
            res.status(200).send(200);
        } catch (e) {
            res.status(400).send({message: ERROR});
        }
    }

    async postNewSchedule(req, res, next) {
        try {
            const {procedureId} = req.params;
            const newSchedule = req.body;
            await scheduleRepository.createSchedule(procedureId, newSchedule);
            next();
        } catch (e) {
            res.status(400).send({message: ERROR});
        }
    }

    async editSchedule(req, res, next) {
        try {
            const newSchedule = req.body;
            await scheduleRepository.editSchedule(newSchedule.id, newSchedule);
            // res.status(200).send(200);
            next();
        } catch (e) {
            res.status(400).send({message: ERROR});
        }
    }
}

module.exports = new ProcedureSchedulesController();
