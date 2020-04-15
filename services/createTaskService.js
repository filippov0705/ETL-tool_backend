const taskRepository = require("@repository/taskRepository");
const taskServeice = require("@services/taskService");
const {sequelize} = require("@models/index");

class CreateTaskService {
    async createTasks(tasks, id) {
        await Promise.all(
            tasks.map((item, i) => {
                return taskServeice.createTasks(id, item, i);
            })
        );
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
}

module.exports = new CreateTaskService();
