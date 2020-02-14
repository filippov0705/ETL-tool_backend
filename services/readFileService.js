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
                description: ["Read excel", `from: ${task.settings.from}`, `as variable: ${task.settings.as}`],
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
