const {Task} = require("@models/tasks");

class TaskRepository {
    async createTask(procedureId, task, i, transaction) {
        await Task.create(
            {
                task_id: task.id,
                task_name: task.name,
                procedure_id: procedureId,
                task_settings: task.settings,
                task_order: i + 1,
            },
            {transaction}
        );
    }

    async getTaskSettings(id, transaction) {
        const settings = await Task.findOne({attributes: ["task_settings"], where: {task_id: id}, transaction});
        return settings.dataValues.task_settings;
    }

    async findTasks(id, transaction) {
        const tasks = await Task.findAll({
            where: {procedure_id: id},
            order: [["task_order", "ASC"]],
            raw: true,
            transaction,
        });
        return tasks;
    }

    async changeSettings(task_id, newSettings, transaction) {
        await Task.update({task_settings: newSettings}, {where: {task_id}, transaction});
    }

    async deleteTask(task_id, transaction) {
        await Task.destroy({where: {task_id}, transaction});
    }

    async getProceduretasks(procedure_id, transaction) {
        const tasks = await Task.findAll({where: {procedure_id}, transaction});
        return tasks;
    }
}

module.exports = new TaskRepository();
