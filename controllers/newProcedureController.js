const createProcedureService = require("@services/createProcedureService");

const usersFile = "./mockData/mockData.json";

class NewProcedureController {
    createNewProcedure(req, res) {
        const userId = 46339050;
        const {name, id, tasks} = req.body;
        try {
            createProcedureService.createProcedure(userId, name, id).then(() => {
                createProcedureService.createTasks(userId, tasks);
            });
            res.status(200).send(JSON.stringify([]));
        } catch (e) {
            console.log("err");
            res.status(400).send(JSON.stringify({message: ERROR}));
        }
    }
}

module.exports = new NewProcedureController();
