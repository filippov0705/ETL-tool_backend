const {taskTypes} = require("@models/taskTypes");

class TaskTypesRepository {
    getTaskTypes() {
        return new Promise(resolve => {
            taskTypes.findAll({raw: true}).then(taskTypes => resolve(taskTypes));
        });
    }
}

module.exports = new TaskTypesRepository();
