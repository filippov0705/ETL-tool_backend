const taskRepository = require("@repository/taskRepository");

class CreateTaskService {
    createTasks(procedureId, task) {
        return new Promise(resolve => {
            taskRepository.createTask(procedureId, task);
            resolve();
        });
    }
}

module.exports = new CreateTaskService();
