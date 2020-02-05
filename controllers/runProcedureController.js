const runProcedureService = require("@services/runProcedureService");
const taskService = require("@services/taskService");
const procedureService = require("@services/procedureService");
const taskMapper = require("@mappers/taskMapper");
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

    async runTaskBySchedule(procedure_id) {
        const tasks = await taskService.getProcedureTasks(procedure_id);
        const normalizedTasks = taskMapper.normalizeTasks(tasks);
        const timeMark = await procedureService.getLastRunTimeMark(procedure_id);
        if (new Date(timeMark).getTime() === new Date().getTime()) return;
        await procedureService.makeRunMark(procedure_id);
        await runProcedureService.procedureActionsChain(normalizedTasks, {});
    }
}

module.exports = new RunProcedureController();
