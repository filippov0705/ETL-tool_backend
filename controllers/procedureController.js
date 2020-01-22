const procedureService = require("@services/procedureService");
const {ERROR} = require("@constants/constants");

const usersFile = "./mockData/mockData.json";

class ProcedureController {
    getAllProcedures(req, res) {
        const userId = 46339050;
        try {
            procedureService.getUserProcedures(46339050).then(resolve => {
                console.log(resolve)
                res.status(200).send(JSON.stringify(resolve));
            })
        } catch (e) {
            res.status(400).send(JSON.stringify({message: ERROR}));
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
            res.status(200).send(JSON.stringify(dataToSend));
        } catch (e) {
            res.status(400).send(JSON.stringify({message: ERROR}));
        }
    }
}

module.exports = new ProcedureController();
