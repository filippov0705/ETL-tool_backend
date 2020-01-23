const procedureRepository = require("@repository/procedureRepository");

class CreateProcedureService {
    createProcedure(userId, procedureName, procedureId) {
        return new Promise(resolve => {
            procedureRepository.create(userId, procedureId, procedureName);
            resolve();
        });
    }

    createTasks(userId, tasks) {
        return new Promise(resolve => {
            console.log(tasks);
            tasks.forEach(item => procedureRepository.createTasks(userId, item));
            resolve();
        });
    }
}

module.exports = new CreateProcedureService();
