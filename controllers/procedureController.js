const procedureService = require("../services/procedureServece");
const usersFile = "./mockData/mockData.json";
const possibleTasksFile = "./mockData/possibleTasks.json";

class ProcedureController {
    getAllProcedures(req, res) {
        const user = procedureService.getFileFromDB(usersFile).find(item => item.userId === +req.params.id);
        if(user) {
            const data = user.data.map(item => {
                return {name: item.name, id: item.id}
            });
            res.send(JSON.stringify(data));
        } else {
            res.send(JSON.stringify([]));
        }
    }

    getPossibleTasks(req, res) {
        res.send(JSON.stringify(procedureService.getFileFromDB(possibleTasksFile)));
    }

    createNewProcedure(req, res) {
    const newUserFile = procedureService.getFileFromDB(usersFile).map(item => {
        if(item.userId === +req.params.id) {
            item.data = [...item.data, req.body]
        }
        return item;
    });

    procedureService.setFileToDB(usersFile, newUserFile);
    res.send("404");
    }

    getProcedureSchedules(req, res) {
        const user = procedureService.getFileFromDB(usersFile).find(item => item.userId === +req.params.userId);
        const procedure = user.data.find(item => item.id === +req.params.procedureId);
        res.send(JSON.stringify(procedure));
    }

    deleteSchedule(req, res) {
        const newUserFile = procedureService.getFileFromDB(usersFile).map(item => {
            if(item.userId === +req.params.userId) {
                item.data.map(procedure => {
                    if(procedure.id === +req.params.procedureId) {
                        procedure.schedule = procedure.schedule.filter(schedule => schedule.id !== req.body.id);
                    }
                    return procedure;
                });
            }
            return item;
        });

        const newProcedure = newUserFile.find(item => item.userId === +req.params.userId).data.find(item => item.id === +req.params.procedureId);
        procedureService.setFileToDB(usersFile, newUserFile);
        res.send(JSON.stringify(newProcedure));
    }

    postNewSchedule(req, res) {
        const newUserFile = procedureService.getFileFromDB(usersFile).map(item => {
            if(item.userId === +req.params.userId) {
                item.data.map(procedure => {
                    if(procedure.id === +req.params.procedureId) {
                        procedure.schedule = [...procedure.schedule, req.body]
                    }
                    return procedure;
                });
            }
            return item;
        });

        procedureService.setFileToDB(usersFile, newUserFile);
        const newProcedure = newUserFile.find(item => item.userId === +req.params.userId).data.find(item => item.id === +req.params.procedureId);
        res.send(JSON.stringify(newProcedure));
    }

    editSchedule(req, res) {
        const newUserFile = procedureService.getFileFromDB(usersFile).map(item => {
            if(item.userId === +req.params.userId) {
                item.data.map(procedure => {
                    if(procedure.id === +req.params.procedureId) {
                        procedure.schedule = procedure.schedule.map(schedule => {
                            if(schedule.id === req.body.id) {
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
        const newProcedure = newUserFile.find(item => item.userId === +req.params.userId).data.find(item => item.id === +req.params.procedureId);
        res.send(JSON.stringify(newProcedure));
    }
}

module.exports = new ProcedureController();