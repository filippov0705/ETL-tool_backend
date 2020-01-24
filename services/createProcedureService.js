const procedureRepository = require("@repository/procedureRepository");

class CreateProcedureService {
    createProcedure(userId, procedureName, procedureId) {
        return new Promise(resolve => {
            procedureRepository.create(userId, procedureId, procedureName);
            resolve();
        });
    }
}

module.exports = new CreateProcedureService();
