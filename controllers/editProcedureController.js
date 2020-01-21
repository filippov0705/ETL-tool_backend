const procedureService = require("@services/procedureService");
const {ERROR} = require("@constants/constants");

const usersFile = "./mockData/mockData.json";

class EditProcedureController {
    changeProcedureName(req, res) {
        try {
            const { userId, procedureId } = req.params;
            const newUserFile = procedureService.getFileFromDB(usersFile).map(item => {
                if (item.userId === Number(userId)) {
                    item.data.map(procedure => {
                        if (procedure.id === Number(procedureId)) {
                            procedure.name = req.body.newName;
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
            res.send(JSON.stringify(newProcedure));
        } catch (e) {
            res.status(400).send(JSON.stringify({message: ERROR}));
        }
    }

    addNewTaskToProcedure(req, res) {
        try {
            const { userId, procedureId } = req.params;
            const newTask = req.body.newTask;
            const newUserFile = procedureService.getFileFromDB(usersFile).map(item => {
                if (item.userId === Number(userId)) {
                    item.data.map(procedure => {
                        if (procedure.id === Number(procedureId)) {
                            procedure.tasks = [...procedure.tasks, newTask];
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

    deleteTaskInProcedure(req, res) {
        try {
            const { userId, procedureId } = req.params;
            const deletedTaskId = req.body.taskId;
            const newUserFile = procedureService.getFileFromDB(usersFile).map(item => {
                if (item.userId === Number(userId)) {
                    item.data.map(procedure => {
                        if (procedure.id === Number(procedureId)) {
                            procedure.tasks = procedure.tasks.filter(task => task.id !== deletedTaskId);
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
            console.log(newProcedure);
            res.status(200).send(JSON.stringify(newProcedure));
        } catch (e) {
            res.status(400).send(JSON.stringify({message: ERROR}));
        }
    }
}

module.exports = new EditProcedureController();
