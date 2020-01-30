const createProcedureService = require("@services/createProcedureService");
const createTaskService = require("@services/createTaskService");

class NewProcedureController {
    async createNewProcedure(req, res) {
        const {name, id, tasks} = req.body;
        try {
            await createProcedureService.createProcedure(req.user.id, name, id);
            await tasks.forEach(async item => await createTaskService.createTasks(id, item));

            res.status(200).send("200");
        } catch (e) {
            res.status(400).send({message: e});
        }
    }
}

module.exports = new NewProcedureController();
