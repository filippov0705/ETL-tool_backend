const taskRepository = require("@repository/taskRepository");

class CreateTaskService {
    async createTasks(procedureId, task, i) {
        await taskRepository.createTask(procedureId, task, i);
    }

    async deleteTask(taskId) {
        await taskRepository.deleteTask(taskId);
    }
}

module.exports = new CreateTaskService();
