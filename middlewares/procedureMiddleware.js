const taskRepository = require("@repository/taskRepository");
const taskMapper = require("@mappers/taskMapper");
const {ERROR} = require("@constants/constants");

class ProcedureMiddleware {
    async getProcedureTasks(req, res, next) {
        try {
            const {procedureId} = req.params;
            const tasksData = await taskRepository.findTasks(procedureId);
            const targetProcedureTasks = taskMapper.normalizeTasksForProcedure(tasksData);
            req.user = {targetProcedureTasks};
            next();
        } catch (e) {
            res.status(400).send({message: ERROR});
        }
    }
}

module.exports = new ProcedureMiddleware();
