const procedureRepository = require("@repository/procedureRepository");
const userProcedureRepository = require("@repository/userProcedureRepository");

class CreateProcedureService {
    async createProcedure(userId, procedureName, procedureId) {
        await procedureRepository.create(procedureId, procedureName);
        await userProcedureRepository.create(userId, procedureId);
    }
}

module.exports = new CreateProcedureService();
