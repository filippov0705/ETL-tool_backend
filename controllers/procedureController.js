const procedureService = require("@services/procedureService");
const {ERROR, SUCCES} = require("@constants/constants");

const usersFile = "./mockData/mockData.json";

class ProcedureController {
    getAllProcedures(req, res) {
        const userId = 46339050;
        try {
            procedureService.getUserProcedures(46339050).then(resolve => {
                res.status(200).send(JSON.stringify(resolve));
            });
        } catch (e) {
            res.status(400).send(JSON.stringify({message: ERROR}));
        }
    }

    deleteProcedure(req, res) {
        const userId = 46339050;
        try {
            const {procedureId} = req.params;
            procedureService.deleteProcedure(userId, procedureId).then(() => {
                res.status(200).send({message: SUCCES});
            });
        } catch (e) {
            res.status(400).send(JSON.stringify({message: ERROR}));
        }
    }
}

module.exports = new ProcedureController();
