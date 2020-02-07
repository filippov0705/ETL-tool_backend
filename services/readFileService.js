const xlsx = require("node-xlsx");
const serverCalls = require("@services/serverCalls");

const {ERROR, USER_DATA_STORAGE, SUCCESS} = require("@constants/constants");

class ReadFileService {
    async readExcel(task, data) {
        try {
            console.log(task);
            const content = await xlsx.parse(`${USER_DATA_STORAGE}${task.settings.from}.xlsx`);
            data[task.settings.as] = content;
            console.log(data);
            return {status: SUCCESS, runResult: data};
        } catch (e) {
            console.log("!!!!!!!!");
            return {status: ERROR};
        }
    }

    async readCSV(task, data) {
        try {
            const result = await serverCalls.readFromFTP(task);
            data[task.settings.as] = result;
            return {status: SUCCESS, runResult: data};
        } catch (e) {
            return {status: ERROR};
        }
    }
}

module.exports = new ReadFileService();
