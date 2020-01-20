const procedureService = require("@services/procedureService");
const usersFile = "./mockData/mockData.json";

const {ERROR} = require("@constants/constants");

class ProcedureParametersController {
    getProcedureTasks(req, res, next) {
        try {
            const targetProcedureTasks = procedureService
                .getFileFromDB(usersFile)
                .find(item => item.userId === Number(req.params.id))
                .data.find(item => item.id === Number(req.params.procedureId)).tasks;
            res.targetProcedureTasks = targetProcedureTasks;
            next();
        } catch (e) {
            res.send(JSON.stringify({status: ERROR}));
        }
    }
}

module.exports = new ProcedureParametersController();
