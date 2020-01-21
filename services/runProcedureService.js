const readFileService = require("@services/readFileService");
const copyExcelService = require("@services/copyExcelService");

const {ERROR, READ_EXCEL, COPY_EXCEL, READ_CSV_FROM_FTP} = require("@constants/constants");

class RunProcedureService {
    procedureActionsChain(tasks, previousTaskRunResults) {
        const nextTask = tasks.shift();
        if (nextTask) {
            this.switchToAppropriateTask(nextTask.name)(nextTask, previousTaskRunResults).then(result => {
                if (result.status === ERROR) return Promise.resolve();
                this.procedureActionsChain(tasks, result.runResult);
            });
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

            case READ_CSV_FROM_FTP:
                return readFileService.readCSV;

            default:
                return null;
        }
    }
}

module.exports = new RunProcedureService();
