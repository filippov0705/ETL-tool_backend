require('module-alias/register');

const procedureService = require("@services/procedureService");
const usersFile = "../frontend/src/mockData/mockData.json";

const { ERROR } = require("@constants/constants");

class ProcedureController {
    getAllProcedures(req, res) {
        try {
            const user = procedureService.getFileFromDB(usersFile).find(item => item.userId === Number(req.params.id));
            procedureService.readUsersFromDB();
            if (user) {
                const data = user.data.map(item => {
                    return {name: item.name, id: item.id, tasks: item.tasks}
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
            const data = procedureService.getFileFromDB(usersFile);
            const user = data.find(item => item.userId === Number(req.params.id));
            const newData = user.data.filter(item => item.id !== Number(req.params.procedureId));
            const newUserFile = data.map(item => {
                if(item.userId === Number(req.params.id)) {
                    item.data = newData;
                }
                return item;
            })
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