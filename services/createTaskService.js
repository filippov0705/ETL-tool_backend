const taskRepository = require("@repository/taskRepository");

class CreateTaskService {
    async createTasks(procedureId, task, i) {
        await taskRepository.createTask(procedureId, task, i);
    }
}

module.exports = new CreateTaskService();
