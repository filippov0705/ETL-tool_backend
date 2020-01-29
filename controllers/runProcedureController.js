const runProcedureService = require("@services/runProcedureService");
const {RUN_ERROR} = require("@constants/constants");

class RunProcedureController {
    async runProcedure(req, res) {
        try {
            await runProcedureService.procedureActionsChain(req.user.targetProcedureTasks, {});
            res.status(200);
        } catch (e) {
            res.status(400).send(JSON.stringify({message: RUN_ERROR}));
        }
    }
}

module.exports = new RunProcedureController();
