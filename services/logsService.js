const fs = require("fs");
const randomInt = require("random-int");
const procedureRepository = require("@repository/procedureRepository");
const userProcedure = require("@repository/userProcedureRepository");
const logsMapper = require("@mappers/logsMapper");
const {sequelize} = require("@models/index");

const logsFile = "./logs/logs.txt";

class LogsService {
    async getUserLogs(user_id) {
        let transaction;
        try {
            transaction = await sequelize.transaction();
            const proceduresId = await userProcedure.getProceduresId(user_id, transaction);
            const logsContent = JSON.parse(fs.readFileSync(logsFile, "utf8"));
            const procedureIdFilterred = logsMapper.filterId(proceduresId);

            const targetLogs = logsContent.filter(item => procedureIdFilterred.includes(Number(item.procedure_id)));
            const targetLogsWithNames = await Promise.all(
                targetLogs.map(async item => {
                    item.name = await procedureRepository.findProcedureName(item.procedure_id, transaction);
                    return item;
                })
            );
            await transaction.commit();
            return targetLogsWithNames;
        } catch (e) {
            if (transaction) await transaction.rollback();
        }
    }

    formatLogs(logs, filterParams) {
        const allProceduresNames = Array.from(new Set(logs.map(item => item.name)));

        const logsFilteredByName = filterParams.procedureName
            ? logsMapper.filterByName(logs, filterParams.procedureName)
            : logs;

        const logsTotally = logsFilteredByName.length;

        const logsOrdered = logsMapper.orderLogs(filterParams.order, logsFilteredByName);
        const OnePageLogs = logsMapper.getPageLogs(logsOrdered, filterParams.page, filterParams.logsNumber);
        const logsWithFormatedDate = logsMapper.formatDate(OnePageLogs);

        return {logsTotally, logsForPage: logsWithFormatedDate, allProceduresNames};
    }

    createLog(log, procedure_id) {
        const LogsContent = JSON.parse(fs.readFileSync(logsFile, "utf8"));
        const procedureExecutionTime = log[0].execution_time;
        const formattedLog = logsMapper.formatTime(log);

        LogsContent.push({
            procedure_id,
            execution_time: procedureExecutionTime,
            log: formattedLog,
            procedure_log_id: randomInt(10000000, 99999999),
        });
        fs.writeFileSync(logsFile, JSON.stringify(LogsContent));
    }
}

module.exports = new LogsService();
