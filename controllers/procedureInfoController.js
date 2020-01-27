const taskService = require("@services/taskService");
const {ERROR} = require("@constants/constants");

class ProcedureInfoController {
    async editTaskSettings(req, res) {
        try {
            const {taskId, newSettings} = req.body;
            let settings = await taskService.getTaskSettings(taskId);
            settings[newSettings.parameter] = newSettings.newValue;
            await taskService.changeTaskSettings(taskId, settings);
            res.status(200).send(200);
        } catch (e) {
            res.status(400).send(JSON.stringify({message: ERROR}));
        }
    }
}

module.exports = new ProcedureInfoController();
