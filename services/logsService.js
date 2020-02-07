const randomInt = require("random-int");
const procedureLogsRepository = require("@repository/procedureLogsRepository");
const taskLogsRepository = require("@repository/taskLogsRepository");
const constantsService = require("@services/constantsService");
const userProcedure = require("@repository/userProcedureRepository");
const logsMapper = require("@mappers/logsMapper");
const {sequelize} = require("@models/index");

class LogsService {
    async getpageLogs(page, logsNumber, logs) {
        let transaction;
        try {
            transaction = await sequelize.transaction();
            const pageLogs = logs.slice((page - 1) * logsNumber, page * logsNumber);

            const taskLogs = await Promise.all(
                pageLogs.map(async item => {
                    const taskLog = await taskLogsRepository.getLog(item.procedure_log_id, transaction);
                    return taskLog;
                })
            );
            const taskLogsFiltered = logsMapper.filterLogs(taskLogs);
            await transaction.commit();
            return {procedureLogs: pageLogs, taskLogs: taskLogsFiltered};
        } catch (e) {
            if (transaction) await transaction.rollback();
        }
    }

    async getUserLogs(user_id) {
        let transaction;
        try {
            transaction = await sequelize.transaction();
            const proceduresId = await userProcedure.getProceduresId(user_id, transaction);
            const procedureLogs = await Promise.all(
                proceduresId.map(async item => {
                    const procedureLog = await procedureLogsRepository.getProcedureLog(item.procedure_id, transaction);
                    return procedureLog;
                })
            );
            const procedureLogsFiltered = logsMapper.filterLogs(procedureLogs);
            await transaction.commit();
            return procedureLogsFiltered;
        } catch (e) {
            if (transaction) await transaction.rollback();
        }
    }

    async createLog(procedure_log_id, procedure_id) {
        let transaction;
        try {
            transaction = await sequelize.transaction();
            await procedureLogsRepository.createLog(procedure_log_id, procedure_id, transaction);
            await transaction.commit();
        } catch (e) {
            if (transaction) await transaction.rollback();
        }
    }

    async createTaskLog(log, procedure_log_id) {
        let transaction;
        try {
            transaction = await sequelize.transaction();
            await Promise.all(
                log.map(async item => {
                    item.status = await constantsService.getConstantId(item.status, transaction);
                    item.task_log_name = await constantsService.getConstantId(item.task_log_name, transaction);
                    item.task_log_id = randomInt(10000000, 99999999);
                    const res = await taskLogsRepository.createLog(item, procedure_log_id, transaction);
                    return res;
                })
            );
            await transaction.commit();
        } catch (e) {
            if (transaction) await transaction.rollback();
        }
    }
}

module.exports = new LogsService();
