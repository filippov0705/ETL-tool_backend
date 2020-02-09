const randomInt = require("random-int");
const moment = require("moment");
const procedureLogsRepository = require("@repository/procedureLogsRepository");
const procedureRepository = require("@repository/procedureRepository");
const taskLogsRepository = require("@repository/taskLogsRepository");
const constantsService = require("@services/constantsService");
const userProcedure = require("@repository/userProcedureRepository");
const logsMapper = require("@mappers/logsMapper");
const {sequelize} = require("@models/index");

class LogsService {
    async getPageLogs(page, logsNumber, logs) {
        let transaction;
        try {
            transaction = await sequelize.transaction();
            const pageLogs = logs.slice((page - 1) * logsNumber, page * logsNumber);
            const pageLogsWithNames = await Promise.all(
                pageLogs.map(async item => {
                    item.procedureName = await procedureRepository.findProcedureName(item.procedure_id, transaction);
                    item.execution_time = moment(item.execution_time).format("MMMM Do YYYY, h:mm:ss a");
                    return item;
                })
            );
            const taskLogs = await Promise.all(
                pageLogs.map(async item => {
                    const taskLog = await taskLogsRepository.getLog(item.procedure_log_id, transaction);
                    return taskLog;
                })
            );

            const taskLogsFiltered = logsMapper.filterLogs(taskLogs);

            const taskLogsWithNames = await Promise.all(
                taskLogsFiltered.map(async item => {
                    item.task_log_name = await constantsService.getConstant(item.task_log_name, transaction);
                    item.status = await constantsService.getConstant(item.status, transaction);
                    item.execution_time = moment(item.execution_time).format("MMMM Do YYYY, h:mm:ss a");
                    return item;
                })
            );

            await transaction.commit();
            return {procedureLogs: pageLogsWithNames, taskLogs: taskLogsWithNames};
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
