const procedureService = require("@services/procedureService");

const usersFile = "./mockData/mockData.json";

class NewProcedureController {
    createNewProcedure(req, res) {
        try {
            const { id } = req.params;
            const newData = req.body;
            const newUserFile = procedureService.getFileFromDB(usersFile).map(item => {
                if (item.userId === Number(id)) {
                    item.data = [...item.data, newData];
                }
                return item;
            });

            procedureService.setFileToDB(usersFile, newUserFile);
            res.status(404);
        } catch (e) {
            res.send(JSON.stringify({status: ERROR}));
        }
    }
}

module.exports = new NewProcedureController();
