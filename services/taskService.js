const nodemailerService = require("@services/nodemailerService");
const userRepository = require("@repository/userRepository");
const taskTypesRepository = require("@repository/taskTypesRepository");
const taskRepository = require("@repository/taskRepository");
const {sequelize} = require("@models/index");

const {ALPHABET, SUCCESS, ERROR, WARNING} = require("@constants/constants");

class TaskServeice {
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
            if (transaction) await transaction.rollback();
        }
    }

    mailExcel(task, data) {
        try {
            nodemailerService.send(data[task.settings.variable].buffer, task.settings.email, task.settings.subject, data[task.settings.variable].data.name);

            return {status: SUCCESS, runResult: data, description: [`From the variable: ${task.settings.from}`]};
        } catch (e) {
            return {status: ERROR};
        }
    }

    createVariable(task, data) {
        try {
            const isSameVariableExist = task.settings.as in data;
            data[task.settings.as] = data[task.settings.from].data[task.settings.field.toUpperCase()];

            if (isSameVariableExist) {
                return {status: WARNING, runResult: data, description: [`Variable "${task.settings.as}" rewritten`]};
            } else {
                return {
                    status: SUCCESS,
                    runResult: data,
                    description: ["Created variable", "with name:", `${task.settings.as}`],
                };
            }
        } catch (e) {
            return {status: ERROR};
        }
    }

    async mailText(task, data) {
        const mailAdress = Object.keys(data).includes(task.settings.Email)
            ? data[task.settings.Email]
            : task.settings.Email;
        const response = await nodemailerService.send(
            "ETL-tool",
            mailAdress,
            task.settings.subject,
            data[task.settings.variable]
        );
        if (response.status === ERROR) {
            return {status: ERROR, description: ["No recipients defined"]};
        }
        return {
            status: SUCCESS,
            runResult: data,
            description: ["Successfully mailed text", `to ${task.settings.Email}`],
        };
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

module.exports = new TaskServeice();
