require('module-alias/register');

const procedureService = require("@services/procedureService");
const usersFile = "../frontend/src/mockData/mockData.json";

const { ERROR } =  require("@constants/constants");

class ProcedureSchedulesController {
    getProcedureSchedules(req, res) {
        try {
            const user = procedureService.getFileFromDB(usersFile).find(item => item.userId === Number(req.params.userId));
            const procedure = user.data.find(item => item.id === Number(req.params.procedureId));
            res.send(JSON.stringify(procedure));
        } catch (e) {
            res.send(JSON.stringify({status: ERROR}));
        }
    }

    deleteSchedule(req, res) {
        try {
            const newUserFile = procedureService.getFileFromDB(usersFile).map(item => {
                if (item.userId === Number(req.params.userId)) {
                    item.data.map(procedure => {
                        if (procedure.id === Number(req.params.procedureId)) {
                            procedure.schedule = procedure.schedule.filter(schedule => schedule.id !== req.body.id);
                        }
                        return procedure;
                    });
                }
                return item;
            });

            procedureService.setFileToDB(usersFile, newUserFile);
            const newProcedure = newUserFile.find(item => item.userId === Number(req.params.userId)).data.find(item => item.id === Number(req.params.procedureId));
            res.send(JSON.stringify(newProcedure));
        } catch (e) {
            res.send(JSON.stringify({status: ERROR}));
        }
    }

    postNewSchedule(req, res) {
        try {
            const newUserFile = procedureService.getFileFromDB(usersFile).map(item => {
                if (item.userId === Number(req.params.userId)) {
                    item.data.map(procedure => {
                        if (procedure.id === Number(req.params.procedureId)) {
                            procedure.schedule = [...procedure.schedule, req.body]
                        }
                        return procedure;
                    });
                }
                return item;
            });

            procedureService.setFileToDB(usersFile, newUserFile);
            const newProcedure = newUserFile.find(item => item.userId === Number(req.params.userId)).data.find(item => item.id === Number(req.params.procedureId));
            res.send(JSON.stringify(newProcedure));
        } catch (e) {
            res.send(JSON.stringify({status: ERROR}));
        }
    }

    editSchedule(req, res) {
        try {
            const newUserFile = procedureService.getFileFromDB(usersFile).map(item => {
                if (item.userId === Number(req.params.userId)) {
                    item.data.map(procedure => {
                        if (procedure.id === Number(req.params.procedureId)) {
                            procedure.schedule = procedure.schedule.map(schedule => {
                                if (schedule.id === req.body.id) {
                                    schedule = req.body;
                                }
                                return schedule;
                            })
                        }
                        return procedure;
                    });
                }
                return item;
            });

            procedureService.setFileToDB(usersFile, newUserFile);
            const newProcedure = newUserFile.find(item => item.userId === Number(req.params.userId)).data.find(item => item.id === Number(req.params.procedureId));
            res.send(JSON.stringify(newProcedure));
        } catch (e) {
            res.send(JSON.stringify({status: ERROR}));
        }
    }
}

module.exports = new ProcedureSchedulesController();