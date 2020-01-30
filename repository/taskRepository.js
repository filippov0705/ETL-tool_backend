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

    async getTaskSettings(id) {
        const settings = await Task.findOne({attributes: ["task_settings"], where: {task_id: id}});
        return settings.dataValues.task_settings;
    }

    async findTasks(id) {
        const tasks = await Task.findAll({where:{procedure_id: id}, raw: true });
        return tasks;
    }

    async changeSettings(task_id, newSettings) {
        await Task.update({task_settings: newSettings}, {where: {task_id}})
    }
}

module.exports = new TaskRepository();