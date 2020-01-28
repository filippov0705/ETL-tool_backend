const procedureService = require("@services/procedureService");
const procedureRepository = require("@repository/procedureRepository");
const taskRepository = require("@repository/taskRepository");
const scheduleRepository = require("@repository/scheduleRepository");
const {ERROR} = require("@constants/constants");

const usersFile = "./mockData/mockData.json";

//{ id: 44917509, value: [ 2020, 1, 25, 20, 25 ], periodicity: 'Single' }
//
//{
//    id: 43487638,
//        value: [ 'Mon', 'Tue', 'Wed', 16, 26 ],
//    periodicity: 'Periodically'
//}

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
            const schedules = await scheduleRepository.getSchedules(procedureId);

            const procedure = {
                name: procedureData.dataValues.procedure_name,
                id: procedureData.dataValues.procedure_id,
                schedule: [],
                tasks,
            };
            res.status(200).send(procedure);
        } catch (e) {
            res.status(400).send({message: e});
        }
    }

    deleteSchedule(req, res) {
        try {
            const {userId, procedureId} = req.params;
            const {id} = req.body;
            const newUserFile = procedureService.getFileFromDB(usersFile).map(item => {
                if (item.userId === Number(userId)) {
                    item.data.map(procedure => {
                        if (procedure.id === Number(procedureId)) {
                            procedure.schedule = procedure.schedule.filter(schedule => schedule.id !== id);
                        }
                        return procedure;
                    });
                }
                return item;
            });

            procedureService.setFileToDB(usersFile, newUserFile);
            const newProcedure = newUserFile
                .find(item => item.userId === Number(userId))
                .data.find(item => item.id === Number(procedureId));
            res.status(200).send(JSON.stringify(newProcedure));
        } catch (e) {
            res.status(400).send(JSON.stringify({message: ERROR}));
        }
    }

    async postNewSchedule(req, res) {
        try {
            const {procedureId} = req.params;
            const newSchedule = req.body;
            console.log(newSchedule);
            await scheduleRepository.createSchedule(procedureId, newSchedule);
            res.status(200).send(200);
        } catch (e) {
            res.status(400).send({message: ERROR});
        }
    }

    editSchedule(req, res) {
        try {
            const {userId, procedureId} = req.params;
            const newSchedule = req.body;
            const newUserFile = procedureService.getFileFromDB(usersFile).map(item => {
                if (item.userId === Number(userId)) {
                    item.data.map(procedure => {
                        if (procedure.id === Number(procedureId)) {
                            procedure.schedule = procedure.schedule.map(schedule => {
                                if (schedule.id === newSchedule.id) {
                                    schedule = newSchedule;
                                }
                                return schedule;
                            });
                        }
                        return procedure;
                    });
                }
                return item;
            });

            procedureService.setFileToDB(usersFile, newUserFile);
            const newProcedure = newUserFile
                .find(item => item.userId === Number(userId))
                .data.find(item => item.id === Number(procedureId));
            res.status(200).send(JSON.stringify(newProcedure));
        } catch (e) {
            res.status(400).send(JSON.stringify({message: ERROR}));
        }
    }
}

module.exports = new ProcedureSchedulesController();
