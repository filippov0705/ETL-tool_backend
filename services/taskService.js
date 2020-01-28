const nodemailerService = require("@services/nodemailerService");
const taskTypesRepository = require("@repository/taskTypesRepository");
const taskRepository = require("@repository/taskRepository");

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
                console.log(data)
                data.excel[0].data.slice(1).forEach(item => {
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

    mailText(task, data) {
        return new Promise(resolve => {
            nodemailerService.send("ETL-tool", task.settings.Email, "info", data.text);
            resolve({status: SUCCESS, runResult: data});
        });
    }

}

module.exports = new taskServeice();
