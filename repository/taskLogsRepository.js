const {TaskLog} = require("@models/taskLogs");

class ProcedureLogsRepository {
    async createLog(log, procedure_log_id, transaction) {
        const res = await TaskLog.create({...log, procedure_log_id}, {transaction});
        return res;
    }

    async getLog(procedure_log_id, transaction) {
        const result = await TaskLog.findAll({where: {procedure_log_id}, raw: true, transaction});
        return result;
    }
}

module.exports = new ProcedureLogsRepository();
