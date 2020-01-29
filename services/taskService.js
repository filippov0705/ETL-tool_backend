const nodemailerService = require("@services/nodemailerService");
const userRepository = require("@repository/userRepository");
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
        try {
            data[task.settings.from][0].data.slice(1).forEach(item => {
                nodemailerService.send(
                    "ETL-tool",
                    item[0],
                    "Оценка за экзамен",
                    `${item[1]} ${item[2]}, ваша оценка ${item[4]}`
                );
            });
            return {status: SUCCESS, runResult: data};
        } catch (e) {
            return {status: ERROR};
        }
    }

    createVariable(task, data) {
        const col = ALPHABET.indexOf(task.settings.field[0].toLowerCase());
        const row = task.settings.field[1] - 1;
        data[task.settings.as] = data[task.settings.from][0].data[row][col];
        return {status: SUCCESS, runResult: data};
    }

    changeField(task, data) {
        const newValue = Object.keys(data).includes(task.settings.value)
            ? data[task.settings.value]
            : task.settings.value;
        const col = ALPHABET.indexOf(task.settings.field[0].toLowerCase());
        const row = task.settings.field[1] - 1;
        data[task.settings.target][0].data[row][col] = newValue;
        return {status: SUCCESS, runResult: data};
    }

    async mailText(task, data) {
        const mailAdress = Object.keys(data).includes(task.settings.Email)
            ? data[task.settings.Email]
            : task.settings.Email;
        nodemailerService.send("ETL-tool", mailAdress, "info", data[task.settings.variable]);
        return {status: SUCCESS, runResult: data};
    }

    async changeUserRole(task, data) {
        const newRole = task.settings.role.toLowerCase();
        if (newRole === "user" || newRole === "trainee") {
            const role = await userRepository.getUserRole(task.settings.login);
            if (!role) {
                return {status: ERROR, runResult: data};
            }
            if (role.dataValues.user_role === "admin") {
                return {status: ERROR, runResult: data};
            }
            await userRepository.changeUserRole(task.settings.login, newRole);
            return {status: SUCCESS, runResult: data};
        } else {
            return {status: ERROR, runResult: data};
        }
    }

    async deleteUser(task, data) {
        try {
            const role = await userRepository.getUserRole(task.settings.login);
            if (!role) {
                return {status: ERROR, runResult: data};
            }
            if (role.dataValues.user_role === "admin") {
                return {status: ERROR, runResult: data};
            } else {
                await userRepository.deleteUser(task.settings.login);
                return {status: SUCCESS, runResult: data};
            }
        } catch (e) {
            return {status: ERROR, runResult: data};
        }
    }
}

module.exports = new taskServeice();
