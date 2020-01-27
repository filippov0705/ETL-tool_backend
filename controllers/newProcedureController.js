const createProcedureService = require("@services/createProcedureService");
const createTaskService = require("@services/createTaskService");

class NewProcedureController {
    async createNewProcedure(req, res) {
        const {name, id, tasks} = req.body;
        try {
            await createProcedureService.createProcedure(req.user.id, name, id);
            await tasks.forEach(item => createTaskService.createTasks(id, item));

            res.status(200).send("200");
        } catch (e) {
            res.status(400).send(JSON.stringify({message: ERROR}));
        }
    }
}

module.exports = new NewProcedureController();
