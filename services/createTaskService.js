const taskRepository = require("@repository/taskRepository");

class CreateTaskService {
    async createTasks(procedureId, task) {
        await taskRepository.createTask(procedureId, task);
    }
}

module.exports = new CreateTaskService();
