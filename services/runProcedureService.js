const readFileService = require("@services/readFileService");
const copyExcelService = require("@services/copyExcelService");
const taskService = require("@services/taskService");
const taskMapper = require("@mappers/taskMapper");
const logsMapper = require("@mappers/logsMapper");
const procedureService = require("@services/procedureService");

const {
    ADD_VARIABLE,
    CHANGE_FIELD,
    ERROR,
    EMPTY_FIELD,
    FROM,
    READ_EXCEL,
    COPY_EXCEL,
    READ_FROM_FTP,
    MAIL_EXCEL,
    MAIL_TEXT,
    NO_VALUE_IN_A_FIELD,
} = require("@constants/constants");

class RunProcedureService {
    async createResponseMessage(log, procedureId, procedureLogId) {
        const status = logsMapper.getRunstatus(log);
        const procedureData = await procedureService.findProcedure(procedureId);
        const procedureName = procedureData.dataValues.procedure_name;
        return {status, procedureLogId, procedureName};
    }

    async procedureActionsChain(tasks, previousTaskRunResults, runLogs) {
        const nextTask = tasks.shift();

        if (nextTask) {
            const emptyFields = taskMapper.findEmptyFields(nextTask.settings);
            if (emptyFields.length) {
                const stringOfEmptyFields = emptyFields.reduce((sum, cur) => `${sum}, ${cur}`);
                runLogs.push({
                    status: ERROR,
                    description: [`${EMPTY_FIELD} ${stringOfEmptyFields}`],
                    task_log_name: nextTask.name,
                    execution_time: new Date(),
                });
                return Promise.resolve(runLogs);
            }

            if (FROM in nextTask.settings && !nextTask.settings.from) {
                runLogs.push({
                    status: ERROR,
                    description: [`${NO_VALUE_IN_A_FIELD} ${FROM}`],
                    task_log_name: nextTask.name,
                    execution_time: new Date(),
                });
                return Promise.resolve(runLogs);
            }

            const result = await this.switchToAppropriateTask(nextTask.name)(nextTask, previousTaskRunResults);
            runLogs.push({
                status: result.status,
                description: result.description,
                task_log_name: nextTask.name,
                execution_time: new Date(),
            });
            if (result.status === ERROR) {
                return Promise.resolve(runLogs);
            }
            const resultLogs = await this.procedureActionsChain(tasks, result.runResult, runLogs);
            return resultLogs;
        } else {
            return Promise.resolve(runLogs);
        }
    }

    switchToAppropriateTask(name) {
        switch (name) {
            case READ_EXCEL:
                return readFileService.readExcel;

            case COPY_EXCEL:
                return copyExcelService.copyExcel;

            case READ_FROM_FTP:
                return readFileService.readCSV;

            case MAIL_EXCEL:
                return taskService.mailExcel;

            case MAIL_TEXT:
                return taskService.mailText;

            case ADD_VARIABLE:
                return taskService.createVariable;

            case CHANGE_FIELD:
                return taskService.changeField;

            default:
                return null;
        }
    }
}

module.exports = new RunProcedureService();
