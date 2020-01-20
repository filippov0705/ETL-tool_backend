const procedureService = require("@services/procedureService");
const {ERROR} = require("@constants/constants");

const usersFile = "./mockData/mockData.json";

class ProcedureController {
    getAllProcedures(req, res) {
        try {
            const { id } = req.params;
            const user = procedureService.getFileFromDB(usersFile).find(item => item.userId === Number(id));
            procedureService.readUsersFromDB();
            if (user) {
                const data = user.data.map(item => {
                    return {name: item.name, id: item.id, tasks: item.tasks};
                });
                res.send(JSON.stringify(data));
            } else {
                res.send(JSON.stringify([]));
            }
        } catch (e) {
            res.send(JSON.stringify({status: ERROR}));
        }
    }

    deleteProcedure(req, res) {
        try {
            const { id, procedureId } = req.params;
            const data = procedureService.getFileFromDB(usersFile);
            const user = data.find(item => item.userId === Number(id));
            const newData = user.data.filter(item => item.id !== Number(procedureId));
            const newUserFile = data.map(item => {
                if (item.userId === Number(id)) {
                    item.data = newData;
                }
                return item;
            });
            const dataToSend = newData.map(item => {
                return {name: item.name, id: item.id, tasks: item.tasks};
            });

            procedureService.setFileToDB(usersFile, newUserFile);
            res.send(JSON.stringify(dataToSend));
        } catch (e) {
            res.send(JSON.stringify({status: ERROR}));
        }
    }
}

module.exports = new ProcedureController();
