const procedureService = require("@services/procedureService");
const {ERROR} = require("@constants/constants");

const usersFile = "./mockData/mockData.json";

class ProcedureInfoController {
    editTaskSettings(req, res) {
        try {
            const newUserFile = procedureService.getFileFromDB(usersFile).map(item => {
                if (item.userId === Number(req.body.userId)) {
                    item.data.map(procedure => {
                        if (procedure.id === Number(req.body.procedureId)) {
                            procedure.tasks = procedure.tasks.map(task => {
                                if (task.id === Number(req.body.taskId)) {
                                    task.settings[req.body.newSettings.parameter] = req.body.newSettings.newValue;
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
                .find(item => item.userId === Number(req.body.userId))
                .data.find(item => item.id === Number(req.body.procedureId));
            res.send(JSON.stringify(newProcedure));
        } catch (e) {
            res.send(JSON.stringify({status: ERROR}));
        }
    }
}

module.exports = new ProcedureInfoController();
