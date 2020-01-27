const procedureService = require("@services/procedureService");
const {ERROR, SUCCES} = require("@constants/constants");

class ProcedureController {
    getAllProcedures(req, res) {
        try {
            procedureService.getUserProcedures(req.user.id).then(resolve => {
                res.status(200).send(JSON.stringify(resolve));
            });
        } catch (e) {
            res.status(400).send(JSON.stringify({message: ERROR}));
        }
    }

    deleteProcedure(req, res) {
        try {
            const {procedureId} = req.params;
            procedureService.deleteProcedure(req.user.id, procedureId).then(() => {
                res.status(200).send({message: SUCCES});
            });
        } catch (e) {
            res.status(400).send(JSON.stringify({message: ERROR}));
        }
    }
}

module.exports = new ProcedureController();
