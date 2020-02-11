const taskRepository = require("@repository/taskRepository");
const {sequelize} = require("@models/index");

class CreateTaskService {
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
            await taskRepository.deleteTask(taskId);
            await transaction.commit();
        } catch (e) {
            if (transaction) await transaction.rollback();
        }
    }
}

module.exports = new CreateTaskService();
