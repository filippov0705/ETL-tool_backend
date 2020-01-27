const {Task} = require("@models/tasks");

class TaskRepository {
    async createTask(procedureId, task) {
        await Task.create({
            task_id: task.id,
            task_name: task.name,
            procedure_id: procedureId,
            task_settings: task.settings,
        });
    }

    async findTasks(id) {
        return await Task.findAll({where:{procedure_id: id}, raw: true });
    }
}

module.exports = new TaskRepository();