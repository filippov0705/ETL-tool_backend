const procedureService = require("@services/procedureService");
const {ERROR} = require("@constants/constants");

const usersFile = "./mockData/mockData.json";

class ProcedureInfoController {
    editTaskSettings(req, res) {
        try {
            const { userId, procedureId, taskId, newSettings } = req.body;
            const newUserFile = procedureService.getFileFromDB(usersFile).map(item => {
                if (item.userId === Number(userId)) {
                    item.data.map(procedure => {
                        if (procedure.id === Number(procedureId)) {
                            procedure.tasks = procedure.tasks.map(task => {
                                if (task.id === Number(taskId)) {
                                    task.settings[newSettings.parameter] = newSettings.newValue;
                                }
                                return task;
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
            res.send(JSON.stringify(newProcedure));
        } catch (e) {
            res.send(JSON.stringify({status: ERROR}));
        }
    }
}

module.exports = new ProcedureInfoController();
