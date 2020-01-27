const procedureService = require("@services/procedureService");
const {ERROR} = require("@constants/constants");

class ProcedureController {
    async getAllProcedures(req, res) {
        try {
            res.status(200).send(JSON.stringify(await procedureService.getUserProcedures(req.user.id)));
        } catch (e) {
            res.status(400).send(JSON.stringify({message: ERROR}));
        }
    }

    async deleteProcedure(req, res) {
        try {
            const {procedureId} = req.params;
            if (procedureId) {
                await procedureService.deleteProcedure(req.user.id, procedureId);
            }
            res.status(200).send("200");
        } catch (e) {
            res.status(400).send(JSON.stringify({message: ERROR}));
        }
    }
}

module.exports = new ProcedureController();
