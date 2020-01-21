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
            req.user = { targetProcedureTasks };
            next();
        } catch (e) {
            res.status(400).send(JSON.stringify({message: ERROR}));
        }
    }
}

module.exports = new ProcedureParametersController();
