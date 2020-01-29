const readFileService = require("@services/readFileService");
const copyExcelService = require("@services/copyExcelService");
const taskService = require("@services/taskService");

const {
    ADD_VARIABLE,
    CHANGE_FIELD,
    ERROR,
    READ_EXCEL,
    COPY_EXCEL,
    READ_FROM_FTP,
    MAIL_EXCEL,
    MAIL_TEXT,
} = require("@constants/constants");

class RunProcedureService {
    async procedureActionsChain(tasks, previousTaskRunResults) {
        const nextTask = tasks.shift();
        if (nextTask) {
            const result = await this.switchToAppropriateTask(nextTask.name)(nextTask, previousTaskRunResults);
            if (result.status === ERROR) return Promise.resolve();
            await this.procedureActionsChain(tasks, result.runResult);
        } else {
            return Promise.resolve();
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

            case "Change user role":
                return taskService.changeUserRole;

            case "Delete user":
                return taskService.deleteUser;

            default:
                return null;
        }
    }
}

module.exports = new RunProcedureService();
