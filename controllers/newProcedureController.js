const procedureService = require("@services/procedureService");
const usersFile = "./mockData/mockData.json";

class NewProcedureController {
    createNewProcedure(req, res) {
        try {
            const newUserFile = procedureService.getFileFromDB(usersFile).map(item => {
                if (item.userId === Number(req.params.id)) {
                    item.data = [...item.data, req.body];
                }
                return item;
            });

            procedureService.setFileToDB(usersFile, newUserFile);
            res.send("404");
        } catch (e) {
            res.send(JSON.stringify({status: ERROR}));
        }
    }
}

module.exports = new NewProcedureController();
