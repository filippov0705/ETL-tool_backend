const runProcedureService = require("@services/runProcedureService");
const {RUN_ERROR} = require("@constants/constants");

class RunProcedureController {
    runProcedure(req, res, next) {
        try {
            runProcedureService.procedureActionsChain(res.ctx.targetProcedureTasks);
            res.status(200);
        } catch (e) {
            res.status(400).send(JSON.stringify({message: RUN_ERROR}));
        }
    }
}

module.exports = new RunProcedureController();
