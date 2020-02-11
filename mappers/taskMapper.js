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

    findEmptyFields(settings) {
        const emptyFields = [];
        for (let key in settings) {
            if (!settings[key]) emptyFields.push(key);
        }
        return emptyFields;
    }
}

module.exports = new TaskMapper();
