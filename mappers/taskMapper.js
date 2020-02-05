class TaskMapper {
    normalizeTasks(tasks) {
        return tasks.map(item => {
            return {
                name: item.dataValues.task_name,
                id: item.dataValues.task_id,
                settings: item.dataValues.task_settings,
            };
        });
    }
}

module.exports = new TaskMapper();
