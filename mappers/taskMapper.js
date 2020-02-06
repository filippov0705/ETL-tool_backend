class TaskMapper {
    normalizeTasksForProcedure(tasks) {
        return tasks.map(item => {
            return {
                name: item.task_name,
                id: item.task_id,
                settings: item.task_settings,
            };
        });
    }
}

module.exports = new TaskMapper();
