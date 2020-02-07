const {TaskTypes} = require("@models/taskTypes");

class TaskTypesRepository {
    async getTaskTypes(transaction) {
        const taskTypes = await TaskTypes.findAll({raw: true, transaction});
        return taskTypes;
    }
}

module.exports = new TaskTypesRepository();
