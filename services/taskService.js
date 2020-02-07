const nodemailerService = require("@services/nodemailerService");
const userRepository = require("@repository/userRepository");
const taskTypesRepository = require("@repository/taskTypesRepository");
const taskRepository = require("@repository/taskRepository");
const {sequelize} = require("@models/index");

const {ALPHABET, SUCCESS, ERROR} = require("@constants/constants");

class taskServeice {
    async createTasks(procedureId, task, i) {
        let transaction;
        try {
            transaction = await sequelize.transaction();
            await taskRepository.createTask(procedureId, task, i, transaction);
            await transaction.commit();
        } catch (e) {
            if (transaction) await transaction.rollback();
        }
    }

    async deleteTask(taskId) {
        let transaction;
        try {
            transaction = await sequelize.transaction();
            await taskRepository.deleteTask(taskId, transaction);
            await transaction.commit();
        } catch (e) {
            if (transaction) await transaction.rollback();
        }
    }

    async getTaskSettings(id) {
        let transaction;
        try {
            transaction = await sequelize.transaction();
            const settings = await taskRepository.getTaskSettings(id, transaction);
            await transaction.commit();
            return settings;
        } catch (e) {
            if (transaction) await transaction.rollback();
        }
    }

    async findTasks(procedure_id) {
        let transaction;
        try {
            transaction = await sequelize.transaction();
            const taskData = await taskRepository.findTasks(procedure_id, transaction);
            await transaction.commit();
            return taskData;
        } catch (e) {
            if (transaction) await transaction.rollback();
        }
    }

    async changeTaskSettings(taskId, newSettings) {
        let transaction;
        try {
            transaction = await sequelize.transaction();
            await taskRepository.changeSettings(taskId, newSettings, transaction);
            await transaction.commit();
        } catch (e) {
            if (transaction) await transaction.rollback();
        }
    }

    async getTaskTypes() {
        let transaction;
        try {
            transaction = await sequelize.transaction();
            const taskTypes = await taskTypesRepository.getTaskTypes(transaction);
            await transaction.commit();
            return taskTypes;
        } catch (e) {
            console.log(e);
            if (transaction) await transaction.rollback();
        }
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

    async getProcedureTasks(procedure_id) {
        let transaction;
        try {
            transaction = await sequelize.transaction();
            const tasks = await taskRepository.getProceduretasks(procedure_id, transaction);
            await transaction.commit();
            return tasks;
        } catch (e) {
            if (transaction) await transaction.rollback();
        }
    }
}

module.exports = new taskServeice();
