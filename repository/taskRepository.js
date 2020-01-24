const {Task} = require("@models/tasks");

class TaskRepository {
    createTask(procedureId, task) {
        Task.create({
            task_id: task.id,
            task_name: task.name,
            procedure_id: procedureId,
            task_settings: task.settings,
        });
    }
}

module.exports = new TaskRepository();