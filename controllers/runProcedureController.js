const runProcedureService = require("@services/runProcedureService");

const {ERROR} = require("@constants/constants");

class RunProcedureController {
    runProcedure(req, res, next) {
        try {
            runProcedureService.procedureActionsChain(res.targetProcedureTasks);
            res.send("404");
        } catch (e) {
            res.send(JSON.stringify({status: ERROR}));
        }
    }
}

module.exports = new RunProcedureController();
