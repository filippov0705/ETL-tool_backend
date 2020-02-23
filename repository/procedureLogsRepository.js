const {ProcedureLog} = require("@models/procedureLogs");

class ProcedureLogsRepository {
    async createLog(procedure_log_id, procedure_id, transaction) {
        await ProcedureLog.create({procedure_log_id, procedure_id, execution_time: new Date()}, {transaction});
    }

    async getProcedureLog(procedure_id, transaction) {
        const procedureLog = await ProcedureLog.findAll({where: {procedure_id}, raw: true, transaction});
        return procedureLog;
    }
}

module.exports = new ProcedureLogsRepository();
