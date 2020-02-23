const createProcedureService = require("@services/createProcedureService");
const createTaskService = require("@services/createTaskService");

class NewProcedureController {
    async createNewProcedure(req, res) {
        const {name, id, tasks} = req.body;
        try {
            await createProcedureService.createProcedure(req.user.id, name, id);
            await Promise.all(
                tasks.map((item, i) => {
                    return createTaskService.createTasks(id, item, i);
                })
            );
            res.status(200).send(200);
        } catch (e) {
            res.status(400).send({message: e});
        }
    }
}

module.exports = new NewProcedureController();
