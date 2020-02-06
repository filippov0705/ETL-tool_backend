const procedureService = require("@services/procedureService");
const taskService = require("@services/taskService");
const {ERROR} = require("@constants/constants");

class EditProcedureController {
    async changeProcedureName(req, res) {
        try {
            const {procedureId} = req.params;
            const {newName} = req.body;
            await procedureService.changeName(procedureId, newName);
            res.send(newName);
        } catch (e) {
            res.status(400).send({message: ERROR});
        }
    }

    async addNewTaskToProcedure(req, res) {
        try {
            const {procedureId} = req.params;
            const {newTask} = req.body;
            await taskService.createTasks(procedureId, newTask, newTask.order);
            res.status(200).send(newTask);
        } catch (e) {
            res.status(400).send({message: ERROR});
        }
    }

    async deleteTaskInProcedure(req, res) {
        try {
            const {taskId} = req.params;
            await taskService.deleteTask(taskId);
            res.status(200).send(200);
        } catch (e) {
            res.status(400).send(JSON.stringify({message: ERROR}));
        }
    }
}

module.exports = new EditProcedureController();
