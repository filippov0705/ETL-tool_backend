const xlsx = require("node-xlsx");
const serverCalls = require("@services/serverCalls");

const {ERROR, USER_DATA_STORAGE, SUCCESS} = require("@constants/constants");

class ReadFileService {
    async readExcel(task, data) {
        try {
            const content = await xlsx.parse(`${USER_DATA_STORAGE}${task.settings.from}.xlsx`);
            data[task.settings.as] = content;
            return {
                status: SUCCESS,
                runResult: data,
                description: [`Read excel file from: ${USER_DATA_STORAGE}${task.settings.from}.xlsx`],
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
                description: [`Read from ${task.settings.host}`, `File name: ${task.settings.name}`],
            };
        } catch (e) {
            return {status: ERROR, description: "Connection failure"};
        }
    }
}

module.exports = new ReadFileService();
