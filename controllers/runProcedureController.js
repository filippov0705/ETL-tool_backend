const runProcedureService = require("@services/runProcedureService");
const randomInt = require("random-int");
const logsService = require("@services/logsService");
const taskService = require("@services/taskService");
const procedureService = require("@services/procedureService");
const taskMapper = require("@mappers/taskMapper");
const {RUN_ERROR} = require("@constants/constants");

class RunProcedureController {
    async runProcedure(req, res) {
        try {
            const {procedureId} = req.params;
            const log = await runProcedureService.procedureActionsChain(req.user.targetProcedureTasks, {}, []);

            logsService.createLog(log, procedureId);

            res.status(200).send({});
        } catch (e) {
            res.status(400).send(JSON.stringify({message: RUN_ERROR}));
        }
    }

    async runTaskBySchedule(procedure_id) {
        const tasks = await taskService.getProcedureTasks(procedure_id);
        const normalizedTasks = taskMapper.normalizeTasksForProcedure(tasks);
        const timeMark = await procedureService.getLastRunTimeMark(procedure_id);
        if (new Date(timeMark).getTime() === new Date().getTime()) return;
        await procedureService.makeRunMark(procedure_id);
        const log = await runProcedureService.procedureActionsChain(normalizedTasks, {}, []);
        logsService.createLog(log, procedure_id);
    }
}

module.exports = new RunProcedureController();
