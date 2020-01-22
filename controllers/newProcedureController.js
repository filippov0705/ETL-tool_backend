const createProcedureService = require("@services/createProcedureService");

const usersFile = "./mockData/mockData.json";

class NewProcedureController {
    createNewProcedure(req, res) {
        const userId = 46339050;
        const { name, id } = req.body;
        console.log(name);
        console.log(id);
        try {
            createProcedureService.createProcedure(userId, name, id).then(() => {

            });
            // const { id } = req.params;
            // const newData = req.body;
            // const newUserFile = procedureService.getFileFromDB(usersFile).map(item => {
            //     if (item.userId === Number(id)) {
            //         item.data = [...item.data, newData];
            //     }
            //     return item;
            // });
            //
            // procedureService.setFileToDB(usersFile, newUserFile);
            res.status(200).send(JSON.stringify([]));
        } catch (e) {
            console.log('err')
            res.status(400).send(JSON.stringify({message: ERROR}));
        }
    }
}

module.exports = new NewProcedureController();
