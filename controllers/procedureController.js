const procedureService = require("@services/procedureService");

class ProcedureController {
    async getAllProcedures(req, res) {
        try {
            const procedures = await procedureService.getUserProcedures(req.user.id);
            res.status(200).send(procedures);
        } catch (e) {
            res.status(400).send({message: e});
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
            res.status(400).send({message: e});
        }
    }
}

module.exports = new ProcedureController();
