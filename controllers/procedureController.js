const procedureService = require("@services/procedureService");
const scheduleService = require("@services/scheduleService");
const rolesService = require("@services/rolesService");

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

    async getClosestExecutedProcedures(date, dayOfTheWeek) {
        try {
            const procedures = await scheduleService.getClosestProceduresId(date, dayOfTheWeek);
        } catch (e) {}
    }
}

module.exports = new ProcedureController();
