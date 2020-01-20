const procedureService = require("@services/procedureService");
const usersFile = "./mockData/mockData.json";

const {ERROR} = require("@constants/constants");

class EditProcedureController {
    changeProcedureName(req, res) {
        try {
            const newUserFile = procedureService.getFileFromDB(usersFile).map(item => {
                if (item.userId === Number(req.params.userId)) {
                    item.data.map(procedure => {
                        if (procedure.id === Number(req.params.procedureId)) {
                            procedure.name = req.body.newName;
                        }
                        return procedure;
                    });
                }
                return item;
            });

            procedureService.setFileToDB(usersFile, newUserFile);
            const newProcedure = newUserFile
                .find(item => item.userId === Number(req.params.userId))
                .data.find(item => item.id === Number(req.params.procedureId));
            res.send(JSON.stringify(newProcedure));
        } catch (e) {
            res.send(JSON.stringify({status: ERROR}));
        }
    }

    addNewTaskToProcedure(req, res) {
        try {
            const newUserFile = procedureService.getFileFromDB(usersFile).map(item => {
                if (item.userId === Number(req.params.userId)) {
                    item.data.map(procedure => {
                        if (procedure.id === Number(req.params.procedureId)) {
                            procedure.tasks = [...procedure.tasks, req.body.newTask];
                        }
                        return procedure;
                    });
                }
                return item;
            });

            procedureService.setFileToDB(usersFile, newUserFile);
            const newProcedure = newUserFile
                .find(item => item.userId === Number(req.params.userId))
                .data.find(item => item.id === Number(req.params.procedureId));
            res.send(JSON.stringify(newProcedure));
        } catch (e) {
            res.send(JSON.stringify({status: ERROR}));
        }
    }

    deleteTaskInProcedure(req, res) {
        try {
            const newUserFile = procedureService.getFileFromDB(usersFile).map(item => {
                if (item.userId === Number(req.params.userId)) {
                    item.data.map(procedure => {
                        if (procedure.id === Number(req.params.procedureId)) {
                            procedure.tasks = procedure.tasks.filter(task => task.id !== req.body.taskId);
                        }
                        return procedure;
                    });
                }
                return item;
            });

            procedureService.setFileToDB(usersFile, newUserFile);
            const newProcedure = newUserFile
                .find(item => item.userId === Number(req.params.userId))
                .data.find(item => item.id === Number(req.params.procedureId));
            res.send(JSON.stringify(newProcedure));
        } catch (e) {
            res.send(JSON.stringify({status: ERROR}));
        }
    }
}

module.exports = new EditProcedureController();
