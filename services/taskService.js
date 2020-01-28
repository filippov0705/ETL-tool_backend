const nodemailerService = require("@services/nodemailerService");
const taskTypesRepository = require("@repository/taskTypesRepository");
const taskRepository = require("@repository/taskRepository");

const {ALPHABET, SUCCESS, ERROR} = require("@constants/constants");

class taskServeice {
    async getTaskSettings(id) {
        return await taskRepository.getTaskSettings(id);
    }

    async changeTaskSettings(taskId, newSettings) {
        await taskRepository.changeSettings(taskId, newSettings);
    }

    getTaskTypes() {
        return new Promise(resolve => {
            taskTypesRepository.getTaskTypes().then(taskTypes => resolve(taskTypes));
        });
    }

    mailExcel(task, data) {
        return new Promise(resolve => {
            try {
                data[task.settings.from][0].data.slice(1).forEach(item => {
                    nodemailerService.send(
                        "ETL-tool",
                        item[0],
                        "Оценка за экзамен",
                        `${item[1]} ${item[2]}, ваша оценка ${item[4]}`
                    );
                });
                resolve({status: SUCCESS, runResult: data});
            } catch (e) {
                resolve({status: ERROR});
            }
        });
    }

    createVariable(task, data) {
        return new Promise(resolve => {
            const col = ALPHABET.indexOf(task.settings.field[0].toLowerCase());
            const row = task.settings.field[1] - 1;
            data[task.settings.as] = data[task.settings.from][0].data[row][col];
            resolve({status: SUCCESS, runResult: data});
        });
    }

    changeField(task, data) {
        return new Promise(resolve => {
            const newValue = Object.keys(data).includes(task.settings.value)
                ? data[task.settings.value]
                : task.settings.value;
            const col = ALPHABET.indexOf(task.settings.field[0].toLowerCase());
            const row = task.settings.field[1] - 1;
            data[task.settings.target][0].data[row][col] = newValue;
            resolve({status: SUCCESS, runResult: data});
        });
    }

    mailText(task, data) {
        return new Promise(resolve => {
            const mailAdress = Object.keys(data).includes(task.settings.Email)
                ? data[task.settings.Email]
                : task.settings.Email;
            nodemailerService.send("ETL-tool", mailAdress, "info", data[task.settings.variable]);
            resolve({status: SUCCESS, runResult: data});
        });
    }
}

module.exports = new taskServeice();
