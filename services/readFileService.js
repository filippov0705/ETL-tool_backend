const xlsx = require("node-xlsx");
const serverCalls = require("@services/serverCalls");

const {ERROR, USER_DATA_STORAGE, SUCCESS} = require("@constants/constants");

class ReadFileService {
    readExcel(task) {
        return new Promise(resolve => {
            try {
                const data = xlsx.parse(`${USER_DATA_STORAGE}${task.settings.from}.xlsx`);
                resolve({status: SUCCESS, runResult: data});
            } catch (e) {
                resolve({status: ERROR});
            }
        });
    }

    readCSV(task) {
        return new Promise(resolve => {
            serverCalls.readFromFTP(task).then(result => resolve(result));
        });
    }
}

module.exports = new ReadFileService();
