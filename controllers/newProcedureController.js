const createProcedureService = require("@services/createProcedureService");
const createTaskService = require("@services/createTaskService");

class NewProcedureController {
    createNewProcedure(req, res) {
        const {name, id, tasks} = req.body;
        try {
            createProcedureService.createProcedure(req.user.id, name, id).then(() => {
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
