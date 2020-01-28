const xlsx = require("node-xlsx");
const serverCalls = require("@services/serverCalls");

const {ERROR, USER_DATA_STORAGE, SUCCESS} = require("@constants/constants");

class ReadFileService {
    readExcel(task, data) {
        return new Promise(resolve => {
            try {
                const content = xlsx.parse(`${USER_DATA_STORAGE}${task.settings.from}.xlsx`);
                data[task.settings.as] = content;
                resolve({status: SUCCESS, runResult: data});
            } catch (e) {
                resolve({status: ERROR});
            }
        });
    }

    readCSV(task, data) {
        return new Promise(resolve => {
            serverCalls.readFromFTP(task).then(result => {
                data[task.settings.as] = result;
                resolve({status: SUCCESS, runResult: data});
            });
        });
    }
}

module.exports = new ReadFileService();
