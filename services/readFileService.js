const serverCalls = require("@services/serverCalls");
const streamService = require("@services/streamService");
const excelService = require("@services/excelService");

const {ERROR, USER_DATA_STORAGE, SUCCESS} = require("@constants/constants");

class ReadFileService {
    async readExcel(task, data) {
        try {
            const buffer = await streamService.readStream(`${USER_DATA_STORAGE}${task.settings.from}.xlsx`);
            const name = task.settings.from.split('/')[task.settings.from.split('/').length - 1];
            data[task.settings.as] = {buffer};
            data[task.settings.as].data = excelService.getExcelDataFromBuffer(buffer);
            data[task.settings.as].data.name = `${name}.xlsx`;
            return {
                status: SUCCESS,
                runResult: data,
                description: ["Read file:", `${USER_DATA_STORAGE}`],
            };
        } catch (e) {
            return {status: ERROR};
        }
    }

    async readCSV(task, data) {
        try {
            const result = await serverCalls.readFromFTP(task);
            if (result.status === ERROR) throw new Error();
            data[task.settings.as] = result;
            return {
                status: SUCCESS,
                runResult: data,
                description: ["Read file:", `${task.settings.name}`, `from: ${task.settings.host}`],
            };
        } catch (e) {
            return {status: ERROR, description: "Connection failure"};
        }
    }
}

module.exports = new ReadFileService();
