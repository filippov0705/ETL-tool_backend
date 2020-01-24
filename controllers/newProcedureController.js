const createProcedureService = require("@services/createProcedureService");
const createTaskService = require("@services/createTaskService");

class NewProcedureController {
    createNewProcedure(req, res) {
        const userId = 46339050;
        const {name, id, tasks} = req.body;
        try {
            createProcedureService.createProcedure(userId, name, id).then(() => {
                tasks.forEach(item => createTaskService.createTasks(id, item));
            });
            res.status(200).send("200");
        } catch (e) {
            console.log("err");
            res.status(400).send(JSON.stringify({message: ERROR}));
        }
    }
}

module.exports = new NewProcedureController();
