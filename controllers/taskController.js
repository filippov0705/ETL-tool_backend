const taskService = require("@services/taskService");
const taskServeice = require("@services/taskService");
const {ERROR} = require("@constants/constants");

class ProcedureController {
    async getTasksTypes(req, res) {
        try {
            const taskTypes = await taskServeice.getTaskTypes();
            const taskTypesArray = taskTypes.map(item => {
                return {name: item.task_name, id: item.task_id, settings: item.task_settings};
            });
            res.status(200).send(taskTypesArray);
        } catch (e) {
            res.status(404).send(JSON.stringify({message: ERROR}));
        }
    }

    mailing(req, res) {
        taskService.nodemail();
    }
}

module.exports = new ProcedureController();
