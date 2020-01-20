const procedureService = require("@services/procedureService");
const {ERROR} = require("@constants/constants");

const usersFile = "./mockData/mockData.json";

class ProcedureParametersController {
    getProcedureTasks(req, res, next) {
        try {
            const { id, procedureId } = req.params;
            const targetProcedureTasks = procedureService
                .getFileFromDB(usersFile)
                .find(item => item.userId === Number(id))
                .data.find(item => item.id === Number(procedureId)).tasks;
            res.targetProcedureTasks = targetProcedureTasks;
            next();
        } catch (e) {
            res.send(JSON.stringify({status: ERROR}));
        }
    }
}

module.exports = new ProcedureParametersController();
