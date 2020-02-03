const taskRepository = require("@repository/taskRepository");
const {ERROR} = require("@constants/constants");

class ProcedureParametersController {
    async getProcedureTasks(req, res, next) {
        try {
            const { procedureId } = req.params;
            const tasksData = await taskRepository.findTasks(procedureId);
            tasksData.sort((a, b) => {
                if (a.task_order > b.task_order) return 1;
                if (a.task_order < b.task_order) return -1;
            });
            const targetProcedureTasks = tasksData.map(item => {
               return {name: item.task_name, id: item.task_id, settings: item.task_settings}
            });
            req.user = {targetProcedureTasks};
            next();
        } catch (e) {
            res.status(400).send({message: ERROR});
        }
    }
}

module.exports = new ProcedureParametersController();
