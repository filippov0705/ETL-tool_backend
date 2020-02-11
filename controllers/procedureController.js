const procedureService = require("@services/procedureService");
const scheduleService = require("@services/scheduleService");
const rolesService = require("@services/rolesService");
const sequelizeDataMapper = require("@mappers/sequelizeDataMapper");

class ProcedureController {
    async getAllProcedures(req, res) {
        try {
            const {filter} = req.query;

            const procedures = await procedureService.getUserProcedures(req.user.id, filter);
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
        const schedules = await scheduleService.getClosestProceduresSchedules(date, dayOfTheWeek);
        return schedules;
    }
}

module.exports = new ProcedureController();
